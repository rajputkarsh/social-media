import mongoose, { ObjectId } from "mongoose"

export default interface IComment{
  text    : String,
  userId  : mongoose.Types.ObjectId | ObjectId,
  postId  : mongoose.Types.ObjectId | ObjectId,
  status? : String,
}