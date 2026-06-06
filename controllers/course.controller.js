const courseService = require("../services/course.service");

class CourseController {

    async showCourses(req, res) {
        try {
            const profesorId = req.user.userId;

            const courses = await courseService.showCourses(profesorId);

            res.status(200).json({
                message: "Courses retrieved successfully.",
                courses
            });

        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async showCourseById(req, res) {
        try {
            const profesorId = req.user.userId;
            const courseId = req.params.courseId;

            const course = await courseService.showCourseById(profesorId, courseId);

            res.status(200).json({
                message: "Course retrieved successfully.",
                course
            });

        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async createCourse(req, res) {
        try {
            const data = req.body;
            const profesorId = req.user.userId;

            const newCourse = await courseService.createCourse(data, profesorId);

            res.status(201).json({
                message: "Course created successfully!",
                newCourse
            });

        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async updateCourse(req, res) {
        try {
            const professorId = req.user.userId;
            const data = req.body;

            const updatedCourse = await courseService.updateCourse(professorId, data);

            res.status(200).json({
                message: "Course updated successfully!",
                updatedCourse
            });

        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async deleteCourse(req, res) {
        try {
            const professorId = req.user.userId;
            const courseId = req.params.id;

            await courseService.deleteCourse(professorId, courseId);

            res.status(200).json({
                message: "Course deleted successfully!"
            });

        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
}

module.exports = new CourseController();