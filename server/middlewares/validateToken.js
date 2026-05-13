import Std from "../models/studentSchema.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const validateToken = asyncHandler(async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
    try {
      // decode the token with jwt secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // store the valid user data in req.user exluding password
      req.user = await Std.findById(decoded.id).select("-password");

      //if user not found in the DB
      if (!req.user) {
        res.status(404);
        throw new Error("User not found");
      }

      next(); // allowing other middlewares only if user is found
    } catch (error) {
      res.status(401);
      throw new Error("Invalid token");
    }
  } else {
    res.status(401);
    throw new Error("User not authorized or token expired");
  }
});

export default validateToken;
