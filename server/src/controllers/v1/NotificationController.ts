import mongoose from "mongoose";
import { CONSTANTS } from "../../constants";
import { notificationDao } from "../../dao";
import { INotification } from "../../interfaces";

class NotificationController{

  async list(userId: string, page: number|null, limit: number|null){
    try{
      return await notificationDao.list({
        receiver: new mongoose.Types.ObjectId(userId)
      }, page, limit);
    } catch(error){
      throw error;
    }
  }

  async update(id: string, data: Partial<INotification>){
    try{
      return await notificationDao.update(new mongoose.Types.ObjectId(id), data);
    } catch(error){
      throw error;
    }
  }

}

export default new NotificationController();
