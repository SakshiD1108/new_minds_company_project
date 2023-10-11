import multer from "multer";
import path from "path";import fs from "fs";
import { MULTER_UPLOAD_SIZE_LIMIT, multerFileTypeFilterForPdfJpgAndJpeg } from '../utils/utility';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = `./uploads/`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir );
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        // Use the original filename for the uploaded file
        const timestamp = Date.now(); // Get the current timestamp
        const uniqueFileName = `${timestamp}-${file.originalname}`;
        cb(null, uniqueFileName);
    }
});

export const upload = multer({
    storage: storage,
    limits: { fileSize: MULTER_UPLOAD_SIZE_LIMIT, files: 1 },
    fileFilter: multerFileTypeFilterForPdfJpgAndJpeg
});
