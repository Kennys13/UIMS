import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: String,
    email: String,
    role: String,
    password: String,
    status: String,
    department: String,
    joinedOn: String,
    designation: String,
    profile: {
      phone: String,
      address: String,
      avatar: String,
      employeeOrStudentId: String,
      bio: String
    }
  },
  { timestamps: true }
);

export const UserModel = model("User", userSchema);
