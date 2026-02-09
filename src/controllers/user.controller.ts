
import type { Request,Response } from "express";
import { handleUserRegistration } from "../services/userServices/handleUserRegistration.js";
// import  {db}  from "../database/relation.js";

//register user API
const registerUser=async(req:Request, res:Response)=>{
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