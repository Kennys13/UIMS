import { Schema, model } from "mongoose";

const leaveSchema = new Schema(
  {
    userId: String,
    type: String,
    from: String,
    to: String,
    reason: String,
    status: String,
    reviewedBy: String,
    note: String
  },
  { timestamps: true }
);

export const LeaveModel = model("Leave", leaveSchema);
