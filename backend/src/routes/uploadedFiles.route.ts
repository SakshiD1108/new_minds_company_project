import { Router } from "express";
import { uploadedFileController } from "../controllers/uploadedFile.controller";
import { authMiddleWare } from "../middlewares/auth.middleware";
const router: Router = Router();
router.post("/", authMiddleWare, uploadedFileController.uploadUserFile);
router.get("/", authMiddleWare, uploadedFileController.getAllFiles);
router.delete("/:id", authMiddleWare, uploadedFileController.deleteFiles);

export default router;
