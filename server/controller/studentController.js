import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Std from "../models/studentSchema.js";

export const registerStudent = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await Std.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await Std.create({
    username,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      user: {
        id: newUser.id,
        email: newUser.email,
      },
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(201).json({
    token,
    user: {
      id: newUser.id,
      email: newUser.email,
    },
  });
});

export const loginStudent = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await Std.findOne({ email });
  if (!existingUser) {
    res.status(404);
    throw new Error("User not registered");
  }

  const isMatch = await bcrypt.compare(password, existingUser.password);
  if (!isMatch) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { id: existingUser._id, email: existingUser.email },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  res.status(200).json({
    token,
    user: {
      id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
    },
  });
});

export const getStudent = asyncHandler(async (req, res) => {
  const student = await Std.findById(req.params.id);
  if (!student) {
    res.status(404);
    throw new Error("Student not found");
  }
  res.status(200).json({
    id: student._id,
    username: student.username,
    email: student.email,
  });
});

export const updateStudent = asyncHandler(async (req, res) => {
  const student = await Std.findByIdAndUpdate(req.params.id);
  if (!student) {
    res.status(404);
    throw new Error("Student not found");
  }
});
// export const getStudentProfile = asyncHandler(async (req, res) => {
//   if (req.user.id.toString() !== req.params.id) {
//     res.status(403);
//     throw new Error("You can only update your own profile.");
//   }
//   res.status(200).json({
//     id: req.user._id,
//     username: req.user.username,
//     email: req.user.email,
//   });
// });

// export const updateStudentProfile = asyncHandler(async(req , res )=>{
//   const student = await Std.findById(req.params.id);
//   if(!student){
//     res.status(404);
//     throw new Error("Student not found");
//   }

// })
