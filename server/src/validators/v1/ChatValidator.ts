
import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { REGEX } from "../../constants";
import BaseValidator from "./BaseValidator";

class ChatValidator extends BaseValidator{

  sendMessage = async (req: Request, res: Response, next: NextFunction) => {

    const validationSchema = Joi.object({
      receiver : Joi.string().regex(REGEX.MONGODB_ID).required(),
      message  : Joi.string().allow('').optional(),
      media    : Joi.string().allow('').optional(),
    }).or('message', 'media');
    
    this.validateBody(validationSchema, req, res, next);
  }

}

export default new ChatValidator();
