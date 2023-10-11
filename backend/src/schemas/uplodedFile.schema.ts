import joi from "joi";

export const uploadedFileCreateSchema = joi.object({
    userName: joi.string().required(),
   
})



