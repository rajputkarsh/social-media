import { ObjectId } from "mongoose"

export default interface IComment{
  text     : String,
  userId   : ObjectId,
  upvotes  : Array<ObjectId>,
  downvotes: Array<ObjectId>,
  status?  : String,
}