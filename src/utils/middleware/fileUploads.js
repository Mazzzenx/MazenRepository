
import multer from "multer";
import AppError from "../services/AppError.js";


function options () {}

function fileFilter(req, file, cb) {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("invalid image", 400), false);
  }
}
const storage = multer.diskStorage({});

const mediaUpload = multer({ storage, fileFilter });

export const upload = mediaUpload 



export const uploadSingleFile = (folderName, fieldName) =>  options(folderName).single(fieldName);


export const uploadMixFiles = (folderName, arrayFields) =>  options(folderName).fields(arrayFields);