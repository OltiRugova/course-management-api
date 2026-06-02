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
        return await Application.find()
            .populate({
                path: "course",
                match: { professor: professorId }
            })
            .populate("student");
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

        if (!application || !application.course) {
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

        if (!student) {
            throw new Error("Student not found");
        }
        const application = await Application.findOne({
            student: studentId
        }).populate({
            path: "course",
            match: { professor: professorId }
        });

        if (!application || !application.course) {
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

        if (!course) {
            throw new Error("Course does not exist!");
        }

        const existingApplication = await Application.findOne({
            student: studentId,
            course: courseId
        });

        if (existingApplication) {
            if (existingApplication.status === "Pending") {
                throw new Error("You already applied and it's pending");
            }

            if (existingApplication.status === "Accepted") {
                throw new Error("You are already enrolled in this course");
            }

            if (existingApplication.status === "Denied") {
                throw new Error("Your application was denied");
            }
        }

        // 3. create new application
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

        if (!course) {
            throw new Error("Course does not exist!");
        }

        const application = await Application.findOne({
            student: studentId,
            course: courseId
        });

        if (!application) {
            throw new Error("You haven't applied for this course!");
        }

        if (application.status === "Accepted") {
            throw new Error("Cannot cancel an accepted application!");
        }

        if (application.status === "Denied") {
            throw new Error("Application is already denied!");
        }

        await Application.deleteOne({
            student: studentId,
            course: courseId
        });

        return { message: "Application cancelled successfully" };
    }
}

module.exports = new EnrollmentService();