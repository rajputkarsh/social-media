
import { Request } from "express";

export namespace CustomRequest{
  interface UserRequest extends Request{
    user?: string;
  }
}