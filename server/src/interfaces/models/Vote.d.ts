import { ObjectId } from "mongoose";
import { CONSTANTS } from "../../constants";

export default interface IVote{
  ref    : ObjectId,
  type   : string,
  userId : ObjectId,
  status?: string,
};