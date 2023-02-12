
import { ObjectId } from "mongodb";
import { model, Schema } from "mongoose";
import { CONSTANTS } from "../../constants";
import { IVote } from "../../interfaces";

const voteSchema: Schema = new Schema<IVote>({
  ref   :  {
    required: true,
    type    : ObjectId,
  },
  for  : {
    required: true,
    type    : String,
    enum    : Object.values(CONSTANTS.VOTE_FOR),
  },
  type  : {
    required: true,
    type    : String,
    enum    : Object.values(CONSTANTS.VOTE_TYPE),
  },
  userId: {
    required: true,
    type    : ObjectId,
    ref     : 'User',
  },
  status: {
    required: false,
    type    : String,
    default : CONSTANTS.STATUS.ACTIVE, 
    enum    : Object.values(CONSTANTS.STATUS),
  }
},
{
  versionKey: false,
  timestamps: true
});
  
voteSchema.set('toObject', {virtuals: true});
voteSchema.set('toJSON', {virtuals: true});

const VoteModel = model<IVote>('Vote', voteSchema);

export default VoteModel;