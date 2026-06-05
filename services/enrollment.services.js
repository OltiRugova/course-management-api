const Enrollment = require("../models/enrollment.model");
const Application = require("../models/application.model");
const User = require("../models/user.model");
const Course = require("../models/course.model");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    async showMyEnrollments(studentId) {
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
        const student = await User.findById(studentId);

        if (!student) {
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

        const course = application.course;

        await Application.findByIdAndUpdate(application._id,{
            status: "Accepted"
        });

        const enroll = await Enrollment.create({
            student: studentId,
            course: course._id
        });

        return enroll;

    }


        
    // professor access
    async cancelEnrollmentRequest(studentId, professorId){
        const student = await User.findById(studentId);

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
            applicationId,
            { status: "Denied" },
            { new: true }
        );

        return updated;
        
    }

    // student access
    async applyForEnrollment(studentId, courseId) {

        const course = await Course.findById(courseId);

        if (course == null) {
            throw new Error("Course does not exist!");
        }

        const existingApplication = await Application.findOne({
            student: studentId,
            course: courseId
        });

        if (existingApplication == null) {
            throw new Error("You don't h")
        }

        const statuses = [
            {
                state: "Pending",
                err: "You already applied and it's pending"
            },
            {
                state: "Accepted",
                err: "You are already enrolled in this course"
            },
            {
                state: "Denied",
                err: "Your application was denied"
            }
        ];

        statuses.forEach(status => {
            if (existingApplication.status === status.state) {
                throw new Error(status.err);
            }
        });

        const application = await Application.create({
            student: studentId,
            course: courseId,
            status: "Pending"
        });

        return application;
    }

    // student access    
    async cancelApplication(studentId, courseId) {

        const course = await Course.findById(courseId);

        if (course == null) {
            throw new Error("Course does not exist!");
        }

        const application = await Application.findOne({
            student: studentId,
            course: courseId
        });

        if (application == null) {
            throw new Error("You haven't applied for this course!");
        }

        const statuses = [
            {
                state: "Accepted",
                err: "You are already enrolled in this course"
            },
            {
                state: "Denied",
                err: "Your application was denied"
            }
        ];

        statuses.forEach(status => {
            if (existingApplication.status === status.state) {
                throw new Error(status.err);
            }
        });

        await Application.deleteOne({
            student: studentId,
            course: courseId
        });

        return { message: "Application cancelled successfully" };
    }
}

module.exports = new EnrollmentService();