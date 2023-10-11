import "dotenv/config";
import { genSaltSync, hashSync } from "bcryptjs";
import crypto from "crypto";
import { Request } from "express";
import { FileFilterCallback } from "multer";
import { error } from "console";

export const encryptPassword = (password: string): string => hashSync(password, genSaltSync(10));

export const multerFileTypeFilterForPdfFileOnly = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      error("its not pdf type")
    }
  };
  

export const MULTER_UPLOAD_SIZE_LIMIT = 2000000;

export const multerFileTypeFilterForPdfJpgAndJpeg = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    console.error("File format is not supported. Allowed formats are PDF, JPEG, JPG, and PNG.");
    cb(null, false); 
}
}
