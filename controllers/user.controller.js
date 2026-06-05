const userService = require("../services/user.service");

class UserController {

    async updateCurrentUser(req, res) {

        try {

            const userId = req.user.userId;
            const data = req.body;

            const updatedUser = await userService.updateCurrentUser(userId, data);

            res.status(200).json({
                message: "User updated successfully",
                user: updatedUser
            });

        } catch (err) {

            res.status(400).json({
                message: err.message
            });

        }
    }

    async deleteCurrentUser(req, res) {

        try {

            const userId = req.user.userId;

            await userService.deleteCurrentUser(userId);

            res.status(200).json({
                message: "User deleted successfully"
            });

        } catch (err) {

            res.status(400).json({
                message: err.message
            });

        }
    }
}

module.exports = new UserController();