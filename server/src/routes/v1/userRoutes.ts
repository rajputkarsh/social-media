
import { NextFunction, Response, Router } from "express";
import { HTTP_STATUS_CODE, MESSAGES } from "../../constants";
import { userController } from "../../controllers";
import { CustomRequest } from "../../interfaces/request";
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
  
    } catch(error){
      res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
  } 
)

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
  
    } catch(error){
      res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
  } 
)

export default userRouter;