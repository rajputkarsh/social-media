import mongoose, { ObjectId } from "mongoose"

export default interface INotification{
  type: String,
  action: String,
  sender?: ObjectId | mongoose.Types.ObjectId,
  receiver: ObjectId | mongoose.Types.ObjectId,
  status?: String,
  text: String,
  url?: String,
}