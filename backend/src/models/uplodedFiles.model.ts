import { Schema, model } from "mongoose";

export interface IUplodedFiles {
  _id: string;
  userId:string
  originalname:string
}


export const schema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true
  },
  userId:{type: Schema.Types.ObjectId,
    ref: 'User', 
  },

  originalname: {
    type: String,
    required: true
  },

  createdOn: {
    type: Date,
    default: Date.now
  },
  updatedOn: {
    type: Date,
    default: Date.now
  }
})

export const UplodedFiles = model<IUplodedFiles>('uplodedfiles', schema);