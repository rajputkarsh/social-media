import { ObjectId } from "mongodb";

export default interface IPost{
  text      : String,
  media     : String,
  postedBy? : ObjectId,
  status?   : String
}