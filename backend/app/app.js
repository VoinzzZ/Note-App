const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.mongo");

const authRoutes = require("./routes/auth.routes");
const noteRoutes = require("./routes/note.route");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB Connect
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;
