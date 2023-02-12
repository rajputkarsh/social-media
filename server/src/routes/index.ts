
import { Router } from "express";
import userRouter from "./v1/userRoutes";
import uploadRouter from "./v1/uploadRoutes";
import postRouter from "./v1/postRoutes";

var router = Router();

router.use('/user', userRouter);
router.use('/upload', uploadRouter);
router.use('/post', postRouter);

export default router;