import asyncHandler from "express-async-handler";
import Admin from "../models/adminSchema.js";
import generateToken from "../utils/generateToken.js";
import Drive from "../models/driveSchema.js";
import Student from "../models/studentSchema.js";
import Notification from "../models/notificationSchema.js";
import StudentProfile from "../models/studentProfileSchema.js";

// ===========================
// AUTH & PROFILE
// ===========================

// @desc Login Admin
// @route POST /api/admin/login
export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    res.json({
      _id: admin._id,
      username: admin.username,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Get Admin Profile
// @route GET /api/admin/profile
export const getAdminProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.user._id).select("-password");
  if (!admin) {
    res.status(404);
    throw new Error("Admin not found");
  }
  res.json(admin);
});

// @desc Update Admin Profile
// @route PUT /api/admin/profile
export const updateAdminProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.user._id);

  if (!admin) {
    res.status(404);
    throw new Error("Admin not found");
  }

  admin.username = req.body.username || admin.username;
  admin.email = req.body.email || admin.email;

  if (req.body.password && req.body.password.length >= 6) {
    admin.password = req.body.password;
  }

  const updated = await admin.save();
  res.json({
    _id: updated._id,
    username: updated.username,
    email: updated.email,
    token: generateToken(updated._id),
  });
});

// ===========================
// DASHBOARD & STATS
// ===========================

export const getDashboardStats = asyncHandler(async (req, res) => {
  const studentsCount = await Student.countDocuments();
  const placedCount = await Student.countDocuments({ status: "Placed" });
  const drivesCount = await Drive.countDocuments();

  res.json({ studentsCount, placedCount, drivesCount });
});

// ===========================
// DRIVE MANAGEMENT
// ===========================

// @desc Create a Placement Drive
// @route POST /api/drives
export const createDrive = asyncHandler(async (req, res) => {
  const {
    driveName,
    company,
    description,
    eligibilityCriteria,
    driveDate,
    registrationDeadline,
    jobRoles,
    requiredDocuments,
    applicationLink,
    status,
  } = req.body;

  if (!driveName || !company || !driveDate || !registrationDeadline) {
    res.status(400);
    throw new Error("Missing required fields for drive creation.");
  }

  const drive = new Drive({
    driveName,
    company,
    description,
    eligibilityCriteria,
    driveDate,
    registrationDeadline,
    jobRoles,
    requiredDocuments,
    applicationLink,
    status,
    postedBy: req.user._id,
  });

  const createdDrive = await drive.save();
  res.status(201).json(createdDrive);
});

// @desc Get All Drives
// @route GET /api/drives
export const getAllDrives = asyncHandler(async (req, res) => {
  const drives = await Drive.find().populate("postedBy", "username email");
  res.json(drives);
});

// @desc Get Drive by ID
// @route GET /api/drives/:id
export const getDriveById = asyncHandler(async (req, res) => {
  const drive = await Drive.findById(req.params.id).populate(
    "postedBy",
    "username email"
  );
  if (!drive) {
    res.status(404);
    throw new Error("Drive not found");
  }
  res.json(drive);
});

// @desc Update Drive
// @route PUT /api/drives/:id
export const updateDrive = asyncHandler(async (req, res) => {
  const drive = await Drive.findById(req.params.id);
  if (!drive) {
    res.status(404);
    throw new Error("Drive not found");
  }

  // Optional: Only original poster or SuperAdmin can update
  // if (drive.postedBy.toString() !== req.user._id.toString() && !req.user.isSuperAdmin) {
  //   res.status(403);
  //   throw new Error("Unauthorized to update this drive.");
  // }

  const updatedDrive = await Drive.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.json(updatedDrive);
});

// @desc Delete Drive
// @route DELETE /api/drives/:id
export const deleteDrive = asyncHandler(async (req, res) => {
  const drive = await Drive.findById(req.params.id);
  if (!drive) {
    res.status(404);
    throw new Error("Drive not found");
  }

  await drive.deleteOne();
  res.json({ message: "Drive deleted successfully" });
});

// ===========================
// STUDENT MANAGEMENT
// ===========================

export const getAllStudents = asyncHandler(async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

export const getStudentById = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    res.status(404);
    throw new Error("Student not found");
  }
  res.json(student);
});

export const getStudentProfileByStudentId = asyncHandler(async (req, res) => {
  const profile = await StudentProfile.findOne({
    student_id: req.params.studentId,
  });
  if (!profile) {
    res.status(404);
    throw new Error("Student profile not found for this ID.");
  }
  res.json(profile);
});

export const updatePlacementStatus = asyncHandler(async (req, res) => {
  const { placedStatus, placedCompany, placedRole } = req.body;
  const profile = await StudentProfile.findOne({ student_id: req.params.id });

  if (!profile) {
    res.status(404);
    throw new Error("Student profile not found");
  }

  profile.placedStatus = placedStatus ?? profile.placedStatus;
  profile.placedCompany = placedCompany ?? profile.placedCompany;
  profile.placedRole = placedRole ?? profile.placedRole;

  const updated = await profile.save();
  res.status(200).json(updated);
});

// ===========================
// NOTIFICATIONS
// ===========================

export const sendNotification = asyncHandler(async (req, res) => {
  const { title, message, recipients } = req.body;

  if (!title || !message || !Array.isArray(recipients)) {
    res.status(400);
    throw new Error("Invalid notification input");
  }

  const notifications = recipients.map((studentId) => ({
    title,
    message,
    student: studentId,
  }));

  await Notification.insertMany(notifications);
  res.status(201).json({ message: "Notifications sent successfully" });
});
