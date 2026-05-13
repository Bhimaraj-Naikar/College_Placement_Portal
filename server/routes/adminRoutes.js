// routes/adminRoutes.js
import express from "express";
import {
  loginAdmin,
  getAdminProfile,
  updateAdminProfile,
  getDashboardStats,
  createDrive,
  getAllDrives,
  getDriveById,
  updateDrive,
  deleteDrive,
  getAllStudents,
  getStudentById,
  updatePlacementStatus,
  sendNotification,
  getStudentProfileByStudentId,
} from "../controller/adminController.js";
import protectAdmin from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/login", loginAdmin);
router
  .route("/profile")
  .get(protectAdmin, getAdminProfile)
  .put(protectAdmin, updateAdminProfile);

// Dashboard Stats
router.get("/dashboard", protectAdmin, getDashboardStats);

// Drive Management
router.post("/drives", protectAdmin, createDrive);
router.get("/drives", protectAdmin, getAllDrives);
router.get("/drives/:id", protectAdmin, getDriveById);
router.put("/drives/:id", protectAdmin, updateDrive);
router.delete("/drives/:id", protectAdmin, deleteDrive);

// Student Management
router.get("/students", protectAdmin, getAllStudents);
router.get("/students/:id", protectAdmin, getStudentById);
router.get(
  "/studentprofile/by-student/:studentId",
  protectAdmin,
  getStudentProfileByStudentId
);
// new route added
router.put("/students/:id/status", protectAdmin, updatePlacementStatus);

// Notification System
router.post("/notify", protectAdmin, sendNotification);

export default router;
