
import { NextFunction, Response, Router } from "express";
import { HTTP_STATUS_CODE, MESSAGES } from "../../constants";
import { uploadController } from "../../controllers";
import { CustomRequest } from "../../interfaces/request";
import { userMiddleware } from "../../middlewares";

const userRouter = Router();

userRouter.post(
  '/',
  async function(req: CustomRequest.UserRequest, res: Response, next: NextFunction){
    try{
      const result = await uploadController.upload(req.files);
      res.status(HTTP_STATUS_CODE.OK).send(MESSAGES.SUCCESS.FILE_UPLOADED_SUCCESSFULLY({url: result}));
    } catch(error){
      res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
  } 
)

export default userRouter;