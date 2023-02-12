
import { NextFunction, Response, Router } from "express";
import { CustomRequest } from "../../interfaces/request";
import { userMiddleware } from "../../middlewares";
import { postValidator } from "../../validators";

const postRouter = Router();

postRouter.post(
  "/",
  postValidator.add,
  userMiddleware.authenticate,
  async  function(req: CustomRequest.UserRequest, res: Response, next: NextFunction){
    
  }
);

postRouter.get(
  "/",
  userMiddleware.authenticate,
  async  function(req: CustomRequest.UserRequest, res: Response, next: NextFunction){
    
  }
);

postRouter.get(
  "/:id",
  userMiddleware.authenticate,
  async  function(req: CustomRequest.UserRequest, res: Response, next: NextFunction){
    
  }
);

postRouter.get(
  "/:userId/posts",
  userMiddleware.authenticate,
  async  function(req: CustomRequest.UserRequest, res: Response, next: NextFunction){
    
  }
);

postRouter.patch(
  "/:id",
  userMiddleware.authenticate,
  postValidator.update,
  async  function(req: CustomRequest.UserRequest, res: Response, next: NextFunction){
    
  }
);

postRouter.post(
  "/:id/like",
  userMiddleware.authenticate,
  async  function(req: CustomRequest.UserRequest, res: Response, next: NextFunction){
    
  }
);

postRouter.delete(
  "/:id/like",
  userMiddleware.authenticate,
  async  function(req: CustomRequest.UserRequest, res: Response, next: NextFunction){
    
  }
);


export default postRouter;