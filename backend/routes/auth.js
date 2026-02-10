import express from "express";
import { users, generateToken } from "../utils/auth.js";

const router = express.Router();

// Login endpoint
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Find user
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Generate token
  const token = generateToken(user);

  // Return user data (without password)
  const userData = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };

  res.json({
    message: "Login successful",
    user: userData,
    token: token
  });
});

// Signup endpoint
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  // Check if user already exists
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ message: "Email already registered" });
  }

  // Create new user
  const newUser = {
    id: String(users.length + 1),
    name: name,
    email: email,
    password: password, // In production, hash this with bcryptjs
    role: "user" // Default role is user
  };

  users.push(newUser);

  // Generate token
  const token = generateToken(newUser);

  // Return user data (without password)
  const userData = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role
  };

  res.status(201).json({
    message: "Signup successful",
    user: userData,
    token: token
  });
});

// Get current user endpoint
router.get("/me", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // In production, validate token properly
  const user = users.find(u => u.id === "1"); // Simplified

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  });
});

export default router;
