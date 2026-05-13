import mongoose from "mongoose";

const studentProfileSchema = new mongoose.Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "Students",
      index: true,
    },

    // Personal Information

    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Other",
    },
    dateOfBirth: { type: Date, required: true },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      match: [/^\d{10}$/, "Please fill a valid 10-digit phone number"],
    },
    email: {
      type: String,
      required: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please fill a valid email address"],
    },

    // Parental Information

    // father: {
    //   name: { type: String, required: true, trim: true },
    //   mobile: {
    //     type: String,
    //     required: true,
    //     trim: true,
    //     match: [/^\d{10}$/, "Please fill a valid 10-digit phone number"],
    //   },
    //   email: { type: String, trim: true },
    //   occupation: { type: String, required: true, trim: true },
    // },
    // mother: {
    //   name: { type: String, required: true, trim: true },
    //   mobile: {
    //     type: String,
    //     required: true,
    //     trim: true,
    //     match: [/^\d{10}$/, "Please fill a valid 10-digit phone number"],
    //   },
    //   occupation: { type: String, required: true, trim: true },
    // },

    // Languages
    // languagesKnown: { type: [String], default: [] },
    // foreignLanguagesKnown: { type: [String], default: [] },

    // Address
    // permanentAddress: { type: String, required: true, trim: true },
    // currentAddress: { type: String, required: true, trim: true },
    // nativeCity: { type: String, trim: true },
    // nativeState: { type: String, trim: true },

    // Academic Info
    // usn: {
    //   type: String,
    //   required: true,
    //   unique: true,
    //   trim: true,
    //   index: true,
    // },

    // classSection: { type: String, trim: true }, // UG/PG section

    // // 10th
    // tenthMarks: { type: Number, min: 0, max: 100, required: true, index: true },
    // tenthYearOfPassing: { type: Number, required: true },
    // tenthBoard: { type: String, required: true, trim: true },
    // tenthMarksCardUrl: { type: String, trim: true },

    // // 12th
    // twelfthMarks: { type: Number, min: 0, max: 100, index: true },
    // twelfthYearOfPassing: { type: Number },
    // twelfthBoard: { type: String, trim: true },
    // twelfthMarksCardUrl: { type: String, trim: true },

    // // Diploma
    // diplomaMarks: { type: Number, min: 0, max: 100, index: true },
    // diplomaYearOfPassing: { type: Number },
    // diplomaSpecialization: { type: String, trim: true },
    // diplomaBoard: { type: String, trim: true },
    // diplomaMarksCardUrl: { type: String, trim: true },

    // // UG (for PG students)
    // ugYearOfPassing: { type: Number },
    // ugBranch: { type: String, trim: true },
    // ugCollegeName: { type: String, trim: true },
    // ugUniversityName: { type: String, trim: true },
    // ugCertificateUrl: { type: String, trim: true },

    // // PG
    // degree: { type: String, enum: ["UG", "PG"], required: true, index: true },
    // branch: { type: String, required: true, trim: true, index: true },
    // currentSemester: { type: Number, min: 1, max: 8 },
    // currentCGPA: { type: Number, min: 0, max: 10, required: true, index: true },
    // semesterSGPAs: {
    //   sem1: { type: String, trim: true },
    //   sem2: { type: String, trim: true },
    //   sem3: { type: String, trim: true },
    //   sem4: { type: String, trim: true },
    //   sem5: { type: String, trim: true },
    //   sem6: { type: String, trim: true },
    //   sem7: { type: String, trim: true },
    //   sem8: { type: String, trim: true },
    // },
    // pgAcademicCertificateUrl: { type: String, trim: true },

    // // Year Gaps
    // academicGapYears: { type: Number, min: 0, default: 0, index: true },
    // yearGapAfter10th: { type: Number, min: 0, default: 0 },
    // yearGapAfter12th: { type: Number, min: 0, default: 0 },
    // yearGapAfterUG: { type: Number, min: 0, default: 0 },

    // // Backlogs
    // activeBacklogs: { type: Number, min: 0, default: 0, index: true },
    // totalBacklogsCleared: { type: Number, min: 0, default: 0, index: true },
    // backlogsHistory: { type: String, trim: true }, // Consider a boolean/numeric summary for faster queries

    // // Placement
    // interestedInPlacement: { type: Boolean, default: true, index: true },
    // placedStatus: { type: Boolean, default: false },
    // placedCompany: { type: String, trim: true },
    // placedRole: { type: String, trim: true },
    // consentToShareData: { type: Boolean, default: false },
    // okForShifts: { type: Boolean, default: false, index: true },

    // // Skills & Certifications
    // technicalSkills: { type: [String], default: [] },
    // certifications: [
    //   {
    //     name: { type: String, trim: true },
    //     issuingOrganization: { type: String, trim: true },
    //     dateIssued: { type: Date },
    //     certificateUrl: { type: String, trim: true },
    //   },
    // ],

    // // Tests
    // englishTests: {
    //   L1: { type: Number, min: 0, max: 100, required: true, index: true },
    //   L2: { type: Number, min: 0, max: 100, required: true, index: true },
    //   L3: { type: Number, min: 0, max: 100, required: true, index: true },
    //   L4: { type: Number, min: 0, max: 100, required: true, index: true },
    // },
    // aptitudeTests: {
    //   A1: { type: Number, min: 0, max: 100, required: true, index: true },
    //   A2: { type: Number, min: 0, max: 100, required: true, index: true },
    //   A3: { type: Number, min: 0, max: 100, required: true, index: true },
    //   A4: { type: Number, min: 0, max: 100, required: true, index: true },
    // },
    // softSkillsTests: {
    //   S1: { type: Number, min: 0, max: 100, required: true, index: true },
    //   S2: { type: Number, min: 0, max: 100, required: true, index: true },
    //   S3: { type: Number, min: 0, max: 100, required: true, index: true },
    //   S4: { type: Number, min: 0, max: 100, required: true, index: true },
    // },
    // programmingTests: {
    //   P1: { type: Number, min: 0, max: 100, required: true, index: true },
    //   P2: { type: Number, min: 0, max: 100, required: true, index: true },
    //   P3: { type: Number, min: 0, max: 100, required: true, index: true },
    //   P4: { type: Number, min: 0, max: 100, required: true, index: true },
    // },

    // // Uploads
    // profilePhotoUrl: { type: String, trim: true },
    // resumeUrl: { type: String, required: true, trim: true },
    // pgAcademicCertificateUrl: { type: String, trim: true },
    // ugCertificateUrl: { type: String, trim: true },
    // twelfthMarksCardUrl: { type: String, trim: true },
    // tenthMarksCardUrl: { type: String, trim: true },
    // diplomaMarksCardUrl: { type: String, trim: true },

    // // IDs
    // panNumber: {
    //   type: String,
    //   unique: true,
    //   sparse: true,
    //   trim: true,
    //   match: [/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Please fill a valid PAN number"],
    // },
    // aadhaarNumber: {
    //   type: String,
    //   unique: true,
    //   sparse: true,
    //   trim: true,
    //   match: [/^\d{12}$/, "Please fill a valid 12-digit Aadhaar number"],
    // },
  },
  { timestamps: true }
);

// Compound index for common eligibility queries (customize as needed)

// studentProfileSchema.index({
//   degree: 1,
//   branch: 1,
//   currentCGPA: -1,
//   tenthMarks: -1,
//   twelfthMarks: -1,
//   diplomaMarks: -1,
//   academicGapYears: 1,
//   activeBacklogs: 1,
//   totalBacklogsCleared: 1,
//   okForShifts: 1,
//   interestedInPlacement: 1,
// });

export default mongoose.model("StudentProfile", studentProfileSchema);
