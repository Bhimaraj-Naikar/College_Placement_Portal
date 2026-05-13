import express from "express";
import {
  createProfile,
  updateProfile,
  deleteProfile,
  getProfileById, // Changed from getProfile
  getMyProfile,
  getEligibleDrives,
  getAllDrives,
} from "../controller/studentProfileController.js";

import validateToken from "../middlewares/validateToken.js";

const router = express.Router();

router.use(validateToken);

router.get("/drives/eligible", getEligibleDrives); // Get eligible drives for the authenticated student
router.get("/drives/all", getAllDrives); // Get all drives for the authenticated student

router.post("/", createProfile);

router.get("/me", getMyProfile);

router
  .route("/:id")
  .get(getProfileById) // Get a specific profile by its document ID
  .put(updateProfile) // Update a specific profile by its document ID
  .delete(deleteProfile); // Delete a specific profile by its document ID

export default router;
