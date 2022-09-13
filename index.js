"use strict";

// const { Console } = require('console');
// const express = require('express');
// const { MongoClient } = require('mongodb');
import cors from "cors";
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
import { getMoviesById, deleteMovieById, getAllMovies, addMovie, genPassword } from "./helper.js";
import { movieRouter } from './Routes/movies.js';
import { userRouter } from "./Routes/user.js";
import bcrypt from "bcrypt";

dotenv.config()

 
const app = express();
app.use(cors())
const PORT = process.env.PORT;
const MONGO_URL=process.env.MONGO_URL;

  // const MONGO_URL= "";

  async function createConnection(){
    try{
      const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Connected Mongo");
    return client;
    }catch(error){console.log("error.......  ",error)}
    
  }
export const client = await createConnection()

app.use(express.json());

app.get("/", (req,res)=>{
  res.send("Hello Everyone :D")
})


app.use("/movies", movieRouter)
app.use("/user", userRouter)


app.use(() => {
  console.log('Some one called the api');
  console.log('Api called at - ',  new Date());
});

app.listen(PORT,()=>{console.log("server started on port", PORT)})


