"use strict";

// const { Console } = require('console');
// const express = require('express');
// const { MongoClient } = require('mongodb');

import express from "express";
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
import { getMoviesById, deleteMovieById, getAllMovies, addMovie } from "./helper.js";
// import { movieRouter } from './Routes/movies.js';

dotenv.config()


const app = express();
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

app.use(() => {
  console.log('Some one called the api');
  console.log('Api called at - ',  new Date());
});

// app.use('/', movieRouter);

app.get("/movies", async (req,res)=>{
  // const { language,rating } = req.query;
  // console.log(req.query.rating);
  // let filteredRating = movies;
  // if(language) {
  //   filteredRating = filteredRating.filter((mv)=> mv.language === language);
  //      }
  // if(rating){
  //   filteredRating = filteredRating.filter((mv)=> mv.rating === rating);
  // }
console.log('check type: ', typeof req.query.rating)
  //getting data from mongodb
  console.log("req.query.rating", req.query.rating);

  // const dBquery = {
  //   rating: req.query.rating,
  //   language: req.query.language
  // }

  const movie = await getAllMovies(req);
  console.log("req.query",req.query);
  res.send(movie);
})



// router.get("/movies",(req,res)=>{
//     res.send(movies);
// })
// router.get("/movies", async (req, res)=>{
//   const { mvs } = req.params;
//   const movie = await client.db("b37wd").collection("movies").find({movie : mvs});
//   console.log(movie);
//     res.send(movie);
// });


//send only movie with the matched id
app.get("/movies/:id",async (req,res)=>{
    const { id } = req.params;
    console.log(id);
    const movie = await getMoviesById(id)
    movie ? res.send(movie) : res.status(404).send({message : "No movie found"});
  })

//delete a movie with id
app.delete("/movies/:id",async (req,res)=>{
  const { id } = req.params;
  const movie = await deleteMovieById(id);
  res.send(movie);
})
// Post method - to insert data to db 

app.post("/movies", async (req,res)=>{
  // db.movies.insertMany(movies)
  const newMovies = req.body;
  console.log(newMovies);
  const movie=await addMovie(newMovies);
  res.send(movie);
});


app.listen(PORT,()=>{console.log("server started on port", PORT)})


