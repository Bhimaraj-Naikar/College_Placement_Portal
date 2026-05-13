import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authStudentRoutes from "./routes/studentRoute.js";
import authStudentProfileRoutes from "./routes/studentProfileRoute.js";
import { errorHandler } from "./middlewares/errorHandlre.js";
import superAdminRoutes from "./routes/superAdminRoute.js";
import adminRoutes from "./routes/adminRoutes.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();

const PORT = process.env.PORT || 5011;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust this to your frontend URL
    credentials: true, // Allow credentials if needed
  })
);

// Students routes
app.use("/api/students", authStudentRoutes);
app.use("/api/profile", authStudentProfileRoutes);

// Admin routes
app.use("/api/admin", adminRoutes);

// Super Admin routes
app.use("/api/superadmin", superAdminRoutes);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
