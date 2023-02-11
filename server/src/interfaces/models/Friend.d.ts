import { ObjectId } from "mongoose"

export default interface IFriend{
  userId : ObjectId,
  friend : ObjectId,
  status?: String,  
}