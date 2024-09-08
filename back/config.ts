import {CorsOptions} from 'cors';

const corsWhitelist = ['http://localhost:5173'];

const corsOptions: CorsOptions = {
  origin:(origin, callback)=>{
    if(!origin || corsWhitelist.indexOf(origin) !== -1){
      return callback(null, true);
    }else{
      callback(new Error('Not Allowed by cors'));
    }
  }
}

const config={
  corsOptions,
  databases:"mongodb://localhost/todolist",
}

export default config;
