// middlewares/superAdminMiddleware.js
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import SuperAdmin from "../models/superAdminSchema.js";

const protectSuperAdmin = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const superadmin = await SuperAdmin.findById(decoded.id).select(
        "-password"
      );

      if (!superadmin) {
        res.status(401);
        throw new Error("Not authorized, superadmin not found");
      }

      // ✅ Critical: Role check
      if (superadmin.role !== "superadmin") {
        res.status(403);
        throw new Error("Access denied. Not a superadmin");
      }

      req.user = superadmin;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export default protectSuperAdmin;
