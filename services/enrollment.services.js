const Enrollment = require("../models/enrollment.model");
const Application = require("../models/application.model");
const User = require("../models/user.model");
const Course = require("../models/course.model");


require("dotenv").config();

class EnrollmentService{

    // professor access
    async showApplications(professorId) {
        const applications = await Application.find()
            .populate({
                path: "course",
                match: { professor: professorId }
            })
            .populate("student");

        
        const filtered = applications.filter(app => app.course);

        if (filtered.length === 0) {
            throw new Error("Nobody has applied yet!");
        }

        return filtered;
    }

    // student access
    async showMyApplications(studentId) {
        const applications = await Application.find({
            student: studentId
        })
        .populate("course")
        .populate("student");

        if (applications.length === 0) {
            throw new Error("You haven't applied anywhere!");
        }

        return applications;
    }

    // professor access
    async acceptEnrollmentRequest(studentId, professorId) {
        const student = await User.find({studentId});

        if (!student) {
            throw new Error("Student not found");
        }
        const application = await Application.findOne({
            student: studentId
        }).populate({
            path: "course",
            match: { professor: professorId }
        });

        if (!application) {
            throw new Error(
                `No application found for student ${student.name} ${student.surname}`
            );
        }

        const course = application.course;

        await Application.findByIdAndUpdate(application._id,{
            applicationStatus: "Accepted"
        });

        const enroll = await Enrollment.create({
            student: studentId,
            course: course._id
        });

        return enroll;

    }


        
    // professor access
    async cancelEnrollmentRequest(studentId, professorId){
        const student = await User.find({student: studentId});

        if (student == null) {
            throw new Error("Student not found");
        }
        const application = await Application.findOne({
            student: studentId
        }).populate({
            path: "course",
            match: { professor: professorId }
        });

        if (application == null) {
            throw new Error(
                `No application found for student ${student.name} ${student.surname}`
            );
        }

        if (application.course.professor.toString() !== professorId) {
            throw new Error("Forbidden: not your course");
        }

        const course = application.course;

        const updated = await Application.findByIdAndUpdate(
            {application: applicationId},
            { applicationStatus: "Denied" },
            { new: true }
        );

        return updated;
        
    }

    // student access
    async applyForEnrollment(studentId, courseId) {

        const course = await Course.findById(courseId);

        if (!course) {
            throw new Error("Course does not exist!");
        }

        const existingApplication = await Application.findOne({
            student: studentId,
            course: courseId
        });

        if (existingApplication) {

            const statuses = {
                Pending: "You already applied and it's pending",
                Accepted: "You are already enrolled in this course",
                Denied: "Your application was denied"
            };

            throw new Error(
                statuses[existingApplication.applicationStatus] ||
                "Application already exists"
            );
        }

        const application = await Application.create({
            student: studentId,
            course: courseId,
            applicationStatus: "Pending"
        });

        return application;
    }

    // student access    
    async cancelApplication(studentId, courseId) {

        const course = await Course.find({courseId});

        if (course == null) {
            throw new Error("Course does not exist!");
        }

        const application = await Application.findOne({
            student: studentId,
            course: courseId
        });

        if (application) {

            const statuses = {
                Accepted: "You are already enrolled in this course",
                Denied: "Your application was denied"
            };

            throw new Error(
                statuses[application.applicationStatus] ||
                "Application already exists"
            );
        }
        

        await Application.deleteOne({
            student: studentId,
            course: courseId
        });

        return { message: "Application cancelled successfully" };
    }
}

module.exports = new EnrollmentService();