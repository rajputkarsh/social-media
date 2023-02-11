
import { ObjectId } from "mongodb";
import { model, Schema } from "mongoose";
import { PostModel } from "../";
import { CONSTANTS } from "../../constants";
import { IImpression } from "../../interfaces";

const impressionSchema: Schema = new Schema<IImpression>({
  postId: {
    required: true,
    type: ObjectId,
    ref: 'Post',
  },
  count: {
    required: true,
    type: Number,
    default: 1,
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
  
impressionSchema.set('toObject', {virtuals: true});
impressionSchema.set('toJSON', {virtuals: true});

const ImpressionModel = model<IImpression>('Impression', impressionSchema);

export default ImpressionModel;