require("dotenv").config();
const express = require("express");
const connectDB = require("./database/db");

const app = express();

const authRoutes = require("./routes/auth.routes");
const courseRoutes = require("./routes/course.routes");
const enrollmentRoutes = require("./routes/enrollment.routes");
const userRoutes = require("./routes/user.routes");


app.use(express.json());

connectDB();

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/courses", courseRoutes);
app.use("/enrollments", enrollmentRoutes);

app.listen(3000, () => {
    console.log("Server started on port 3000");
});