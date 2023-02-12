
import { ObjectId } from "mongodb";
import { model, Schema } from "mongoose";
import { CONSTANTS } from "../../constants";
import { IProfileView } from "../../interfaces";

const profileViewsSchema: Schema = new Schema<IProfileView>({
  userId: {
    required: true,
    type: ObjectId,
    ref: 'User',
  },
  viewedBy: {
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
  
profileViewsSchema.set('toObject', {virtuals: true});
profileViewsSchema.set('toJSON', {virtuals: true});

const ProfileViewsModel = model<IProfileView>('ProfileView', profileViewsSchema);

export default ProfileViewsModel;