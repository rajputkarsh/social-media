import { ObjectId } from "mongoose"

export default interface IProfileView {
  userId  : ObjectId,
  viewedBy: ObjectId,
  status? : String,
}