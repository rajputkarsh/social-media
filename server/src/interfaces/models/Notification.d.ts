import { ObjectId } from "mongoose"

export default interface INotification{
  type: String,
  sender?: ObjectId,
  receiver: ObjectId,
  status?: String,
  text: String,
  url?: String,
}