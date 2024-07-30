const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const cors = require("cors");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Database Connection
mongoose
	.connect(
		"mongodb+srv://ranjeetraj44666:placement-assignment@placement-assignment.xggom9f.mongodb.net/?retryWrites=true&w=majority&appName=Placement-assignment",
	)
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.log(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
