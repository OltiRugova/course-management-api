const express = require("express");
const router = express.Router();

const enrollmentController = require("../controllers/enrollment.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/authorizeRoles");

// professor routes
router.get(
    "/applications",
    authMiddleware,
    authorizeRoles("Professor"),
    enrollmentController.showApplications
);

router.patch(
    "/applications/accept/:studentId",
    authMiddleware,
    authorizeRoles("Professor"),
    enrollmentController.acceptEnrollmentRequest
);

router.patch(
    "/applicaions/cancel/:studentId",
    authMiddleware,
    authorizeRoles("Professor"),
    enrollmentController.cancelEnrollmentRequest
);

// student routes
router.get(
    "applicaions/my-applications",
    authMiddleware,
    authorizeRoles("Student"),
    enrollmentController.showMyApplications
);

router.post(
    "/applications/apply/:courseId",
    authMiddleware,
    authorizeRoles("Student"),
    enrollmentController.applyForEnrollment
);

router.patch(
    "/applications/cancel-application/:courseId",
    authMiddleware,
    authorizeRoles("Student"),
    enrollmentController.cancelAppliaction
);

module.exports = router;