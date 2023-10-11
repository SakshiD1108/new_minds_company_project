import { UplodedFiles, IUplodedFiles } from "../models/uplodedFiles.model";
import { CustomError } from "../utils/appError";
import { errorMessage } from "../utils/errorMessage";
import { HttpStatusCode } from "../utils/httpStatusCode";

class UploadFileService {
  public async saveUploadingFile(
    originalname: string,
    outputPath: string
  ): Promise<IUplodedFiles> {
    try {
      const data = await UplodedFiles.create({
        originalname: originalname,
        outputPath: outputPath,
      });
      return data.toJSON();
    } catch (error: any) {
      throw new CustomError(HttpStatusCode.INTERNAL_SERVER, error.message);
    }
  }
  public async getAllAudio(): Promise<IUplodedFiles[] | null> {
    try {
      const audio = await UplodedFiles.find({});
      if (audio) {
        return audio;
      } else {
        return null;
      }
    } catch (error: any) {
      throw new CustomError(
        HttpStatusCode.INTERNAL_SERVER,
        "Failed to retrieve audios"
      );
    }
  }

  public async deleteFilesById(_id: string): Promise<IUplodedFiles | null> {
    try {
      return await UplodedFiles.findByIdAndDelete({ _id: _id });
    } catch (error: any) {
      throw new CustomError(HttpStatusCode.NOT_FOUND, error.message);
    }
  }
}

export default new UploadFileService();
