const express = require("express");
const router = express.Router();

const courseController = require("../controllers/course.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");


router.get(
    "/showAll",
    authMiddleware,
    authorizeRoles("Professor"),
    courseController.showCourses
)

router.get(
    "/showById/:courseId",
    authMiddleware,
    authorizeRoles("Professor"),
    courseController.showCourseById
)

router.post(
    "/create",
    authMiddleware,
    authorizeRoles("Professor"),
    courseController.createCourse
)

router.patch(
    "/update/:courseId",
    authMiddleware,
    authorizeRoles("Professor"),
    courseController.updateCourse
)

router.delete(
    "/delete/:courseId",
    authMiddleware,
    authorizeRoles("Professor"),
    courseController.deleteCourse
)

module.exports = router;