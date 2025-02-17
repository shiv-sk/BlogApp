import multer from "multer"
import path from "path"

const allowedExtensions = [".jpeg" , ".jpg" , ".png" , ".gif" , ".webp"];
const allowedMimes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/temp/media-uploads')
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now()+extension);
  }
})

//filter for image types
const filterfile = (req:any , file:Express.Multer.File , cb:multer.FileFilterCallback)=>{
    const extension = allowedExtensions.includes(path.extname(file.originalname).toLocaleLowerCase());
    const mimeType = allowedMimes.includes(file.mimetype);
    if(extension && mimeType){
        return cb(null, true);
    }else{
        return cb(new Error("Only image files (JPEG, PNG, GIF, WEBP) are allowed!"));
    }
}

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: filterfile,
})
export default upload;