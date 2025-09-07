require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./app/config/db.mongo");

const authRoutes = require("./app/routes/auth.routes");
const noteRoutes = require("./app/routes/note.route");

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

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
