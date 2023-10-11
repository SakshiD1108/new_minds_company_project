import 'dotenv/config'
import jwt from "jsonwebtoken";
export const generateToken = (id: string) => {
    return jwt.sign({id:id}, process.env.JWT_SECRET_KEY as string,{
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
}