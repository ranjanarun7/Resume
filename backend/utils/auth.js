let users = [
  {
    id: "1",
    name: "Arun Kumar Yadav",
    email: "arunkumar@gmail.com",
    password: "Arun@123",
    role: "admin"
  },
  {
    id: "2",
    name: "Ranjan Yadav",
    email: "ranjan@gmail.com",
    password: "Ranjan@123", 
    role: "user"
  }
];

// Simple JWT token generation (in production, use proper JWT library)
function generateToken(user) {
  const tokenData = {
    id: user.id,
    email: user.email,
    role: user.role,
    iat: Date.now()
  };
  return Buffer.from(JSON.stringify(tokenData)).toString("base64");
}

// Validate token
function validateToken(token) {
  try {
    const decoded = JSON.parse(Buffer.from(token, "base64").toString("utf-8"));
    return decoded;
  } catch (error) {
    return null;
  }
}

export { users, generateToken, validateToken };
