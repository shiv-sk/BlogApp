import {v2 as cloudinary} from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config({
    path:"./.env"
})
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRET
});
const uploadToCloudinary = async(imagePath:string)=>{
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    }
    try {
        const uploadedMedia = await cloudinary.uploader.upload(imagePath , options);
        const secure_url = uploadedMedia?.secure_url
        if(!secure_url){
            throw new Error("image is not uploading at cloudinary from cloudinary!");
        }
        fs.unlinkSync(imagePath);
        return secure_url;
    } catch (error) {
        fs.unlinkSync(imagePath);
        console.error(error);
    }
}

export default uploadToCloudinary;