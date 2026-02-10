import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import resumeRoutes from "./routes/analyzeResume.js";
import authRoutes from "./routes/auth.js";

// Load environment variables
dotenv.config();

const app = express();
app.use(cors({ origin: ["http://localhost:3000", "https://resume-git-main-arun-kumars-projects-7be3f015.vercel.app/" ] }));
app.use(express.json());

// API Routes
app.use("/api/resume", resumeRoutes);
app.use("/api/auth", authRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({ 
    error: err.message || "Internal server error",
    details: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
});

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
  console.log("📝 API Key loaded:", process.env.GEMINI_API_KEY ? "✓ Yes" : "✗ No");
});
