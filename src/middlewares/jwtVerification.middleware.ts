import type {Request, Response,NextFunction} from "express";
import jwt, { type JwtPayload } from 'jsonwebtoken';


export interface ICustomRequest extends Request {
    user: string| JwtPayload;
}

export const verifyToken=(req:Request,res:Response,next:NextFunction):void=>{
             const customReq=  req as ICustomRequest;
              const token=req.headers.authorization?.split(' ')[1];
              if(!token) {
                throw new Error("token is missing or expired");
              }
              try{
                 const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY as string);
                 console.log(decoded);
                 if(typeof customReq.user==="string") {
                   throw new Error("decoded payload is string");
                 } else 
                 customReq.user= decoded;
                 next();
              } catch(err) {
                 if(err instanceof Error) {
                      res.json({
                        "message":"error with jwt validation",

                      })
                 }
              }
}