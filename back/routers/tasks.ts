import express from "express";
import mongoose from 'mongoose';
import auth, { RequestWithUser } from '../middleware/auth';
import Task from '../models/Task';



const tasksRouter = express.Router()

tasksRouter.post('/',auth, async(req:RequestWithUser, res, next)=>{
  try{


    if(!req.body.title){
      return res.status(40).send('title is Required');
    }

    const task = new Task({
      user: req.user?._id,
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
    })

    await task.save()

    return res.send(req.user?._id)
  }catch(error){
    if(error instanceof mongoose.Error.ValidationError){
      return res.status(400).send(error)
    }
    return next(error)
  }
})


export default tasksRouter