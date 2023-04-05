import mongoose from "mongoose";
import { notificationDao } from "../../dao";

class NotificationController{

  async listUserNotiications(userId: string, page: number|null, limit: number|null){
    try{
      return await notificationDao.list({
        receiver: new mongoose.Types.ObjectId(userId)
      }, page, limit);
    } catch(error){
      throw error;
    }
  }

}

export default new NotificationController();
