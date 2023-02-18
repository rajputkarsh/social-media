
import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { REGEX } from "../../constants";
import BaseValidator from "./BaseValidator";

class UserValidator extends BaseValidator{

  register = async (req: Request, res: Response, next: NextFunction) => {

    const validationSchema = Joi.object({
      firstName     : Joi.string().required(),
      lastName      : Joi.string().required(),
      userName      : Joi.string().required(),
      email         : Joi.string().email().required(),
      password      : Joi.string().regex(REGEX.PASSWORD).required(),
      occupation    : Joi.string().required(),
      profilePicture: Joi.string().uri().required(),
      location      : Joi.string().required(),

    });
    
    this.validateBody(validationSchema, req, res, next);
  }

  login = async (req: Request, res: Response, next: NextFunction) => {

    const validationSchema = Joi.object({
      userIdentifier: Joi.string().required(),
      password      : Joi.string().required(),
    });
    
    this.validateBody(validationSchema, req, res, next);
  };

}

export default new UserValidator();