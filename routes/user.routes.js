const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

const authMiddleware = require("../middlewares/auth.middleware");

router.patch(
    "/user/update",
    authMiddleware,
    userController.updateCurrentUser
)

router.delete(
    "/user/delete",
    authMiddleware,
    userController.deleteCurrentUser
)

module.exports = router;