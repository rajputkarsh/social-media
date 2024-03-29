
import { NextFunction, Response, Router } from "express";
import { CONSTANTS, HTTP_STATUS_CODE, MESSAGES } from "../../constants";
import { CustomRequest } from "../../interfaces/request";
import { userMiddleware } from "../../middlewares";
import { postController } from "../../controllers";
import { postValidator } from "../../validators";

const postRouter = Router();

postRouter.post(
  "/",
  postValidator.add,
  userMiddleware.authenticate,
  async function(req: CustomRequest.UserRequest, res: Response, next: NextFunction){
    try{
      const result = await postController.add({
        text    : req.body.text,
        media   : req.body.media || "",
      }, req.user as string);
  
      res.status(HTTP_STATUS_CODE.OK).send(MESSAGES.SUCCESS.POSTED_SUCCESSFULLY(result));
    } catch(error: any){
      res.status(error?.status || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);      
    }
  }
);

postRouter.get(
  "/",
  userMiddleware.authenticate,
  async  function(req: CustomRequest.UserRequest, res: Response, next: NextFunction){
    try{
      const page = req.query.page ?? CONSTANTS.DEFAULT_PAGE_NUMBER;
      const limit = req.query.limit ?? CONSTANTS.DEFAULT_PAGE_SIZE;
      
      const result = await postController.list({}, page as number, limit as number);

      res.status(HTTP_STATUS_CODE.OK).send(MESSAGES.SUCCESS.POSTS_FETCHED_SUCCESSFULLY(result));
    } catch(error: any){
      res.status(error?.status || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);      
    }
  }
);

postRouter.get(
  "/:userId/posts",
  userMiddleware.authenticate,
  async  function(req: CustomRequest.UserRequest, res: Response, next: NextFunction){
    try{
      const userId = req.params['userId'];
      const page = req.query.page ?? CONSTANTS.DEFAULT_PAGE_NUMBER;
      const limit = req.query.limit ?? CONSTANTS.DEFAULT_PAGE_SIZE;

      const result = await postController.getPostsByUserId(userId, page as number, limit as number);
      res.status(HTTP_STATUS_CODE.OK).send(MESSAGES.SUCCESS.POSTS_FETCHED_SUCCESSFULLY(result));
    } catch(error: any){
      res.status(error?.status || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);      
    }
  }
);

postRouter.get(
  "/:id",
  userMiddleware.authenticate,
  async  function(req: CustomRequest.UserRequest, res: Response, next: NextFunction){
    try{
      const postId = req.params['id'];
      const result = postController.getPostById(postId);

      res.status(HTTP_STATUS_CODE.OK).send(MESSAGES.SUCCESS.POSTS_FETCHED_SUCCESSFULLY(result));
    } catch(error: any){
      res.status(error?.status || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);      
    }
  }
);

postRouter.patch(
  "/:id",
  userMiddleware.authenticate,
  postValidator.update,
  async  function(req: CustomRequest.UserRequest, res: Response, next: NextFunction){
    try{
      const postId   = req.params['id'];
      const postInfo = req.body;

      const result = postController.update(postId, postInfo);
      res.status(HTTP_STATUS_CODE.OK).send(MESSAGES.SUCCESS.POST_UPDATED_SUCCESSFULLY(result));
    } catch(error: any){
      res.status(error?.status || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);      
    }
  }
);

postRouter.post(
  "/:id/like",
  userMiddleware.authenticate,
  async  function(req: CustomRequest.UserRequest, res: Response, next: NextFunction){
    try{
      const postId   = req.params['id'];
      const result = await postController.like(postId, req.user as string);
      res.status(HTTP_STATUS_CODE.OK).send(MESSAGES.SUCCESS.POST_LIKED_SUCCESSFULLY(result));
    } catch(error: any){
      res.status(error?.status || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);      
    }
  }
);

postRouter.delete(
  "/:id/like",
  userMiddleware.authenticate,
  async  function(req: CustomRequest.UserRequest, res: Response, next: NextFunction){
    try{
      const postId   = req.params['id'];
      
      const result = postController.unlike(postId, req.user as string);
      res.status(HTTP_STATUS_CODE.OK).send(MESSAGES.SUCCESS.POST_UNLIKED_SUCCESSFULLY(result));      
    } catch(error: any){
      res.status(error?.status || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);      
    }
  }
);

postRouter.post(
  "/:id/comment",
  postValidator.addComment,
  userMiddleware.authenticate,
  async  function(req: CustomRequest.UserRequest, res: Response, next: NextFunction){
    try{
      const postId  = req.params['id'];
      const comment: string = req.body.comment;
      const result = await postController.addComment(postId, req.user as string, comment);
      res.status(HTTP_STATUS_CODE.OK).send(MESSAGES.SUCCESS.COMMENT_ADDED_SUCCESSFULLY(result));
    } catch(error: any){
      res.status(error?.status || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);      
    }
  }
);

postRouter.delete(
  "/:id/comment/:commentId",
  userMiddleware.authenticate,
  async  function(req: CustomRequest.UserRequest, res: Response, next: NextFunction){
    try{
      const commentId   = req.params['commentId'];
      await postController.deleteComment(commentId);
      res.status(HTTP_STATUS_CODE.OK).send(MESSAGES.SUCCESS.COMMENT_DELETED_SUCCESSFULLY({}));
    } catch(error: any){
      res.status(error?.status || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);      
    }
  }
);


export default postRouter;