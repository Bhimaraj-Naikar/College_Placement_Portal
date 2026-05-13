import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    // The recipient of the notification.
    // This can be a specific user (Student or Admin) or null for general announcements.
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Can be 'User' or 'Admin' depending on who it's for.
      // If 'audience' is used for broad targeting, 'recipient' might be null.
      // You might need to handle this logic in your application layer.
      default: null,
    },
    // Specifies the target audience if 'recipient' is null (for general notifications).
    // Examples: 'all_students', 'all_admins', 'all_users'.
    audience: {
      type: String,
      enum: ["all_students", "all_admins", "all_users", "specific_user"], // 'specific_user' implies recipient is set
      required: true,
      default: "specific_user", // Default to a specific user if recipient is provided
    },
    // The main content/message of the notification.
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 500,
    },
    // The type of notification (e.g., drive update, deadline reminder, general announcement).
    type: {
      type: String,
      enum: [
        "drive_update",
        "deadline_reminder",
        "general_announcement",
        "application_status",
        "interview_schedule",
        "other",
      ],
      default: "general_announcement",
      required: true,
    },
    // A flag to indicate if the notification has been read by the recipient.
    isRead: {
      type: Boolean,
      default: false,
    },
    // Optional link associated with the notification (e.g., link to a specific drive page).
    link: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          // Basic URL validation, allows empty string
          return v === "" || /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(v);
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
      default: "",
    },
    // The entity that generated this notification (e.g., 'System' or an 'Admin' ID).
    // This could be an ObjectId referencing an Admin model if an admin manually creates it.
    // Or a simple string like 'System' for automated notifications.
    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin", // Assuming Admin model for manual notifications
      default: null, // Can be null if system generated or not applicable
    },
    // Additional data that might be relevant to the notification type (e.g., drive ID, company name).
    // This can be a flexible object to store context-specific information.
    metadata: {
      type: mongoose.Schema.Types.Mixed, // Allows for flexible data types (objects, arrays, etc.)
      default: {},
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
