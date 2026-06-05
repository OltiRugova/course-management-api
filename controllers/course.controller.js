const courseService = require("../services/course.service");

class CourseController{

    async showCourses(req, res){
        try{
            const profesorId = req.user.userId;

            const courses = courseService.showCourses(profesorId);

            res.status(200).json({
                message: "Courses retrieved successfully.",
                courses
            });
        }catch(err){

            res.status(400).json({
                message: err.message
            });

        }



    }

    async showCourseById(res,res){
        try{
            const profesorId = req.user.userId;
            const courseId = req.body.courseId;

            const course = courseService.showCourseById(profesorId, courseId);

            res.status(200).json({
                message: "Course retrieved successfully.",
                course
            });

        }catch(err){
                res.status(400).json({
                message: err.message
            });
        }
    }

    async createCourse(req, res){
        try{
            const data = req.body;
            const profesorId = res.user.userId;

            const newCourse = courseService.createCourse(data);

            res.status(200).json({
                message: "Course created successfully!",
                newCourse
            });



        }catch(err){
            res.status(400).json({
                message: err.message
            });
        }
    }

    async updateCourse(req, res){
        try{
            const profesorIdId = req.user.userId;
            const data = req.body;

            const updatedCourse = courseService.updateCourse(professorId, data);

            res.status(200).json({
                message: "User updated successfully!",
                updatedCourse
            });
        }catch(err){
            res.status(400).json({
                message: err.message
            });
        }
    }

    async deleteCourse(req,res){
        try{
            const professorId = req.user.usrId;
            const courseId = req.params.id;

            const deleteCourse = courseService.deleteCourse(professorId, courseId);

            res.status(200).json({
                message: "Course deleted successfully!"
            });

        }catch(err){
            res.status(400).json({
                message: err.message
            });
        }

    }

}