const User = require("../models/user.model");
const Course = require("../models/course.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class CourseService{
    async showCourses(professorId){
        const courses = await Course.find(professorId);

        if(courses == null){
            throw new Error("You have no courses!");
        }
    }

    async showCourseById(professorId, courseId){

        const course = await Course.findById($and[{professorId}, {courseId}]);

        if(course._id != courseId){
            throw new Error("No course with id" . courseId);
            
        }
        
        if (course.professor != professorId) {
            throw new Error("Cannot access this course!");
            
        }

        return course;
    }

    async createCourse(data, profesorId){
        const course = await Course.findOne(
            $and[{profesor:profesorId}, {title:data.title}]
        ); // potential err

        if (data.title !== undefined) {
            if (!data.title.trim()) {
                throw new Error("Title cannot be empty");
            }
            updates.title = data.title;
        }

        if (data.description !== undefined) {
            if (!data.description.trim()) {
                throw new Error("Description cannot be empty");
            }
            updates.description = data.description;
        }             

        if(data.title.empty() || data.description.empty()){
            throw new Error("Title and Description are required!");
        }
        const newCourse = await Course.create(data);

        return newCourse;
    }

    async updateCourse(professorId, data) {
        const course = await Course.find(data.course);

        if(course == null){
            throw new Error("Course not found!");
        }

        if(course.profesor != professorId){
            throw new Error("No update authorization.");
        }

        const updates = {};

        if (data.title !== undefined) {
            if (!data.title.trim()) {
                throw new Error("Title cannot be empty");
            }
            updates.title = data.title;
        }

        if (data.description !== undefined) {
            if (!data.description.trim()) {
                throw new Error("Description cannot be empty");
            }
            updates.description = data.description;
        }

        const updatedCourse = await Course.findOneAndUpdate(
            courseId,
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