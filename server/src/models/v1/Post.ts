
import { ObjectId } from "mongodb";
import { model, Schema } from "mongoose";
import { CONSTANTS } from "../../constants";
import { IPost } from "../../interfaces";

const postSchema: Schema = new Schema<IPost>({
  text: {
    required: true,
    type: String,
  },
  media: {
    required: false,
    type: String,
    default: ""
  },
  postedBy: {
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
  
postSchema.set('toObject', {virtuals: true});
postSchema.set('toJSON', {virtuals: true});

const PostModel = model<IPost>('Post', postSchema);

export default PostModel;