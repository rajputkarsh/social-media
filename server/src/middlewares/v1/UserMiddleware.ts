import { NextFunction, Response } from "express";
import mongoose from "mongoose";
import { MESSAGES } from "../../constants";
import { userDao } from "../../dao";
import { CustomRequest } from "../../interfaces/request";
import { decodeToken } from "../../utils/jwt";

class UserMiddleware{
  async authenticate(req: CustomRequest.UserRequest, res: Response, next: NextFunction){
    try{
      const token = new String(req.headers.authorization).split(" ");
      if(!req.headers.authorization || token.length != 2 ) throw MESSAGES.ERROR.USER_NOT_AUTHORISED;
      const jwtPayload = decodeToken(token[1]);

      const user = await userDao.list({_id: new mongoose.Schema.Types.ObjectId(jwtPayload.payload?.userId) }, 1, 1);
      if(user.count < 1) throw MESSAGES.ERROR.USER_NOT_AUTHORISED;

      req.user = user.data[0]._id;
      next();
    } catch(error){
      throw error;
    }
  }
}

export default new UserMiddleware();