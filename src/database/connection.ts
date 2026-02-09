import {Sequelize} from 'sequelize';
 const CONNECTION_STRING= process.env.CONNECTION_STRING;



 if(!CONNECTION_STRING){
    throw new Error("undefined connection string");
 } 
   export const sequelize:Sequelize= new Sequelize(CONNECTION_STRING);
 
 const connectDb= async():Promise<void> =>{
    try{
     await sequelize.authenticate();
     console.log("authenticated");
    } catch(err :unknown) {

        if(err instanceof Error){
         console.log(err.message);
        }
    }
 }

 
 connectDb();