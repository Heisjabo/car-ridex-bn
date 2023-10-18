import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
cloudinary.v2;

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const uploadFile = async (file, res) => {
  try {
    const upload = await cloudinary.uploader.upload(file.path);
    return upload;
  } catch (error) {
    return res.status(500).send(error);
  }
};