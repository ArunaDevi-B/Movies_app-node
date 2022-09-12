"use strict";
import { client } from "./index.js";

export async function getAllMovies(req) {
  return await client.db("b37wd").collection("movies").find(req.query).toArray();
}
export async function getMoviesById(id) {
  return await client.db("b37wd").collection("movies").findOne({ id: id });
}
export async function deleteMovieById(id) {
  return await client.db("b37wd").collection("movies").deleteOne({ id: id });
}
export async function addMovie(newMovies) {
  return await client.db("b37wd").collection("movies").insertMany(newMovies);
}
