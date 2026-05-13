// models/superAdminSchema.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const superAdminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^[a-zA-Z0-9._%+-]+@cmrit\.ac\.in$/, "Invalid college email"],
    },
    password: { type: String, required: true },
    role: { type: String, default: "superadmin" },
  },
  { timestamps: true }
);

// Hash password before saving
superAdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password
superAdminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const SuperAdmin = mongoose.model("SuperAdmin", superAdminSchema);
export default SuperAdmin;
