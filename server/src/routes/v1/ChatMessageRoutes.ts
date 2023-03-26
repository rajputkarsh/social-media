
import { NextFunction, Response, Router } from "express";
import { CONSTANTS, HTTP_STATUS_CODE, MESSAGES } from "../../constants";
import { CustomRequest } from "../../interfaces/request";
import { userMiddleware } from "../../middlewares";
import { chatMessageController } from "../../controllers";
// import { chatMessageValidator } from "../../validators";

const chatMessageRouter = Router();

chatMessageRouter.get(
  '/:friendId/get-last-message',
  userMiddleware.authenticate,
  async  function(req: CustomRequest.UserRequest, res: Response, next: NextFunction){
    try{

      const userId   = req.user as string;
      const friendId = req.params['friendId'];

      if(!friendId){
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).send(MESSAGES.ERROR.BAD_REQUEST('Invalid ID'));
      }

      const result = await chatMessageController.getLastMessage(userId, friendId);

      res.status(HTTP_STATUS_CODE.OK).send(MESSAGES.SUCCESS.LAST_CHAT_MESSAGE(result));
    } catch(error: any){
      res.status(error?.status || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);      
    }
  }
);

export default chatMessageRouter