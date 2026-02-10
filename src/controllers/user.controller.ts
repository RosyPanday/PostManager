
import type { Request,Response } from "express";
import { handleUserRegistration } from "../services/userServices/handleUserRegistration.js";
import  db from "../database/models/index.js";

type dbType =typeof db;
//defining interfaces to give data types
interface userGivenData{
   uName:string,
   uPassword:string,
   uContact:bigint,
   db:dbType,
}

//register user API

export const registerUser=async(req:Request, res:Response):Promise<void>=>{  //even tho this is returning json, it technically doesnt return anything to js engine, just a promise
       console.log(req.body.uName);
       
        const body = req.body as userGivenData;

          try{
             const token:string= await handleUserRegistration(body.uName, body.uPassword, body.uContact, db);
             res.json({
                     "message":"user sucessfully registered",
                     token
             })
          }
           catch(error:any) {
              if(error instanceof Error){
                res.json({
                   "errorMessage": error.message,      
                "errStack": error.stack,        

                })
              }
          }
}