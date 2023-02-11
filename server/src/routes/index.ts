
import { Router } from "express";
import userRouter from "./v1/userRoutes";
import uploadRouter from "./v1/uploadRoutes";

var router = Router();

router.use('/user', userRouter);
router.use('/upload', uploadRouter);

export default router;