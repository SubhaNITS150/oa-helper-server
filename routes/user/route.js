import express from "express";
import { getUsers, addUser, loginUser } from "../../controllers/user/controller.js"
const userRouter = express.Router();

userRouter.get("/", getUsers)
userRouter.post("/", addUser)
userRouter.post("/login", loginUser)
// userRouter.post('/google', googleLogin);

export default userRouter;

// getUsers, addUser, loginUser, googleLogin