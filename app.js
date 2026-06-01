require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");

const app = express();

const authRoutes = require("./src/routes/auth.routes");
const courseRoutes = require("./src/routes/course.routes");
const enrollmentRoutes = require("./src/routes/enrollment.routes");
const userRoutes = require("./src/routes/users.routes");

const app = express();

app.use(express.json());

connectDB();

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/courses", courseRoutes);
app.use("/enrollments", enrollmentRoutes);

app.listen(3000, () => {
    console.log("Server started on port 3000");
});