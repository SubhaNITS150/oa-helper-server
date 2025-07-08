import express from 'express';
import {addTopics, getTopics} from "../../controllers/topics/controller.js";

const topicsRouter = express.Router();

topicsRouter.post('/add', addTopics);
topicsRouter.get('/getQues', getTopics);

export default topicsRouter;