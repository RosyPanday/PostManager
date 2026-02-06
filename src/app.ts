import express from 'express';
//need type definitions for express so, install a dev dependency @types/express
import dotenv from 'dotenv';

//express is written in plain js , so this will be a problem

dotenv.config();  //loading the variables
const app=express();


const port= Number(process.env.PORT)|| 3000;// fallbak 3000,if someone forgets to inject to .env

// app.use(express.json());

// app.use("/",someroute);


app.listen(port, ():void=>{
    console.log(`Server staring at ${port}`);
})




