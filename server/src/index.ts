import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { userRouter } from './routes/user';
import { ProductRouter } from './routes/product';


const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://manan19badaya6:RKvX1xnKbZEWaaGq@firstone.ocfntlh.mongodb.net/firstone");


app.use("/User",userRouter);
app.use("/products",ProductRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the API!');
  });
app.listen(3001,()=>{console.log("server started")});