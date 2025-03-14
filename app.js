require("dotenv").config();
const express = require("express");
const app = express();
const auth = require("./routes/auth"); // Import routes
const list = require("./routes/list");
const cors = require("cors");
const path = require("path");

// Database connection
require("./conn/conn");

// Middleware (MUST come before routes)
app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/v1", auth); // Attach auth routes
app.use("/api/v2", list); // Attach list routes
console.log(process.env.NODE_ENV);
// Serve the React frontend in production
if (process.env.NODE_ENV == "production") {
  // Serve static files from the 'frontend/build' directory
  app.use(express.static(path.join(__dirname, "frontend", "dist")));

  // Any route not handled by API routes should serve the React frontend
  app.get("*", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "frontend", "dist")));
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
} else {
  // For development, you can continue to serve React via a development server
  app.get("/", (req, res) => {
    res.send("Development mode - API only");
  });
}

const PORT=process.env.PORT || 1000
// Start server
app.listen(PORT, () => {
  console.log("Server running on port 1000");
});
