import mongoose from "mongoose";
import { CONSTANTS } from "../../constants";
import { INotification } from "../../interfaces";
import { NotificationModel } from "../../models";



class VoteDao{
  async list(query: Object, page: number, limit: number) {
    try {
      const data = await NotificationModel.aggregate([
        {
          $match: {
            ...query,
            status: CONSTANTS.STATUS.ACTIVE
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $skip: (page - 1) * limit,
        },
        {
          $limit: limit,
        },
      ]);

      const count: number = (await NotificationModel.aggregate([
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

  save(notification: INotification){
    try{
      return NotificationModel.create(notification);
    } catch(error){
      throw error;
    }
  }

  update(id: mongoose.Types.ObjectId, notification: Partial<INotification>){
    try{
      return NotificationModel.findByIdAndUpdate(id, notification);
    } catch(error){
      throw error;
    }
  }

  updateByQuery(query: Object, notification: Partial<INotification>){
    try{
      return NotificationModel.updateMany(query, notification);
    } catch(error){
      throw error;
    }
  }

  deleteByQuery(query: Object){
    try{
      return NotificationModel.deleteMany(query);
    } catch(error){
      throw error;
    }
  }

  delete(id: mongoose.Types.ObjectId){
    try{
      return NotificationModel.findByIdAndDelete(id);
    } catch(error){
      throw error;
    }
  }

}

export default new VoteDao();