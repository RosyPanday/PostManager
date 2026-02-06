import {Sequelize} from 'sequelize';
import User from './models/user.Model.js';

import Post from './models/post.Model.js';

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

 User.hasMany(Post,{
   foreignKey:'userId'
 });
 Post.belongsTo(User,{
   foreignKey:'userId'
 });

 export const db= {
   Sequelize,
   User,
   Post,
 }
