const enrollmentService = require("../services/enrollment.services");

class EnrollmentController{
    async showApplications(req, res){
        try{
            const profesorId = req.user.userId;

            const applicatons = enrollmentService.showApplications(profesorId);

            res.status(200).json({
                message: "Applications retrieved successfully.",
                applicatons
            });

        }catch(err){
            res.status(400).json({
                message: err.message
            });

        }
    }

    async showMyApplications(studentId){
        try{
            const studentId = req.user.userId;

            const applicatons = enrollmentService.showMyApplications(studentId);

            res.status(200).json({
                message: "Applications retrieved successfully.",
                applicatons
            });

        }catch(err){
            res.status(400).json({
                message: err.message
            });

        }

    }

    async acceptEnrollmentRequest(req, res){
        try{
            const studentId = req.params.studentId;
            const professorId = req.user.userId;

            const accepted = enrollmentService.acceptEnrollmentRequest(studentId, professorId); 

            res.status(200).json({
                message: "Enrollment accepted.",
            });

        }catch(err){
            res.status(400).json({
                message: err.message
            });

        }
    }

    async cancelEnrollmentRequest(req, res){
        try{
            const studentId = req.params.studentId;
            const professorId = req.user.userId;

            const canceled = enrollmentService.cancelEnrollmentRequest(studentId, professorId); 

            res.status(200).json({
                message: "Enrollment canceled.",
            });

        }catch(err){
            res.status(400).json({
                message: err.message
            });

        }
    }

    async applyForEnrollment(req, res){
        try{
            const studentId = req.user.userId;
            const courseId = req.params.courseId;

            const apply = enrollmentService.applyForEnrollment(studentId, courseId);

            res.status(200).json({
                message: "Applied successfully.",
                apply
            });

        }catch(err){
            res.status(400).json({
                message: err.message
            });

        }
    }

    async cancelAppliaction(req, res){
        try{
            const studentId = req.user.userId;
            const courseId = req.params.courseId;   
            
            const cancel = enrollmentService.cancelApplication(studentId, courseId);
            
            res.status(200).json({
                message: "Application canceled.",
            });

        }catch(err){
            res.status(400).json({
                message: err.message
            });

        }

    }
}

module.exports = EnrollmentController();