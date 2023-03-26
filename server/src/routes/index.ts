
import { Router } from "express";
import userRouter from "./v1/userRoutes";
import uploadRouter from "./v1/uploadRoutes";
import postRouter from "./v1/postRoutes";
import searchRouter from "./v1/searchRoutes";
import chatMessageRouter from "./v1/ChatMessageRoutes";

var router = Router();

router.use('/user', userRouter);
router.use('/upload', uploadRouter);
router.use('/post', postRouter);
router.use('/search', searchRouter);
router.use('/chat', chatMessageRouter);

export default router;