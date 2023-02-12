
import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { REGEX } from "../../constants";
import BaseValidator from "./BaseValidator";

class PostValidator extends BaseValidator{

}

export default new PostValidator();