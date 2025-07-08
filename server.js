import express from 'express';
import dotenv from 'dotenv';
// import {router} from "next/client.js";
import userRouter from './routes/user/route.js';
import questionRouter from './routes/question/route.js';
import topicsRouter from './routes/topics/route.js';
import cors from "cors"
import analyticsRouter from './routes/analytics/route.js';
import testRouter from './routes/test/route.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(cors());

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    try {
        res.status(200).send('Hello World!');
    } catch(e){
        res.status(500).send({message : "Something went wrong"});
    }
})

app.use('/api/user', userRouter);
app.use('/api/mcq', questionRouter);
app.use('/api/topics', topicsRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/test', testRouter);

app.listen(port, () => {
    console.log(`Server started on port http://localhost:${port}`);
})