import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import path from 'path';
// const express=require('express');
import notesRoutes from './routes/notesRoutes.js';
import {connectDB} from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

//configure .env file .which has the environment variables(mongoDB connection string,port number)
dotenv.config();

console.log(process.env.MONGO_URI);

const app=express();  
const PORT=process.env.PORT || 5000; //get port number from .env file or use 5000 as default

const __dirname=path.resolve();

//middleware
if(process.env.NODE_ENV !== "production") {
    app.use(
        cors({
            origin: 'http://localhost:5173', //allow requests
        })
    ); //enable CORS for all routes
}

app.use(express.json()); //parse json bodies req.body
app.use(rateLimiter); //rate limiter middleware

//things do between the request and response-middleware
//our simple middleware
// app.use((req,res,next)=>{
//     console.log(`req method is ${req.method} and Req URL is ${req.url}`);
//     next();
// });

app.use("/api/notes",notesRoutes);

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}


//connect db first and then listening to the server and port
connectDB().then(()=>{
    app.listen(PORT, () => {
        console.log("Server is started on port",PORT);
    });
});


// mongodb+srv://sandunimaheshika2000_db_user:N0z63dK6LtbuDRLv@cluster0.gxfwhnl.mongodb.net/?appName=Cluster0
//mongodb+srv://sandunimaheshika2000_db_user:<db_password>@cluster0.l0wdsse.mongodb.net/?appName=Cluster0