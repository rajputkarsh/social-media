
import { ObjectId } from "mongodb";
import { model, Schema } from "mongoose";
import { UserModel } from "../";
import { CONSTANTS } from "../../constants";
import { IFriend } from "../../interfaces";

const friendSchema: Schema = new Schema<IFriend>({
  userId: {
    required: true,
    type: ObjectId,
    ref: 'User',
  },
  friend: {
    required: true,
    type: ObjectId,
    ref: 'User',
  },
  status: {
    required: false,
    type: String,
    default: CONSTANTS.STATUS.ACTIVE, 
    enum: Object.values(CONSTANTS.STATUS)
  }
},
{
  versionKey: false,
  timestamps: true
});
  
friendSchema.set('toObject', {virtuals: true});
friendSchema.set('toJSON', {virtuals: true});

const FriendModel = model<IFriend>('Friend', friendSchema);

export default FriendModel;