
import type { Request,Response } from "express";
import { handleUserRegistration } from "../services/userServices/handleUserRegistration.js";
// import  {db}  from "../database/relation.js";

//register user API
export const registerUser=async(req:Request, res:Response):Promise<void>=>{  //even tho this is returning json, it technically doesnt return anything to js engine, just a promise
          try{
             const token:string= await handleUserRegistration(req.body.uName,req.body.uPassword,req.body.uContact);
             res.json({
                     "message":"user sucessfully registered",
                     token
             })
          }
           catch(err:any) {
              if(err instanceof Error){
                res.json({
                    "errorMessage":err.message,
                })
              }
          }
}