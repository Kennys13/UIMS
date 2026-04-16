import { Schema, model } from "mongoose";

const announcementSchema = new Schema(
  {
    title: String,
    body: String,
    audience: [String],
    createdAt: String
  },
  { timestamps: true }
);

export const AnnouncementModel = model("Announcement", announcementSchema);
