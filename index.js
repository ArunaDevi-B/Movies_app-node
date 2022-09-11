"use strict";

// const { Console } = require('console');
// const express = require('express');
// const { MongoClient } = require('mongodb');

import express from "express";
import { MongoClient } from "mongodb";
import dotenv from 'dotenv'


dotenv.config()


const app = express();
const PORT = process.env.PORT || 9000;

const movies = [
  {
    "id": "0",
    "src": "https://flxt.tmsimg.com/assets/p9561344_p_v10_ab.jpg",
    "title": "Thuppakki",
    "rating": "8.8",
    "description": "An army captain is on a mission to track down and destroy a terrorist gang and deactivate the sleeper cells under its command. Jagdish (Vijay), an army captain, is back in Mumbai for a holiday to be with his parents and two sisters. They want him to get married and finds a bride Nisha (Kajal Aggarwal) for him.",
    "trailer": "https://www.youtube.com/embed/s0O44Sn1hD4",
    "language": "Tamil"
  },
  {
    "id": "1",
    "src": "https://resizing.flixster.com/gL_JpWcD7sNHNYSwI1ff069Yyug=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzLzc4ZmJhZjZiLTEzNWMtNDIwOC1hYzU1LTgwZjE3ZjQzNTdiNy5qcGc=",
    "title": "Ratatouille",
    "rating": "6",
    "description": "Remy, a rat, aspires to become a renowned French chef. However, he fails to realise that people despise rodents and will never enjoy a meal cooked by him.",
    "trailer": "https://www.youtube.com/embed/c3sBBRxDAqk",
    "language": "English"
  },
  {
    "id": "2",
    "src": "https://i.ytimg.com/vi/wxriFa75CG0/movieposter_en.jpg",
    "title": "Bachelor",
    "rating": "8.8",
    "description": "Bachelor is a 2021 India Tamil-language adult romantic court drama film written and directed by debutant Sathish Selvakumar. Produced by G.",
    "trailer": "https://www.youtube.com/embed/nPAthjZdBUY",
    "language": "Tamil"
  },
  {
    "id": "3",
    "src": "https://stringfixer.com/files/101199071.jpg",
    "title": "Theeran",
    "rating": "8",
    "description": "Based on Operation Bawaria of Tamilnadu Police Department. In this film based on true incidents, Theeran, a police officer is entrusted with the task to solve the mystery behind a series of murders and burglaries. The only clues left behind are the fingerprints of the culprits. How he solves the case, forms the crux.",
    "trailer": "https://www.youtube.com/embed/t3a4gmUfi1c",
    "language": "Tamil"
  },
  {
    "id": "4",
    "src": "https://fight-library.com/wp-content/uploads/2021/04/img_4571.jpg",
    "title": "The Karate Kid",
    "rating": "7",
    "description": "The Karate Kid follows Daniel LaRusso (Macchio), a teenager taught karate by Mr. Miyagi (Morita) to help defend himself and compete in a tournament against his bullies, one of whom is Johnny Lawrence (Zabka), the ex-boyfriend of his love interest Ali Mills (Shue).",
    "trailer": "https://www.youtube.com/embed/XY8amUImEu0",
    "language": "English"
  },
  {
    "id": "5",
    "src": "https://i.pinimg.com/474x/4f/3b/da/4f3bda97431cd17ddecb05605952c3fc.jpg",
    "title": "Kaakha Kaakha",
    "rating": "7.6",
    "description": "Kaakha Kaakha movie is all about Anbuchelvan (Surya) who is part of a group of four police officers who work battling organized crime in Chennai. Violent and laconic, he finds little patience for a personal life, until he turns hero in the eyes of schoolteacher Maya (Jyothika), and embarks on a little romance.",
    "trailer": "https://www.youtube.com/embed/cTNg0sa-gBs",
    "language": "Tamil"
  },
  {
    "id": "6",
    "src": "https://upload.wikimedia.org/wikipedia/en/8/8b/No_Country_for_Old_Men_poster.jpg",
    "title": "No Country for Old Men",
    "rating": "6.5",
    "description": "A hunter's life takes a drastic turn when he discovers two million dollars while strolling through the aftermath of a drug deal. He is then pursued by a psychopathic killer who wants the money.",
    "trailer": "https://www.youtube.com/embed/38A__WT3-o0",
    "language": "English"
  },
  {
    "id": "7",
    "src": "https://d229kpbsb5jevy.cloudfront.net/firstshows/content/common/movie/images/custattr-movie-movie-thumbnail-2x3-movie-ho3yr9gydj8.jpeg",
    "title": "Kaththi",
    "rating": "9",
    "description": "A case of mistaken identity embroils an escaped convict in a fight against a large corporation intent on seizing a village's land. A multinational company tries to forcefully take over a village that was once a fertile agricultural land to make way for its commercial projects.",
    "trailer": "https://www.youtube.com/embed/bMf0IyzyKt4",
    "language": "Tamil"
  },
  {
    "id": "8",
    "src": "https://m.media-amazon.com/images/M/MV5BY2Y5ZWMwZDgtZDQxYy00Mjk0LThhY2YtMmU1MTRmMjVhMjRiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg",
    "title": "Jai Bhim",
    "rating": "8.8",
    "description": "A tribal woman and a righteous lawyer battle in court to unravel the mystery around the disappearance of her husband, who was picked up the police on a false case",
    "trailer": "https://www.youtube.com/embed/pVOd8HAQQZM",
    "language": "Tamil"
  },
  {
    "id": "9",
    "src": "https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg",
    "title": "The Avengers",
    "rating": "6.5",
    "description": "Marvel's The Avengers (classified under the name Marvel Avengers\n Assemble in the United Kingdom and Ireland), or simply The Avengers, is\n a 2012 American superhero film based on the Marvel Comics superhero team\n of the same name.",
    "trailer": "https://www.youtube.com/embed/eOrNdBpGMv8",
    "language": "English"
  },
  {
    "id": "10",
    "src": "https://wallpapercave.com/wp/wp4871559.jpg",
    "title": "Kaithi",
    "rating": "7",
    "description": "Prisoner) is a 2019 Indian Tamil-language action thriller film written and directed by Lokesh Kanagaraj. It is produced by S. R. Prakashbabu and S. R.",
    "trailer": "https://www.youtube.com/embed/g79CvhHaj5I",
    "language": "Tamil"
  },
  {
    "id": "11",
    "src": "https://m.media-amazon.com/images/I/A1JVqNMI7UL._SL1500_.jpg",
    "title": "Interstellar",
    "rating": "6.8",
    "description": "When Earth becomes uninhabitable in the future, a farmer and ex-NASA\n pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team\n of researchers, to find a new planet for humans.",
    "trailer": "https://www.youtube.com/embed/2LqzF5WauAw",
    "language": "English"
  },
  {
    "id": "12",
    "src": "https://flxt.tmsimg.com/assets/p11546593_p_v10_af.jpg",
    "title": "Baahubali",
    "rating": "7.9",
    "description": "In the kingdom of Mahishmati, Shivudu falls in love with a young warrior woman. While trying to woo her, he learns about the conflict-ridden past of his family and his true legacy.",
    "trailer": "https://www.youtube.com/embed/uNoU1eR84Kw",
    "language": "Telugu"
  },
  {
    "id": "13",
    "src": "https://www.commonsensemedia.org/sites/default/files/styles/ratio_2_3_medium/public/product-images/csm-movie/iron-man-2-poster-min.jpg",
    "title": "Iron man 2",
    "rating": "6.5",
    "description": "With the world now aware that he is Iron Man, billionaire inventor Tony Stark (Robert Downey Jr.) faces pressure from all sides to share his technology with the military. He is reluctant to divulge the secrets of his armored suit, fearing the information will fall into the wrong hands. With Pepper Potts (Gwyneth Paltrow) and Rhodes (Don Cheadle) by his side, Tony must forge new alliances and confront a powerful new enemy.",
    "trailer": "https://www.youtube.com/embed/nS8aKzfIyGY",
    "language": "English"
  },
  {
    "id": "14",
    "src": "https://englishtribuneimages.blob.core.windows.net/gallary-content/2021/6/Desk/2021_6$largeimg_977224513.JPG",
    "title": "RRR",
    "rating": "7",
    "description": "RRR is an upcoming Indian Telugu-language period action drama film directed by S. S. Rajamouli, and produced by D. V. V. Danayya of DVV Entertainments.",
    "trailer": "https://www.youtube.com/embed/oO8TTM2FgIA",
    "language": "Telugu"
  },
  {
    "id": "15",
    "src": "https://images.moviesanywhere.com/cac313fcf9373e9446b6bb8ff171b8d1/8b8d6a81-b8e6-49ad-b835-32c2f01a03c5.jpg",
    "title": "Zootopia",
    "rating": "8",
    "description": "From the largest elephant to the smallest shrew, the city of Zootopia is a mammal metropolis where various animals live and thrive. When Judy Hopps (Ginnifer Goodwin) becomes the first rabbit to join the police force, she quickly learns how tough it is to enforce the law. Determined to prove herself, Judy jumps at the opportunity to solve a mysterious case. Unfortunately, that means working with Nick Wilde (Jason Bateman), a wily fox who makes her job even harder.",
    "trailer": "https://www.youtube.com/embed/jWM0ct-OLsM",
    "language": "English"
  },
  {
    "id": "16",
    "src": "https://lumiere-a.akamaihd.net/v1/images/p_insideout_19751_af12286c.jpeg?region=0%2C0%2C540%2C810",
    "title": "Inside Out",
    "rating": "6",
    "description": "Riley (Kaitlyn Dias) is a happy, hockey-loving 11-year-old Midwestern girl, but her world turns upside-down when she and her parents move to San Francisco. Riley's emotions -- led by Joy (Amy Poehler) -- try to guide her through this difficult, life-changing event. However, the stress of the move brings Sadness (Phyllis Smith) to the forefront. When Joy and Sadness are inadvertently swept into the far reaches of Riley's mind, the only emotions left in Headquarters are Anger, Fear and Disgust.",
    "trailer": "https://www.youtube.com/embed/yRUAzGQ3nSY",
    "language": "English"
  }
];

  const MONGO_URL=process.env.MONGO_URL || 'mongodb+srv://Aruna:Aruna123@cluster0.ndwq8ot.mongodb.net';

  // const MONGO_URL= "";

  async function createConnection(){
    try{
      const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Connected Mongo");
    return client;
    }catch(error){console.log("error.......  ",error)}
    
  }
