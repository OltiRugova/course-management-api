const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class UserService{
    async updateCurrentUser(userId, updateData) {
            
            const allowedFields = ["name","surname","username", "email", "password"];
    
            const filteredData = {};
    
            for (const key of allowedFields) {
                if (updateData[key] !== undefined) {
                    filteredData[key] = updateData[key];
                }
            }
    
            if (filteredData.password) {
                filteredData.password = await bcrypt.hash(filteredData.password, 10);
            }
    
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                filteredData,
                { new: true }
            );
    
            return updatedUser;
        }
    
        async deleteCurrentUser(userId) {
            const deletedUser = await User.findByIdAndDelete(userId);
    
            if (!deletedUser) {
                throw new Error("User not found");
            }
    
            return deletedUser;
        }
}

module.exports = new UserService();