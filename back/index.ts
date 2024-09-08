import cors from 'cors';
import express from 'express';
import config from './config';
import mongoose from 'mongoose';
import usersRouter from './routers/users';
import tasksRouter from './routers/tasks';

const app = express();
const port = 8000;

app.use(cors(config.corsOptions));
app.use(express.json());

app.use("/users", usersRouter);
app.use("/tasks", tasksRouter);


const run = async ()=>{
  await mongoose.connect(config.databases)

  app.listen(port, ()=>{
    console.log(`Server running on ${port} port`);
  })

  process.on('exit', ()=>{
    mongoose.disconnect();
  })
}

run().catch(console.error);