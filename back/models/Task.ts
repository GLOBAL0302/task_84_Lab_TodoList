import mongoose, { Types } from 'mongoose';
import User from './User';

const Schema = mongoose.Schema

const TaskSchema = new Schema({
  user:{
    type: Schema.Types.ObjectId,
    ref:'User',
    required: true,
    validator:async(value:Types.ObjectId)=>{
      const user = await User.findById(value);
      return Boolean(user);
    },
    message: "User ID does not exist"
  },

  title: {
    type:String,
    required:true,
  },
  description:String,
  status:{
    type:String,
    enum:["new", "in_progress", "complete"]
  }
})


const Task = mongoose.model('Task', TaskSchema);

export default Task;