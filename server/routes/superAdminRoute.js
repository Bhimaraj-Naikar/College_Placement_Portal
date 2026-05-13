// routes/superAdminRoute.js

import express from "express";

import {
  loginSuperAdmin,
  createAdmin,
  registerSuperAdmin,
  promoteToSuperAdmin,
} from "../controller/superAdminController.js";
import superAdminMiddleware from "../middlewares/superAdminMiddleware.js";

const router = express.Router();

// router.post("/register", registerSuperAdmin); // uncomment this line only if you want to register first ever super admin
router.post("/promote", superAdminMiddleware, promoteToSuperAdmin);
router.post("/create-admin", superAdminMiddleware, createAdmin);
router.post("/login", loginSuperAdmin);

export default router;
// superAdminRoutes.js (only in dev)
// router.post(
//   "/init-superadmin",
//   asyncHandler(async (req, res) => {
//     const { username, email, password } = req.body;
//     const hashed = await bcrypt.hash(password, 10);
//     const user = await SuperAdmin.create({ username, email, password: hashed });
//     res.status(201).json({ message: "SuperAdmin created" });
//   })
// );
