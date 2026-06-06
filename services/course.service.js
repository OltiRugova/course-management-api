const User = require("../models/user.model");
const Course = require("../models/course.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class CourseService{
    async showCourses(professorId){
        const courses = await Course.find({professor: professorId});

        if(courses.length === null){
            throw new Error("You have no courses!");
        }

        return courses;
    }

    async showCourseById(professorId, courseId){

        const course = await Course.find($and[{professor: professorId}, {course: courseId}]);

        if(course._id != courseId){
            throw new Error("No course with id" . courseId);
            
        }
        
        if (course.professor != professorId) {
            throw new Error("Cannot access this course!");
            
        }

        return course;
    }

    async createCourse(data, professorId) {
        if (!data.title || !data.title.trim() || !data.description || !data.description.trim()) {
            throw new Error("Title and Description are required and cannot be empty!");
        }

        const existingCourse = await Course.findOne({
            professor: professorId,
            title: data.title.trim()
        });

        if (existingCourse) {
            throw new Error("You have already created a course with this title.");
        }

        const newCourse = await Course.create({
            title: data.title.trim(),
            description: data.description.trim(),
            professor: professorId
        });

        return newCourse;
    }

    async updateCourse(professorId, courseId, data) { 
        const course = await Course.findById(courseId);

        if (!course) {
            throw new Error("Course not found!");
        }

        if (course.profesor.toString() !== professorId.toString()) {
            throw new Error("No update authorization.");
        }

        const updates = {};

        if (data.title !== undefined) {
            if (!data.title.trim()) {
                throw new Error("Title cannot be empty");
            }
            updates.title = data.title.trim();
        }

        if (data.description !== undefined) {
            if (!data.description.trim()) {
                throw new Error("Description cannot be empty");
            }
            updates.description = data.description.trim();
        }


        const updatedCourse = await Course.findOneAndUpdate(
            { _id: courseId },
            { $set: updates },
            { new: true }
        );

        return updatedCourse;
    }

    async deleteCourse(professorId, courseId){
        const course = await Course.find(courseId);

        if(course == null){
            throw new Error("Course not found!");
        }

        if(course.profesor != professorId){
            throw new Error("No delete authorization.");
        }

        const deleteCourse = await Course.findByIdAndDelete(courseId);


        return { message: "Course deleted." };
    }
}

module.exports = new CourseService();