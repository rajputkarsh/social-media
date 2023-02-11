
import { ObjectId } from "mongodb";
import { model, Schema } from "mongoose";
import { UserModel } from "../";
import { CONSTANTS } from "../../constants";
import { IComment } from "../../interfaces";

const commentSchema: Schema = new Schema<IComment>({
  text: {
    required: true,
    type: String,
  },
  userId: {
    required: true,
    type: ObjectId,
    ref: 'User',
  },
  upvotes: {
    required: true,
    type: [ObjectId],
  },
  downvotes: {
    required: true,
    type: [ObjectId],
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
  
commentSchema.set('toObject', {virtuals: true});
commentSchema.set('toJSON', {virtuals: true});

const CommentModel = model<IComment>('Comment', commentSchema);

export default CommentModel;