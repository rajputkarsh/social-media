import mongoose, { ObjectId } from "mongoose";

export default interface IChatMessages{
  message? : string,
  media?   : string,
  sender   : mongoose.Types.ObjectId | ObjectId,
  receiver : mongoose.Types.ObjectId | ObjectId,
  chatId   : string,
  status   : string,
}