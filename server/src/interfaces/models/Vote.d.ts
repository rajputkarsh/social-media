import mongoose, { ObjectId } from "mongoose";
import { CONSTANTS } from "../../constants";

export default interface IVote{
  ref    : mongoose.Types.ObjectId | ObjectId,
  type   : string,
  for    : string,
  userId : mongoose.Types.ObjectId | ObjectId,
  status?: string,
};