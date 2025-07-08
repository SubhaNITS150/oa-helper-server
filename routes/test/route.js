import { createTest } from "../../controllers/test/controllers.js";
import express from "express";

const testRouter = express.Router();

testRouter.post("/create", createTest);

export default testRouter;