import { NextFunction, Response } from "express";
import mongoose from "mongoose";
import { HTTP_STATUS_CODE, MESSAGES } from "../../constants";
import { userDao } from "../../dao";
import { CustomRequest } from "../../interfaces/request";
import { decodeToken } from "../../utils/jwt";

class UserMiddleware{
  async authenticate(req: CustomRequest.UserRequest, res: Response, next: NextFunction){
    try{
      const token = new String(req.headers.authorization).split(" ");
      if(!req.headers.authorization || token.length != 2 ) throw MESSAGES.ERROR.USER_NOT_AUTHORISED;
      const jwtPayload = decodeToken(token[1]);

      const user = await userDao.list({_id: new mongoose.Types.ObjectId(jwtPayload.payload?.userId) }, 1, 1);
      if(user.count < 1) throw MESSAGES.ERROR.USER_NOT_AUTHORISED;

      req.user = user.data[0]._id.toString();
      next();
    } catch(error){
      res.status(HTTP_STATUS_CODE.UNAUTHORIZED).send(error);
    }
  }
}

export default new UserMiddleware();