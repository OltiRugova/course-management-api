const express = require("express");
const router = express.Router();

const enrollmentController = require("../controllers/enrollment.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");

// professor routes
router.get(
    "/showApplications",
    authMiddleware,
    authorizeRoles("Professor"),
    enrollmentController.showApplications
);

router.patch(
    "/accept/:studentId",
    authMiddleware,
    authorizeRoles("Professor"),
    enrollmentController.acceptEnrollmentRequest
);

router.patch(
    "/cancel/:studentId",
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
    "/apply/:courseId",
    authMiddleware,
    authorizeRoles("Student"),
    enrollmentController.applyForEnrollment
);

router.patch(
    "/cancel-application/:courseId",
    authMiddleware,
    authorizeRoles("Student"),
    enrollmentController.cancelAppliaction
);

module.exports = router;