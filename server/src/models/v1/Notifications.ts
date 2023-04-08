
import { ObjectId } from "mongodb";
import { model, Schema } from "mongoose";
import { CONSTANTS } from "../../constants";
import { INotification } from "../../interfaces";

const notificationSchema: Schema = new Schema<INotification>({
  type: {
    type: String,
    required: true,
    enum: Object.values(CONSTANTS.NOTIFICATION_TYPE)
  },
  action: {
    type: String,
    required: true,
    enum: Object.values(CONSTANTS.NOTIFICATION_ACTION)
  },
  sender: {
    required: false,
    type: ObjectId,
    ref: 'User',    
  },
  receiver: {
    required: true,
    type: ObjectId,
    ref: 'User',       
  },
  text: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: false,    
  },
  entity: {
    type: ObjectId,
    required: false
  },
  status: {
    type: String,
    required: false,
    enum: Object.values(CONSTANTS.NOTIFICATION_STATUS),
    default: CONSTANTS.NOTIFICATION_STATUS.NOT_SEEN,
    
  }
},
{
  versionKey: false,
  timestamps: true
});
  
notificationSchema.set('toObject', {virtuals: true});
notificationSchema.set('toJSON', {virtuals: true});

const NotificationModel = model<INotification>('Notification', notificationSchema);

export default NotificationModel;