const client = await createConnection()
app.use(express.json())
app.get("/",(req, res)=>{
    res.send("Hello all :D");
});

// app.get("/movies",(req,res)=>{
//     res.send(movies);
// })
// app.get("/movies", async (req, res)=>{
//   const { mvs } = req.params;
//   const movie = await client.db("b37wd").collection("movies").find({movie : mvs});
//   console.log(movie);
//     res.send(movie);
// });


//send only movie with the matched id
app.get("/movies/:id",async (req,res)=>{
    const { id } = req.params;
    console.log(id);
    const movie = await client
    .db("b37wd")
    .collection("movies").findOne({id : id})
    movie ? res.send(movie) : res.status(404).send({message : "No movie found"});
  })

//delete a movie with id
app.delete("/movies/:id",async (req,res)=>{
  const { id } = req.params;
  const movie = await client.db("b37wd").collection("movies").deleteOne({id : id})
  res.send(movie);
})

// app.get("/movies",(req,res)=>{
//     const { language } = req.query;
//     console.log(req.query,language);
//     let filteredMovies = movies;
//     if(language) {
//       filteredMovies = filteredMovies.filter((mv)=> mv.language === language);
//     }

//     res.send(filteredMovies);
//   });
//     const languages = movies.find((lng)=> {
//       if(lng.language == language){
//         return lng;
//       }
// });
// res.send(movies.filter((mv)=> mv.language === language));
// app.get("/movies", async (req, res)=>{
//   const { mvs } = req.params;
//   const movie = await client.db("b37wd").collection("movies").find({movie : mvs});
//   console.log(movie);
//     res.send(movie);
// });

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

  const movie = await client.db("b37wd").collection("movies").find(req.query).toArray();
  console.log("req.query",req.query);
  res.send(movie);
})

// Post method - to insert data to db 

app.post("/movies", async (req,res)=>{
  // db.movies.insertMany(movies)
  const newMovies = req.body;
  console.log(newMovies);
  const movie = await client.db("b37wd").collection("movies").insertMany(newMovies);
  res.send(movie);
});


app.listen(PORT,()=>{console.log("server started on port", PORT)})

