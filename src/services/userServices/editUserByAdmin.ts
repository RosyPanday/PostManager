
import db from '../../database/models/index.js'
import bcrypt from 'bcrypt';
const Users=db.Users;

export interface IReturnedData{
   id:number,
   uName:string,
   uPassword:string,
   uContact:bigint;
}
export const adminEditHandler=async(userParameterId:number,uName:string,uPassword:string,uContact:bigint):Promise<IReturnedData> =>{
    const dataToUpdate:Partial<IReturnedData> ={};
     
      if(!userParameterId) {
         throw new Error("user id not found in paramater");
      }
      if(!uName && !uPassword && !uContact){
        throw new Error("At least one data has to be changed");
      }
    
      const  UserExisting= await Users.findByPk(userParameterId);
      if(UserExisting===null) {
           throw new Error("no user with this id exists");
      } else {

           if(uName) {
         dataToUpdate.uName=uName;
      }
      if(uPassword) {
          const uHashedPassword:string= await  bcrypt.hash(uPassword,10); 
           dataToUpdate.uPassword =uHashedPassword;
      }
       if(uContact) {
         if(uContact.toString().length!==10){
            throw new Error("invalid_contact_number");
      }
           dataToUpdate.uContact =uContact;
      }



         return await UserExisting.update(
            dataToUpdate,
         )
         //MEMORY REFERENCE, returns new object

      }

}