import express from "express";
import { genPassword, createUser, getUserByName } from "../helper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    if( !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#$%]).{8,}$/g.test(password)){
      res.status(400).send({message : "password pattern does not match"})
      return;
    }
    const hashedPassword=await genPassword(password);
    const result =await createUser(username, hashedPassword)
    res.send(result);
  });


  //login => put method

  router.post("/login", async (req,res)=>{
    // db.movies.insertMany(movies)
    const { username, password } = req.body;
    console.log(username, password);

    const userFromDB = await getUserByName(username);
    console.log(userFromDB);

    //to check whether username already exixt
    if(!userFromDB){
        res.status(400).send({message: "Invalid Credentials"});
        return;
    }
    const storedPassword = userFromDB.password;

    const isPasswordMatch = await bcrypt.compare(password, storedPassword);

    if(!isPasswordMatch){
      res.status(400).send({message: "Invalid Credentials"})
      return;
    }
    //to issue token
    const token = jwt.sign({ id: userFromDB._id},process.env.KEY)
      res.send({message: "successful login", token: token});
  });

  export const userRouter = router;

//   steps:
//   1 validate username is already present
//   2 validate if password matches (and check criteria like does it matches the pattern)

//store the user details - user collection - username and password