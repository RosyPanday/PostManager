
import type { Request,Response } from "express";
import  {db}  from "../database/connection.js";
const User= db.User;
import { QueryTypes } from "sequelize";

interface registerData {
      uName: string,
      uPassword:string,
      uContact:bigint,
}
const registerUser=async(req:Request, res:Response)=>{
    if(!req.body.uName || !req.body.uPassword || !req.body.uContact) {
        return res.json({
            error:"you missed some credentials",
        });
     }
       const data:registerData=req.body; 
      const userExisting = await db.sequelize.query<registerData>(
        `SELECT * FROM users WHERE uName=:userName`,
        {
            replacements:{userName:req.body.uName},
            type:QueryTypes.SELECT
        }
    );

}