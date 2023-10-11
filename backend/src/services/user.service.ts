import { User, IUser, IEmailAndMobile } from "../models/user.model";
import { CustomError } from "../utils/appError";
import { errorMessage } from "../utils/errorMessage";
import { HttpStatusCode } from "../utils/httpStatusCode";
import logger from "../utils/logger";

class UserService {
  public async getUserByEmailOrMobile(
    body: IEmailAndMobile
  ): Promise<IUser | null> {
    try {
      return await User.findOne({
        $or: [{ email: body.email }, { mobile: body.mobile }],
      });
    } catch (error: any) {
      throw new CustomError(HttpStatusCode.INTERNAL_SERVER, error.message);
    }
  }
  public async saveUser(body: IUser): Promise<IUser> {
    try {
      const data = await User.create(body);
      return data.toJSON();
    } catch (error: any) {
      throw new CustomError(HttpStatusCode.INTERNAL_SERVER, error.message);
    }
  }

  public async findEmailOrMobileNo(
    email: string,
    mobile: string
  ): Promise<IEmailAndMobile | null> {
    try {
      const data = await User.findOne({
        $or: [{ email: email }, { mobile: mobile }],
      });
      if (data) {
        return data.toJSON();
      } else {
        return null;
      }
    } catch (error: any) {
      throw new CustomError(HttpStatusCode.INTERNAL_SERVER, error.message);
    }
  }

  public async findUserByEmail(email: string): Promise<IUser> {
    try {
      const data = await User.findOne({ email });
      if (data) {
        return data.toJSON();
      } else {
        throw new CustomError(
          HttpStatusCode.NOT_FOUND,
          " email does not exist"
        );
      }
    } catch (error: any) {
      logger.error(error.message);
      throw new CustomError(HttpStatusCode.INTERNAL_SERVER, error.message);
    }
  }

  public async updateUserById(body: IUser): Promise<IUser | null> {
    try {
      const data = await User.findByIdAndUpdate(body._id, body, { new: true });
      if (data) {
        return data.toJSON();
      } else {
        return null;
      }
    } catch (error: any) {
      logger.error(error.message);
      throw new CustomError(HttpStatusCode.NOT_FOUND, "Id does not exist");
    }
  }

  public async getUserById(id: string): Promise<IUser | null> {
    try {
      return await User.findById(id);
    } catch (error: any) {
      logger.error(error.message);
      throw new CustomError(HttpStatusCode.INTERNAL_SERVER, error.message);
    }
  }

  public async deleteUserById(_id: string): Promise<IUser | null> {
    try {
      return await User.findByIdAndDelete({ _id: _id });
    } catch (error: any) {
      throw new CustomError(HttpStatusCode.NOT_FOUND, error.message);
    }
  }
}
export default new UserService();
