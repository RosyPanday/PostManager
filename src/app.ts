import express from 'express';
//need type definitions for express so, install a dev dependency @types/express
import dotenv from 'dotenv';  
import 'dotenv/config'; // this loads the variables first to reduce redundancy and hositing occurs

//express is written in plain js , so this will be a problem

const app=express();
import { db } from './database/connection.js';  

const port= Number(process.env.PORT)|| 3000;// fallback 3000,if someone forgets to inject to .env

// app.use(express.json());

// app.use("/",someroute);


app.listen(port, ():void=>{
    console.log(`Server staring at ${port}`);
})




