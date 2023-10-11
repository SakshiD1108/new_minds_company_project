import { CustomError } from "../utils/appError";
import { HttpStatusCode } from "../utils/httpStatusCode";

export const payloadChecker = async (schema: any, payload: any) => {
  if (!schema.validateAsync) {
    throw new CustomError(
      HttpStatusCode.NOT_FOUND,
      "validateAsync method not found"
    );
  }
  try {
    await schema.validateAsync(payload);
  } catch (error: any) {
    throw new CustomError(HttpStatusCode.BAD_REQUEST, error.message);
  }
};
