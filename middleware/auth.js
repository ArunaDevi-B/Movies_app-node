import jwt from "jsonwebtoken";
import { response } from "express";

export const auth = (req,res,next)=>{
    try{
    const token = req.header("x-auth-token");
    console.log(token);
    //to verify token
    jwt.verify(token, process.env.KEY)
    next()
    }catch(error){res.send({ error : error.message})}
}