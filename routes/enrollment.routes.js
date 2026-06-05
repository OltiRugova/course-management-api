const express = require("express");
const router = express.Router();

const enrollmentController = require("../controllers/enrollment.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");

// professor routes
router.get(
    "/enrollments",
    authMiddleware,
    authorizeRoles("Professor"),
    enrollmentController.showApplications
);

router.patch(
    "/enrollments/accept/:studentId",
    authMiddleware,
    authorizeRoles("Professor"),
    enrollmentController.acceptEnrollmentRequest
);

router.patch(
    "/enrollments/cancel/:studentId",
    authMiddleware,
    authorizeRoles("Professor"),
    enrollmentController.cancelEnrollmentRequest
);

// student routes
router.get(
    "enrollments/my-applications",
    authMiddleware,
    authorizeRoles("Student"),
    enrollmentController.showMyApplications
);

router.post(
    "/enrollments/apply/:courseId",
    authMiddleware,
    authorizeRoles("Student"),
    enrollmentController.applyForEnrollment
);

router.patch(
    "/enrollments/cancel-application/:courseId",
    authMiddleware,
    authorizeRoles("Student"),
    enrollmentController.cancelAppliaction
);

module.exports = router;