import express from "express";
import mongoose from 'mongoose';
import User from '../models/User';
import auth, { RequestWithUser } from '../middleware/auth';
const usersRouter = express.Router();

usersRouter.post("/", async(req, res, next)=>{
  try{
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });

    user.generateToken();

    await user.save();
    return res.send(`successfully created new user ${user.username}`);
  }catch(error){
    if(error instanceof mongoose.Error.ValidationError){
      return res.status(400).send(error);
    }
    next(error)
  }
})

usersRouter.post('/sessions', async(req, res, next)=>{
  try{
    const user = await User.findOne({username:req.body.username});
    if(!user){
      return res.status(400).send({error:"Username not Found"})
    }
    const isMatch = await user.checkPassword(req.body.password)
    if(!isMatch){
      return res.status(400).send({error: 'password is wrong'})
    }

    user.generateToken();
    await user.save();
    return res.send(user)

  }catch(error){
    if(error instanceof mongoose.Error.ValidationError){
      return res.status(400).send(error);
    }
    return next(error);
  }
})

// /users/secret
usersRouter.post('/secret', auth, async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({error: 'User not found'});
    }
    return res.send('Secret text, username=' + req.user?.username);
  } catch (error) {
    return next(error);
  }
});


export default usersRouter