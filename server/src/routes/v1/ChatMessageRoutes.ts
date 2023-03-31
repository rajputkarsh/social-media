
import { NextFunction, Response, Router } from "express";
import { CONSTANTS, HTTP_STATUS_CODE, MESSAGES } from "../../constants";
import { CustomRequest } from "../../interfaces/request";
import { userMiddleware } from "../../middlewares";
import { chatMessageController } from "../../controllers";
import { chatValidator } from "../../validators";

const chatMessageRouter = Router();

chatMessageRouter.post(
  '/send',
  userMiddleware.authenticate,
  chatValidator.sendMessage,
  async function(req: CustomRequest.UserRequest, res: Response, next: NextFunction){
    try{
      const message: string | undefined = req.body.message;
      const media: string | undefined   = req.body.media;
      const receiver: string = req.body.receiver;
      const userId: string  = req.user as string;

      const result = await chatMessageController.sendMessage({message, media}, receiver, userId);

      res.status(HTTP_STATUS_CODE.OK).send(MESSAGES.SUCCESS.MESSAGE_SENT(result));
    } catch(error: any){
      res.status(error?.status || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
  }
);

chatMessageRouter.get(
  '/:friendId',
  userMiddleware.authenticate,
  async function(req: CustomRequest.UserRequest, res: Response, next: NextFunction){
    try{
      
      const friendId: string     = req.params['friendId'];
      const userId: string       = req.user as string;
      const page:  number | null = req.query?.page  ? (req.query.page  as unknown as number) : null;
      const limit: number | null = req.query?.limit ? (req.query.limit as unknown as number) : null;

      const result = await chatMessageController.listAll(friendId, userId, page, limit);

      res.status(HTTP_STATUS_CODE.OK).send(MESSAGES.SUCCESS.MESSAGE_LIST(result));
    } catch(error: any){
      res.status(error?.status || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);      
    }
  }
);

chatMessageRouter.patch(
  '/:friendId/mark-seen',
  userMiddleware.authenticate,
  async function(req: CustomRequest.UserRequest, res: Response, next: NextFunction){
    try{
      const userId   = req.user as string;
      const friendId = req.params['friendId'];

      if(!friendId){
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).send(MESSAGES.ERROR.BAD_REQUEST('Invalid ID'));
      }

      const result = await chatMessageController.markSeen(userId, friendId);
      res.status(HTTP_STATUS_CODE.OK).send(MESSAGES.SUCCESS.MESSAGE_MARKED_SEEN(result));
    } catch(error: any){
      res.status(error?.status || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
  }
);

chatMessageRouter.get(
  '/:friendId/get-last-message',
  userMiddleware.authenticate,
  async function(req: CustomRequest.UserRequest, res: Response, next: NextFunction){
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