import mongoose from "mongoose";
import { CONSTANTS } from "../../constants";
import { IChatMessages } from "../../interfaces";
import { ChatMessageModel } from "../../models";

class ChatMessageDao{
  async list(query: Object, page: number, limit: number) {
    try {
      const data = await ChatMessageModel.aggregate([
        {
          $match: {
            ...query,
            status: CONSTANTS.STATUS.ACTIVE
          },
        },
        {
          $skip: (page - 1) * limit,
        },
        {
          $limit: limit,
        },
      ]);

      const count: number = (await ChatMessageModel.aggregate([
        {
          $match: {
            ...query,
          },
        },
      ])).length;

      return {data, count};
    } catch (error) {
      throw error;
    }
  }

  getLastChatMessage(chatId: Array<string>){
    try{
      return ChatMessageModel.find({chatId: {$in: chatId}}).sort({createdAt: -1}).limit(1);
    } catch(error){
      throw error;
    }
  }

  save(chatMessage: IChatMessages){
    try{
      return ChatMessageModel.create(chatMessage);
    } catch(error){
      throw error;
    }
  }

  update(id: mongoose.Types.ObjectId, chatMessage: Partial<IChatMessages>){
    try{
      return ChatMessageModel.findByIdAndUpdate(id, chatMessage);
    } catch(error){
      throw error;
    }
  }

  delete(id: mongoose.Types.ObjectId){
    try{
      return ChatMessageModel.findByIdAndUpdate(id, {status: CONSTANTS.STATUS.DELETED});
    } catch(error){
      throw error;
    }
  }  

}

export default new ChatMessageDao();
