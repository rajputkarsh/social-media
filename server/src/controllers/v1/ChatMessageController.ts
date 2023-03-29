import mongoose from "mongoose";
import { CONSTANTS, MESSAGES } from "../../constants";
import { chatMessageDao } from "../../dao";
import { IChatMessages } from "../../interfaces";
import { ChatMessageRequest } from "../../interfaces/request/ChatMessageRequest";
import { createChatId } from "../../utils/common";

class ChatMessageController {

  async listAll(friendId: string, userId: string, page: number | null, limit: number | null){
    try{
      const conditions = {
        chatId: {
          $in: [
            createChatId(userId, friendId),
            createChatId(friendId, userId),
          ]
        }
      };

      return await chatMessageDao.list(conditions, page, limit)

    } catch(error){
      throw error;
    }
  }

  async getLastMessage(userId: string, friendId: string){
    try{
      const chatId: Array<string> = [createChatId(userId, friendId), createChatId(friendId, userId)];
      return await chatMessageDao.getLastChatMessage(chatId);
    } catch(error){
      throw error;
    }
  }

  async sendMessage(messageContents: ChatMessageRequest.MessageContents, receiver: string, userId: string){
    try{
      const result = await chatMessageDao.save({
        message: messageContents?.message,
        media: messageContents?.media,
        sender: new mongoose.Types.ObjectId(userId),
        receiver: new mongoose.Types.ObjectId(receiver),
        chatId: createChatId(userId, receiver),
        status: CONSTANTS.CHAT_MESSAGE_STATUS.NOT_SEEN,
      });

      // TODO: Send Socket Message to receiver for message

      return result;
    } catch(error){
      throw error;
    }
  }

}

export default new ChatMessageController();
