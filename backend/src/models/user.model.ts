import { Schema, model } from "mongoose";
import { emailReg, mobileReg } from "../utils/reg";

export interface IUser {
  _id: string;
  firstName: string;
  lastName:string;
  mobile: string;
  email: string;
  userName:string;
  password:string
}

export interface IEmailAndMobile {
  email: string;
  mobile: string
}

export const schema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true
  },
  
  firstName: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
  },
  
  userName: {
    type: String,
    required: true
  },
  
  mobile: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (mobile: string) => {
        return mobileReg.test(mobile)
      },
      message: (props: any) => `${props.value} is not a valid mobile`
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email: string) => {
        return emailReg.test(email)
      },
      message: (props: any) => `${props.value} is not a valid email`
    }
  },

  password:{
  type:String,
  required:true,
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

export const User = model<IUser>('User', schema);