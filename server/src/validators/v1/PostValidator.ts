
import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { REGEX } from "../../constants";
import BaseValidator from "./BaseValidator";

class PostValidator extends BaseValidator{

  add = async (req: Request, res: Response, next: NextFunction) => {

    const validationSchema = Joi.object({
      text     : Joi.string().required(),
      media    : Joi.string().required(),
      postedBy : Joi.string().hex().length(24).required(),
    });
    
    this.validateBody(validationSchema, req, res, next);
  }

  update = async (req: Request, res: Response, next: NextFunction) => {

    const validationSchema = Joi.object({
      text     : Joi.string().optional(),
      media    : Joi.string().optional(),
    });
    
    this.validateBody(validationSchema, req, res, next);
  }

}

export default new PostValidator();