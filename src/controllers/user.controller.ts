
import type { Request, Response } from "express";
import { handleUserRegistration } from "../services/userServices/handleUserRegistration.js";
import db from "../database/models/index.js";
import { adminEditHandler } from "../services/userServices/editUserByAdmin.js";
import type { ICustomRequest } from "../middlewares/jwtVerification.middleware.js";
import { userEditHandler } from "../services/userServices/editUserByUser.js";
import { viewUsersHandler } from "../services/viewUsers.js";
import { deleteUserHandler } from "../services/userServices/deleteUserHandler.js";

type dbType = typeof db;
//defining interfaces to give data types
export interface userGivenData {
   uName: string,
   uPassword: string,
   uContact: bigint,

}

interface IId {
   id: number,
}

const bodyEdit: Partial<userGivenData> = {};
const body: Partial<userGivenData> = {};

//register user API (CREATE)

export const registerUser = async (req: Request<string, null, userGivenData, any>, res: Response): Promise<void> => {  //even tho this is returning json, it technically doesnt return anything to js engine, just a promise

   body.uName = req.body.uName;
   body.uPassword = req.body.uPassword;
   body.uContact = req.body.uContact;



   try {
      const token: string = await handleUserRegistration(body.uName, body.uPassword, body.uContact, db);
      res.json({
         "message": "user sucessfully registered",
         token
      })
   }
   catch (error: any) {
      if (error instanceof Error) {
         res.json({
            "errorMessage": error.message,
            "errStack": error.stack,

         })
      }
   }
}




//EDIT BY USER (UPDATE)
let jwt_id: number;
export const editUserByUser = async (req: Request, res: Response): Promise<void> => {
   try {
      let customReq: ICustomRequest = req as ICustomRequest;
      //checking if its null or not an string, so type narrowing to object
      if (customReq.user && typeof customReq.user !== "string") {
         jwt_id = customReq.user.id;

      }

      bodyEdit.uName = req.body.uName;
      bodyEdit.uPassword = req.body.uPassword;
      bodyEdit.uContact = req.body.uContact;
      editedUser = await userEditHandler(jwt_id, bodyEdit.uName, bodyEdit.uPassword, bodyEdit.uContact);

      res.json({
         "message": "congo on changing data,admin",
         editedUser,
      })
      return;


   } catch (err) {
      if (err instanceof Error) {
         res.json({
            "errorMessage": err.message,
            "errStack": err.stack,
         })
      }
   }
}



//EDIT BY ADMIN (update)

interface IReturnData {
   "message": string,
   editedUser: typeof db.Users,
}
let editedUser = {};
export const editUsersByAdmin = async (req: Request<IId, IReturnData, userGivenData, any>, res: Response): Promise<void> => {
   try {
      const userParameterId = req.params.id;
      console.log(req.body.uName);
      bodyEdit.uName = req.body.uName;
      bodyEdit.uPassword = req.body.uPassword;
      bodyEdit.uContact = req.body.uContact;
      editedUser = await adminEditHandler(userParameterId, bodyEdit.uName, bodyEdit.uPassword, bodyEdit.uContact);

      res.json({
         "message": "congo on changing data,admin",
         editedUser,
      })
      return;
   } catch (err) {
      if (err instanceof Error) {
         res.json({
            "errorMessage": err.message,
            "errStack": err.stack,
         })
      }
   }

}


//View Users in our System (READ)
let lastId:number;
export const viewUsers = async (req: Request, res: Response):Promise<void> => {
   try {
      lastId = req.query.lastId ? parseInt(req.query.lastId as string) : 0;

      const data = await viewUsersHandler(lastId);
      res.json({
         "message":"obtained data",
         data,

      })
   } catch (err) {
      if (err instanceof Error) {
         res.json({
            "errormessage": err.message,
         })
      }

   }
}

//delete user

export const deleteUser = async(req:Request,res:Response)=>{
    let customReq: ICustomRequest = req as ICustomRequest;
      //checking if its null or not an string, so type narrowing to object
      if (customReq.user && typeof customReq.user !== "string") {
         jwt_id = customReq.user.id;

      }
      try{
       const rowsDeleted= await deleteUserHandler(jwt_id);
           if(rowsDeleted!==0) {
            res.json({
               "message":"succcessfully deleted",
            })
           } else {
            res.json({
               "message":"failed to delete this user",
            })
           }
      }catch(err) {
         if(err instanceof Error) {
            res.json({
               "message": err.message,
               "details":err.stack,
            })
         }
      }
}