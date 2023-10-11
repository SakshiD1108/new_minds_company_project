import joi from "joi";
import { emailReg, mobileReg } from "../utils/reg";

export const userCreateSchema = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string(),
  userName: joi.string().optional(),
  password: joi.string().min(8).required(),
  mobile: joi.string().length(10).optional().pattern(mobileReg).messages({
    "string.length": "Length must be 10.",
    "string.empty": "Mobile should not be empty.",
    "string.pattern.base": "Mobile not valid.",
  }),
  email: joi.string().email().trim(true).pattern(emailReg).optional().messages({
    "string.pattern.base": "Not a valid email address.",
    "string.empty": "Email should not be empty.",
  }),
});

export const userUpdateSchema = joi.object({
  _id: joi.string().required(),
  firstName: joi.string().required(),
  lastName: joi.string(),
  userName: joi.string().optional(),
  password: joi.string().min(8).required(),
  mobile: joi.string().length(10).optional().pattern(mobileReg).messages({
    "string.length": "Length must be 10.",
    "string.empty": "Mobile should not be empty.",
    "string.pattern.base": "Mobile not valid.",
  }),
  email: joi.string().email().trim(true).pattern(emailReg).optional().messages({
    "string.pattern.base": "Not a valid email address.",
    "string.empty": "Email should not be empty.",
  }),
});
export const loginSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});

export const userDeleteSchema = joi.object({
  id: joi.string().required(),
});
export const userGetSchema = joi.object({
  id: joi.string().required(),
});
