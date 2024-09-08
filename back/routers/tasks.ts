import express from "express";
import mongoose from 'mongoose';
import User from '../models/User';
import auth, { RequestWithUser } from '../middleware/auth';

const tasksRouter = express.Router()

tasksRouter.post('/', async(req:RequestWithUser, res, next)=>{
  try{
    if(!req.user){
      return res.status(401).send('Not Found user');
    }


  }catch(error){
    if(error instanceof mongoose.Error.ValidationError){
      return res.status(400).send(error)
    }
    return next(error)
  }
})


export default tasksRouter