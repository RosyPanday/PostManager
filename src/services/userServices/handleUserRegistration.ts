import bcrypt  from 'bcrypt';
// import { sequelize } from "../../database/connection.js";
import { QueryTypes, Sequelize } from 'sequelize';
import jwt from 'jsonwebtoken';
import db from "../../database/models/index.js"
type dbType= typeof db;


interface registerData {
      uName: string,
      uPassword:string,
      uContact:bigint,
}
interface UserPayload {
    id: number;
    uName: string;
}

export const handleUserRegistration=async (uName:string,uPassword:string,uContact:bigint , db:dbType) =>{

    const {sequelize,Sequelize,Users,Posts} =db;
     //1. checking if data doesnt exist
    if(!uName || !uPassword || !uContact) {
         throw new Error("missing_credentials");
     }
     //but if data exists ? contact number validation, bigints dont have direct .length method
      if(uContact.toString().length!==10){
            throw new Error("invalid_contact_number");
      }
      //is user already existing?
     
      const uHashedPassword:string= await  bcrypt.hash(uPassword,10);  //promise if rejected will be like throwing error automatically

      const userExisting = await sequelize.query<registerData>(  //it should return data in array of registerData format
        `SELECT * FROM "Users" WHERE "uName"=:uName`,
        {
            replacements:{uName:uName},
            type:QueryTypes.SELECT
        }
    );
    if(userExisting.length==0){ //checking length of array, !userExisting wont work cause an empty array is falsy
        const newUser= await Users.create({
                uName,
                uPassword:uHashedPassword,
                uContact,


        });
        //newUser already has id by this time
       const payload:UserPayload ={
         id:newUser.id,
         uName:newUser.uName,
       }
       
       const jwtSecret:string= process.env.JWT_SECRET_KEY as string;
       if(!jwtSecret) {
        throw new Error ("JWT_SECRET_MISSING");
       }
       
       const token:string =jwt.sign(
        payload,
        jwtSecret,
        {expiresIn:'1d'}
       );

       //everything went right, so return right here

        return token;
      
    } else {
        throw new Error("user_Existing");
    }
   
}