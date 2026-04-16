import { v2 as cloudinary } from "cloudinary";
import { env } from "../config/env.js";

if (env.CLOUDINARY_CLOUD_NAME && env.CLOUDINARY_API_KEY && env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET
  });
}

export async function resolveUploadedAvatar(file?: Express.Multer.File) {
  if (!file) {
    return undefined;
  }

  if (env.CLOUDINARY_CLOUD_NAME && env.CLOUDINARY_API_KEY && env.CLOUDINARY_API_SECRET) {
    const uploaded = await cloudinary.uploader.upload(file.path, { folder: "lotus-valley-school/avatars" });
    return uploaded.secure_url;
  }

  return `https://placehold.co/200x200/png?text=${encodeURIComponent(file.originalname.slice(0, 2).toUpperCase())}`;
}
