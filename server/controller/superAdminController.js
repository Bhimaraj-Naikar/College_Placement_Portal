// controller/superAdminController.js
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import SuperAdmin from "../models/superAdminSchema.js";
import Admin from "../models/adminSchema.js";

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register SuperAdmin
export const registerSuperAdmin = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const userExists = await SuperAdmin.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("SuperAdmin already exists");
  }

  const superadmin = await SuperAdmin.create({ username, email, password });

  res.status(201).json({
    id: superadmin._id,
    username: superadmin.username,
    email: superadmin.email,
    token: generateToken(superadmin._id),
  });
});

// Login
export const loginSuperAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const superadmin = await SuperAdmin.findOne({ email });

  console.log("Found superadmin:", superadmin);

  if (!superadmin) {
    res.status(401);
    throw new Error("Invalid credentials - user not found");
  }

  const isMatch = await superadmin.matchPassword(password);
  console.log("Password match:", isMatch);

  if (isMatch) {
    res.json({
      id: superadmin._id,
      username: superadmin.username,
      email: superadmin.email,
      token: generateToken(superadmin._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials - wrong password");
  }
});

// Controller
export const promoteToSuperAdmin = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const user = await Admin.findById(userId); // or Student
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.role = "superadmin";
  await user.save();

  res.status(200).json({ message: "User promoted to SuperAdmin" });
});

export const createAdmin = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const adminExists = await Admin.findOne({ email });
  if (adminExists) {
    res.status(400);
    throw new Error("Admin already exists");
  }

  const admin = await Admin.create({ username, email, password });
  if (admin) {
    res.status(201).json({ message: "Admin created successfully" });
  } else {
    res.status(400);
    throw new Error("Invalid admin data");
  }
});

// Add route (Only accessible by SuperAdmin)
// routes/superAdminRoutes.js (inside existing router)
// router.post("/create-admin", protectSuperAdmin, createAdmin);
