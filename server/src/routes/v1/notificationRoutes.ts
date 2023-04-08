import { Response, NextFunction, Router } from "express";
import { CONSTANTS, HTTP_STATUS_CODE, MESSAGES } from "../../constants";
import { notificationController } from "../../controllers";
import { CustomRequest } from "../../interfaces/request";
import { userMiddleware } from "../../middlewares";

const notificationRouter = Router();

notificationRouter.get(
  '/',
  userMiddleware.authenticate,
  async function(req: CustomRequest.UserRequest, res: Response, next: NextFunction){
    try{
      const page  = req.query.page ?? CONSTANTS.DEFAULT_PAGE_NUMBER;
      const limit = req.query.limit ?? CONSTANTS.DEFAULT_PAGE_SIZE;      
      const userId = req.user;

      const result = await notificationController.list(userId as string, page as number, limit as number);
      res.status(HTTP_STATUS_CODE.OK).send(MESSAGES.SUCCESS.NOTIFICATION_LIST(result));
    } catch(error: any){
      res.status(error?.status || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);      
    }
  }
);

notificationRouter.patch(
  '/mark-seen/:notificationId',
  userMiddleware.authenticate,
  async function(req: CustomRequest.UserRequest, res: Response, next: NextFunction){
    try{
      const userId = req.user;
      const notificationId = req.params['notificationId'];

      await notificationController.update(notificationId as string, {status: CONSTANTS.NOTIFICATION_STATUS.SEEN});
      res.status(HTTP_STATUS_CODE.OK).send(MESSAGES.SUCCESS.NOTIFICATIONS_MARKED_SEEN({}));
    } catch(error: any){
      res.status(error?.status || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);      
    }
  }
);

export default notificationRouter;