import mongoose from "mongoose";
import { CONSTANTS, MESSAGES } from "../../constants";
import { chatMessageDao } from "../../dao";
import { IChatMessages } from "../../interfaces";
import { createChatId } from "../../utils/common";

class ChatMessageController {

  async getLastMessage(userId: string, friendId: string){
    try{
      const chatId: Array<string> = [createChatId(userId, friendId), createChatId(friendId, userId)];
      return await chatMessageDao.getLastChatMessage(chatId);
    } catch(error){
      throw error;
    }
  }

}

export default new ChatMessageController();
