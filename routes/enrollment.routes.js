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
    "/my-applications",
    authMiddleware,
    authorizeRoles("student"),
    enrollmentController.showMyApplications
);

router.post(
    "/apply/:courseId",
    authMiddleware,
    authorizeRoles("student"),
    enrollmentController.applyForEnrollment
);

router.patch(
    "/cancel-application/:courseId",
    authMiddleware,
    authorizeRoles("student"),
    enrollmentController.cancelAppliaction
);

module.exports = router;