
import { NextFunction, Response, Router } from "express";
import { CONSTANTS, HTTP_STATUS_CODE, MESSAGES } from "../../constants";
import { CustomRequest } from "../../interfaces/request";
import { userMiddleware } from "../../middlewares";
import { searchController } from "../../controllers";


const searchRouter = Router();

searchRouter.get(
  '/:term', 
  userMiddleware.authenticate,
  async  function(req: CustomRequest.UserRequest, res: Response, next: NextFunction){
    try{
      const term   = req.params['term'];
      const result = await searchController.find(term);
      res.status(HTTP_STATUS_CODE.OK).send(MESSAGES.SUCCESS.SEARCH_RESULTS(result));
    } catch(error: any){
      res.status(error?.status || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);      
    }
  }  
)

export default searchRouter;
