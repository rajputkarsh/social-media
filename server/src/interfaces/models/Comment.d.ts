import { ObjectId } from "mongoose"

export default interface IComment{
  text    : String,
  userId  : ObjectId,
  postId  : ObjectId,
  status? : String,
}