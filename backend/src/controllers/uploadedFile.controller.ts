import { Request, Response } from "express";
import path from "path";
import { unlink } from "fs/promises";

import { upload } from "../utils/audiosUploadMulter";
import UploadFileService from "../services/uploadedFiles.service";
import { uploadedFileCreateSchema } from "../schemas/uplodedFile.schema";
import { HttpStatusCode } from "../utils/httpStatusCode";
import { payloadChecker } from "../utils/payloadChecker";

class UploadedFileController {
  public async uploadUserFile(req: Request, res: Response) {
    try {
      await payloadChecker(uploadedFileCreateSchema, req.file);

      upload.single("file")(req, res, async (err: any) => {
        if (!req.file) {
          return res
            .status(400)
            .json({ success: false, message: "No file uploaded" });
        }

        const { originalname, filename } = req.file;
        const outputPath = `uploads/${filename}`;

        const data = await UploadFileService.saveUploadingFile(filename, outputPath);

        if (data) {
          res.status(201).json({ success: true, data });
        } else {
          res
            .status(HttpStatusCode.NOT_FOUND)
            .json({ success: false, message: "Data not saved properly" });
        }
      });
    } catch (error) {
      console.error(error);
      res
        .status(400)
        .json({ success: false, message: "Invalid payload" });
    }
  }

  public async getAllFiles(req: Request, res: Response) {
    try {
      const data = await UploadFileService.getAllAudio();

      if (data) {
        res.status(HttpStatusCode.OK).json({ success: true, data });
      } else {
        res
          .status(HttpStatusCode.NOT_FOUND)
          .json({ success: true, message: "Failed to retrieve files" });
      }
    } catch (error: any) {
      console.error(error);
      res
        .status(HttpStatusCode.INTERNAL_SERVER)
        .json({ success: false, message: "Internal server error" });
    }
  }

  public async deleteFiles(req: Request, res: Response) {
    try {
      const { originalname } = req.body;
      const { id } = req.params;

      if (!originalname || !id) {
        return res
          .status(HttpStatusCode.BAD_REQUEST)
          .json({
            success: false,
            message: "Missing fileName or id in the request",
          });
      }

      const uploadDirectory = path.join(__dirname, "../../uploads");
      const filePath = path.join(uploadDirectory, originalname);

      // Use try/catch for asynchronous file deletion
      try {
        await unlink(filePath);
        const files = await UploadFileService.deleteFilesById(id);

        if (files) {
          res.status(HttpStatusCode.OK).json({
            success: true,
            message: "Files deleted successfully",
          });
        } else {
          res.status(HttpStatusCode.INTERNAL_SERVER).json({
            success: false,
            message: "An error occurred while deleting files",
          });
        }
      } catch (error) {
        console.error(error);
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
          success: false,
          message: "An error occurred while deleting files",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(HttpStatusCode.INTERNAL_SERVER).json({
        success: false,
        message: "An error occurred while deleting files",
      });
    }
  }
}

export const uploadedFileController = new UploadedFileController();
