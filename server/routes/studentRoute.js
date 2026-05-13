import express from "express";
import {
  registerStudent,
  loginStudent,
  getStudent,
} from "../controller/studentController.js";

const router = express.Router();

router.post("/register", registerStudent);
router.post("/login", loginStudent);

router.get("/:id", getStudent);
// router.put("/:id", updateStudent)

export default router;
