// middlewares/adminMiddleware.js
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Admin from "../models/adminSchema.js";

const protectAdmin = asyncHandler(async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) {
      res.status(401);
      throw new Error("Not authorized, admin not found");
    }
    req.user = admin;
    next();
  } catch (err) {
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});

export default protectAdmin;
