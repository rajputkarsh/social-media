
import { Router } from "express";
import userRouter from "./v1/userRoutes";

var router = Router();

router.use('/user', userRouter);

export default router;