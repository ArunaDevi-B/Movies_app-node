import express from 'express';
import { getMoviesById, deleteMovieById, getAllMovies, addMovie } from "../helper.js";

const router = express.Router();

// router.get("/movies",(req,res)=>{
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
// router.get("/movies", async (req, res)=>{
//   const { mvs } = req.params;
//   const movie = await client.db("b37wd").collection("movies").find({movie : mvs});
//   console.log(movie);
//     res.send(movie);
// });

router.get("/", async (req,res)=>{
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
router.get("/:id",async (req,res)=>{
    const { id } = req.params;
    console.log(id);
    const movie = await getMoviesById(id)
    movie ? res.send(movie) : res.status(404).send({message : "No movie found"});
  })

//delete a movie with id
router.delete("/:id",async (req,res)=>{
  const { id } = req.params;
  const movie = await deleteMovieById(id);
  res.send(movie);
})
// Post method - to insert data to db 

router.post("/", async (req,res)=>{
  // db.movies.insertMany(movies)
  const newMovies = req.body;
  console.log(newMovies);
  const movie=await addMovie(newMovies);
  res.send(movie);
});

export const moviesRouter = router;