import express from "express";
import { genPassword, createUser, getUserByName } from "../helper.js";

const router = express.Router();

router.post("/signup", async (req,res)=>{
    // db.movies.insertMany(movies)
    const { username, password } = req.body;
    console.log(username, password);

    const isUserExist = await getUserByName(username);
    console.log(isUserExist);

    //to check whether username already exixt
    if(isUserExist){
        res.status(400).send({message: "username already taken"});
        return;
    }
    const hashedPassword=await genPassword(password);
    const result =await createUser(username, hashedPassword)
    res.send(result);
  });

  export const userRouter = router;

//   steps:
//   1 validate username is already present
//   2 validate if password matches (and check criteria like does it matches the pattern)

//store the user details - user collection - username and password