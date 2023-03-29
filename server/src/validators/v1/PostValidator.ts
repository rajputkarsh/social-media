
import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import BaseValidator from "./BaseValidator";

class PostValidator extends BaseValidator{

  add = async (req: Request, res: Response, next: NextFunction) => {

    const validationSchema = Joi.object({
      text     : Joi.string().required(),
      media    : Joi.string().optional(),
      postedBy : Joi.string().hex().length(24).required(),
    });
    
    this.validateBody(validationSchema, req, res, next);
  }

  addComment = async (req: Request, res: Response, next: NextFunction) => {

    const validationSchema = Joi.object({
      comment: Joi.string().required(),
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