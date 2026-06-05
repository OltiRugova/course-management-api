const express = require("express");
const router = express.Router();

const courseController = require("../controllers/course.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/authorizeRoles");


router.get(
    "/courses/showAll",
    authMiddleware,
    authorizeRoles("Professor"),
    courseController.showCourses
)

router.get(
    "/courses/showById/:courseId",
    authMiddleware,
    authorizeRoles("Professor"),
    courseController.showCoursesById
)

router.post(
    "/courses/create",
    authMiddleware,
    authorizeRoles("Professor"),
    courseController.createCourse
)

router.patch(
    "/courses/update/:courseId",
    authMiddleware,
    authorizeRoles("Professor"),
    courseController.updateCourse
)

router.delete(
    "/course/delete/:courseId",
    authMiddleware,
    authorizeRoles("Professor"),
    courseController.deleteCourse
)