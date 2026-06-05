const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true
        },
        appliedAt:{
            type: Date,
            default: Date.now
        },
        applicationStatus:{
            type: String,
            enum: ["Pending", "Accepted", "Denied"],
            default: "Pending"
        }
    },
    { timestamps: true }
);