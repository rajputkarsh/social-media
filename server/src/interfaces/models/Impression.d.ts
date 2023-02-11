import { ObjectId } from "mongoose"

export default interface IImpression{
  postId: ObjectId,
  count: Number,
  status?: String  
}