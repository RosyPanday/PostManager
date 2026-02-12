
import db from '../../database/models/index.js'
import bcrypt from 'bcrypt';
const Users=db.Users;
import type { IReturnedData } from './editUserByAdmin.js';

interface IPotentialUserPayload{
     uName?:string,
     uPassword?:string,
     uContact?:bigint,
}
const updatePayloadByUser: IPotentialUserPayload={};
let uHashedPassword:string;
export const userEditHandler=async(jwt_id:number,uName:string|undefined,uPassword:string|undefined,uContact:bigint|undefined):Promise<IReturnedData> =>{
    
     if(!uName && !uPassword && !uContact){
        throw new Error("At least one data has to be changed");
      }
      
      if(typeof uName==="string") {
         updatePayloadByUser.uName=uName;
      }
       
      if(typeof uPassword==="string") {
         uHashedPassword= await  bcrypt.hash(uPassword,10); 
         updatePayloadByUser.uPassword=uHashedPassword;


      }
       
      if(typeof uContact==="bigint") {
         updatePayloadByUser.uContact=uContact;
      }

          const UserExisting= await Users.findByPk(jwt_id);
      if(UserExisting===null) {
           throw new Error("no user with this id exists to be changing data");
      } else {

         return await UserExisting.update(
                    updatePayloadByUser,
          )
         //MEMORY REFERENCE, returns new object

            }

}