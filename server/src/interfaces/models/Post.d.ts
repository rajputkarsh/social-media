import { ObjectId } from "mongodb";

export default interface IPost{
  text     : String,
  media    : String,
  postedBy : ObjectId,
  upvotes  : Array<ObjectId>,
  downvotes: Array<ObjectId>,
  comments : ObjectId,
  status?  : String
}