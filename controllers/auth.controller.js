const authService = require("../services/auth.service");

class AuthController {

    async register(req, res) {

        try {

            const user = await authService.register(req.body);

            res.status(201).json({
                message: "User registered successfully",
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            });

        } catch (err) {

            res.status(400).json({
                message: err.message
            });

        }
    }

    async login(req, res) {

        try {

            const { username, password } = req.body;

            const token = await authService.login(
                username,
                password
            );

            res.status(200).json({
                message: "Login successful",
                token
            });

        } catch (err) {

            res.status(401).json({
                message: err.message
            });

        }
    }
}

module.exports = new AuthController();