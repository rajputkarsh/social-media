
import { model, Schema } from "mongoose";
import { CONSTANTS } from "../../constants";
import { IUser } from "../../interfaces";

const userSchema: Schema = new Schema<IUser>({
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    required: true,
    type: String,
  },
  userName: {
    required: true,
    type: String,
    unique: true,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
  profilePicture: {
    required: true,
    type: String,
  },
  location: {
    required: false,
    type: String
  },
  occupation: {
    required: false,
    type: String
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
  
userSchema.set('toObject', {virtuals: true});
userSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret._password;
  },
});

const UserModel = model<IUser>('User', userSchema);

export default UserModel;