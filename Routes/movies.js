import express from 'express';
import { getMoviesById, deleteMovieById, getAllMovies, addMovie } from "../helper.js";

const router = express.Router();

router.get("/", (req,res)=>{
  res.send("Hello Everyone :D")
})

router.get("/movies", async (req,res)=>{
  
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

router.post("/movies", async (req,res)=>{
  // db.movies.insertMany(movies)
  const newMovies = req.body;
  console.log(newMovies);
  const movie=await addMovie(newMovies);
  res.send(movie);
});




//send only movie with the matched id
router.get("/movies/:id",async (req,res)=>{
    const { id } = req.params;
    console.log(id);
    const movie = await getMoviesById(id)
    movie ? res.send(movie) : res.status(404).send({message : "No movie found"});
  })

//delete a movie with id
router.delete("/movies/:id",async (req,res)=>{
  const { id } = req.params;
  const movie = await deleteMovieById(id);
  res.send(movie);
})
// Post method - to insert data to db 

export const movieRouter = router;