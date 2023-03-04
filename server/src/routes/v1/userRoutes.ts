
import { NextFunction, Response, Router } from "express";
import { CONSTANTS, HTTP_STATUS_CODE, MESSAGES } from "../../constants";
import { userController } from "../../controllers";
import { CustomRequest } from "../../interfaces/request";
import { userMiddleware } from "../../middlewares";
import { userValidator } from "../../validators";

const userRouter = Router();

userRouter.post(
  '/register', 
  userValidator.register,
  async function(req: CustomRequest.UserRequest, res: Response, next: NextFunction){
    try{
      const result = await userController.register({
        firstName     : req.body.firstName,
        lastName      : req.body.lastName,
        userName      : req.body.userName,
        email         : req.body.email,
        password      : req.body.password,
        occupation    : req.body.occupation,
        profilePicture: req.body.profilePicture,
        location      : req.body.location,
      });

      res.status(HTTP_STATUS_CODE.OK).send(MESSAGES.SUCCESS.USER_REGISTRATION(result));
  
    } catch(error: any){
      res.status(error?.status || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
  } 
);

userRouter.post(
  '/login', 
  userValidator.login,
  async function(req: CustomRequest.UserRequest, res: Response, next: NextFunction){
    try{
      const result = await userController.login({
        userIdentifier: req.body.userIdentifier,
        password      : req.body.password,
      });

      res.status(HTTP_STATUS_CODE.OK).send(MESSAGES.SUCCESS.USER_LOGGEDIN(result));
  
    } catch(error: any){
      res.status(error?.status || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
  } 
);

userRouter.post(
  '/validate', 
  userMiddleware.authenticate,
  async function(req: CustomRequest.UserRequest, res: Response, next: NextFunction){
    try{
      const result = await userController.getUserInfo(req.user as string);

      if(result.count > 0){
        res.status(HTTP_STATUS_CODE.OK).send(MESSAGES.SUCCESS.USER_VALIDATED({isValid: true}));
      } else{
        res.status(HTTP_STATUS_CODE.OK).send(MESSAGES.SUCCESS.USER_VALIDATED({isValid: false}));
      }
  
    } catch(error: any){
      res.status(error?.status || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
  } 
);

userRouter.get(
  "/:id", 
  userMiddleware.authenticate,
  async  function(req: CustomRequest.UserRequest, res: Response, next: NextFunction){
    try{
      const result = await userController.getUserInfo(req.params['id']);
      res.status(HTTP_STATUS_CODE.OK).send(MESSAGES.SUCCESS.USER_INFO(result));
    } catch(error: any){
      res.status(error?.status || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
  }
);

userRouter.get(
  "/:id/friends", 
  userMiddleware.authenticate,
  async  function(req: CustomRequest.UserRequest, res: Response, next: NextFunction){
    try{
      const page = req.query.page ?? CONSTANTS.DEFAULT_PAGE_NUMBER;
      const limit = req.query.limit ?? CONSTANTS.DEFAULT_PAGE_SIZE;

      const result = await userController.getFriendList(req.params['id'], page as number, limit as number);

      res.status(HTTP_STATUS_CODE.OK).send(MESSAGES.SUCCESS.USER_FRIEND_LIST(result));
    } catch(error: any){
      res.status(error?.status || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
  }
);

userRouter.post(
  "/friend/:friendId", 
  userMiddleware.authenticate,
  async  function(req: CustomRequest.UserRequest, res: Response, next: NextFunction){
    try{
      const result = await userController.updateFriend(req.user as string, req.params['friendId'], true);
      res.status(HTTP_STATUS_CODE.OK).send(result);
    } catch(error: any){
      res.status(error?.status || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
  }
);

userRouter.delete(
  "/friend/:friendId", 
  userMiddleware.authenticate,
  async  function(req: CustomRequest.UserRequest, res: Response, next: NextFunction){
    try{
      const result = await userController.updateFriend(req.user as string, req.params['friendId'], false);
      res.status(HTTP_STATUS_CODE.OK).send(MESSAGES.SUCCESS.FRIEND_REMOVED_SUCCESSFULLY);
    } catch(error: any){
      res.status(error?.status || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
  }
);

export default userRouter;