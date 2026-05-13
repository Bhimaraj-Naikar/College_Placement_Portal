import StudentProfile from "../models/studentProfileSchema.js";
import asyncHandler from "express-async-handler";
import Drive from "../models/driveSchema.js";
import Student from "../models/studentSchema.js";

// Fields that cannot be updated through regular profile updates
const IMMUTABLE_FIELDS = [
  "student_id",
  "email",
  "password",
  "usn",
  "panNumber",
  "aadhaarNumber",
  "createdAt",
  "updatedAt",
];

// Required fields for profile creation
const REQUIRED_FIELDS = [
  "firstName",
  "lastName",
  "phoneNumber",
  "dateOfBirth",
  // "usn",
  // "degree",
  // "branch",
  // "currentCGPA",
  // "ugYearOfPassing",
  // "resumeUrl",
  // "englishTests",
  // "aptitudeTests",
  // "softSkillsTests",
  // "programmingTests",
];

// Test categories and their required keys
const TEST_CATEGORIES = {
  englishTests: ["L1", "L2", "L3", "L4"],
  aptitudeTests: ["A1", "A2", "A3", "A4"],
  softSkillsTests: ["S1", "S2", "S3", "S4"],
  programmingTests: ["P1", "P2", "P3", "P4"],
};

// Helper functions
const filterSensitiveFields = (body) => {
  const filtered = { ...body };
  IMMUTABLE_FIELDS.forEach((field) => delete filtered[field]);
  return filtered;
};

const validateTestScores = (tests) => {
  for (const [category, keys] of Object.entries(TEST_CATEGORIES)) {
    if (!tests[category]) return false;
    if (keys.some((key) => tests[category][key] === undefined)) return false;
  }
  return true;
};

// Controllers
export const createProfile = asyncHandler(async (req, res) => {
  try {
    const missingFields = REQUIRED_FIELDS.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      res.status(400);
      throw new Error(
        "Missing required fields. Please provide all profile data."
      );
    }

    const existingProfile = await StudentProfile.findOne({
      student_id: req.user._id,
    });

    if (existingProfile) {
      res.status(400);
      throw new Error("Profile already exists for this student.");
    }

    console.log("Creating profile with:", {
      student_id: req.user._id,
      ...req.body,
    });

    const profile = await StudentProfile.create({
      student_id: req.user._id,
      ...req.body,
    });

    res.status(201).json(profile);
  } catch (error) {
    console.error("Error creating profile:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

export const getMyProfile = asyncHandler(async (req, res) => {
  const profile = await StudentProfile.findOne({ student_id: req.user._id });

  if (!profile) {
    res.status(404);
    throw new Error("No profile found. Please create your profile first.");
  }

  res.status(200).json(profile);
});

export const getProfileById = asyncHandler(async (req, res) => {
  const profile = await StudentProfile.findById(req.params.id);

  if (!profile) {
    res.status(404);
    throw new Error("Student profile not found.");
  }

  res.status(200).json(profile);
});

export const updateProfile = asyncHandler(async (req, res) => {
  const profile = await StudentProfile.findById(req.params.id);

  if (!profile) {
    res.status(404);
    throw new Error("Student profile not found.");
  }

  if (profile.student_id.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Unauthorized profile update attempt.");
  }

  const updateData = filterSensitiveFields(req.body);
  const updatedProfile = await StudentProfile.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true, runValidators: true }
  );

  res.status(200).json(updatedProfile);
});

export const deleteProfile = asyncHandler(async (req, res) => {
  const profile = await StudentProfile.findById(req.params.id);

  if (!profile) {
    res.status(404);
    throw new Error("Student profile not found.");
  }

  if (profile.student_id.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Unauthorized profile deletion attempt.");
  }

  await profile.deleteOne();
  res.status(200).json({
    message: "Profile deleted successfully",
    deletedId: req.params.id,
  });
});

// Function to get eligible drives for a student based on their profile

export const getEligibleDrives = asyncHandler(async (req, res) => {
  const studentProfile = await StudentProfile.findOne({
    student_id: req.user.id,
  });

  if (!studentProfile) {
    return res.status(404).json({ message: "Student profile not found" });
  }

  const allDrives = await Drive.find();

  const eligibleDrives = allDrives.filter((drive) => {
    const { cgpa, branches, yearOfPassing, backlogsAllowed } =
      drive.eligibilityCriteria || {};

    // CGPA check (default minimum CGPA threshold: 6)
    const cgpaOk = studentProfile.currentCGPA >= (cgpa ?? 6);

    // Branch check (case insensitive)
    const branchOk =
      branches?.includes("ALL") ||
      branches?.some(
        (b) =>
          b.toString().toLowerCase() ===
          studentProfile.branch?.toString().toLowerCase()
      );

    // Year of passing check
    const yearOk =
      !yearOfPassing ||
      yearOfPassing.length === 0 ||
      yearOfPassing.includes(studentProfile.ugYearOfPassing);

    // Backlogs check
    const backlogsOk = backlogsAllowed || studentProfile.activeBacklogs === 0;

    // Registration deadline check
    const deadlineOk =
      new Date(drive.registrationDeadline).getTime() > Date.now();

    return cgpaOk && branchOk && yearOk && backlogsOk && deadlineOk;
  });

  res.status(200).json(eligibleDrives);
});

export const getAllDrives = asyncHandler(async (req, res) => {
  const drives = await Drive.find();
  res.status(200).json(drives);
});
