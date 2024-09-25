import { Router } from "express";
import { login, signUp } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/signup', signUp);

export default authRouter