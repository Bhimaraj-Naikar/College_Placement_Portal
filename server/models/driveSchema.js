import mongoose from "mongoose";

const driveSchema = new mongoose.Schema(
  {
    driveName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
    },
    company: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      default: "No description provided.",
    },
    eligibilityCriteria: {
      cgpa: {
        type: Number,
        min: 0,
        max: 10,
        default: 6.0, // Default minimum CGPA
      },
      branches: {
        type: [String], // Array of strings, e.g., ['CSE', 'ECE', 'IT']
        default: [],
        enum: [
          "CSE",
          "ECE",
          "IT",
          "MECH",
          "CIVIL",
          "EEE",
          "CHEM",
          "BIO",
          "ALL",
        ], // Example branches, adjust as needed
      },
      yearOfPassing: {
        type: [Number], // Array of numbers, e.g., [2024, 2025]
        default: [],
      },
      backlogsAllowed: {
        type: Boolean,
        default: false,
      },
      otherCriteria: {
        type: String,
        trim: true,
        default: "",
      },
    },
    driveDate: {
      type: Date,
      required: true,
    },
    registrationDeadline: {
      type: Date,
      required: true,
    },
    jobRoles: [
      {
        roleName: {
          type: String,
          required: true,
          trim: true,
        },
        salaryPackage: {
          // In LPA (Lakhs Per Annum)
          type: Number,
          min: 0,
          required: true,
        },
        location: {
          type: String,
          trim: true,
          default: "Any",
        },
        bond: {
          type: String,
          trim: true,
          default: "No bond",
        },
      },
    ],
    requiredDocuments: {
      type: [String], // Array of strings, e.g., ['Resume', 'Transcripts', 'ID Proof']
      default: ["Resume"],
    },
    applicationLink: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(v); // Basic URL validation
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
      default: "",
    },
    status: {
      type: String,
      enum: ["Upcoming", "Active", "Closed", "Completed", "Cancelled"],
      default: "Upcoming",
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin", // Assuming you have an 'Admin' model
      required: true,
    },
    // Timestamps for creation and last update
  },
  {
    timestamps: true,
  }
);

const Drive = mongoose.model("Drive", driveSchema);

export default Drive;
