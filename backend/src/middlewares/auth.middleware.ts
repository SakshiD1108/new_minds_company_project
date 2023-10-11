import 'dotenv/config'
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { errorMessage } from '../utils/errorMessage';

interface TokenInterface {
    exp: number;
    iat: number;
    id: string;
}
export const authMiddleWare = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({
                message:errorMessage.token        
            });
        }
        const decoded = verify(token, process.env.JWT_SECRET_KEY as string) as TokenInterface;
        if(decoded){
            next();
        }else{
            return res.status(401).json({
                message:errorMessage.unAuthorized       
            });
        }
        
    } catch (err: any) {
        res.status(401).json({
            message: err.message        
        });
    }
};