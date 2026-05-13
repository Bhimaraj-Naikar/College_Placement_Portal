import mongoose from "mongoose";

const studentSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add name"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[a-zA-Z0-9._%+-]+@cmrit\.ac\.in$/, "Invalid College Email"],
    },
    password: {
      type: String,
      required: function () {
        return this.isApproved; // Password required *only* after approval
      },
      minlength: 6,
    },
    isApproved: {
      type: Boolean,
      default: false, // Admin has to manually approve
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Students", studentSchema);
