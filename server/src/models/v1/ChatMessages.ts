
import { ObjectId } from "mongodb";
import { model, Schema } from "mongoose";
import { CONSTANTS } from "../../constants";
import { IChatMessages } from "../../interfaces";

const chatMessageSchema: Schema = new Schema<IChatMessages>({
  message : {
    type: String,
    required: false,
    default: "",
  },
  media : {
    type: String,
    required: false,
    default: "",
  },
  sender : {
    type: ObjectId,
    required: true,
  },
  receiver : {
    type: ObjectId,
    required: true,
  },
  chatId : {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: false,
    default: CONSTANTS.CHAT_MESSAGE_STATUS.NOT_SEEN,
    enum: Object.values(CONSTANTS.CHAT_MESSAGE_STATUS),
  },
},
{
  versionKey: false,
  timestamps: true
});
  
chatMessageSchema.set('toObject', {virtuals: true});
chatMessageSchema.set('toJSON', {virtuals: true});

chatMessageSchema.index({chatId: -1}, {unique:true});


const ChatMessageModel = model<IChatMessages>('ChatMessage', chatMessageSchema);

export default ChatMessageModel;