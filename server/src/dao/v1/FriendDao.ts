import mongoose from "mongoose";
import { CONSTANTS } from "../../constants";
import { FriendModel } from "../../models";

class FriendDao {
  async list(query: Object, page: number, limit: number){
    try{
      const data = await FriendModel.aggregate([
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

      const count: number = (await FriendModel.aggregate([
        {
          $match: {
            userId: userId,
            status: CONSTANTS.STATUS.ACTIVE
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ])).length;

      return {data, count};
    } catch(error){
      throw error;
    }
  }

  save(userId: mongoose.Types.ObjectId, friendId: mongoose.Types.ObjectId){
    try{

    } catch(error){
      throw error;
    }
  }

  delete(userId: mongoose.Types.ObjectId, friendId: mongoose.Types.ObjectId){
    try{

    } catch(error){
      throw error;
    }
  }
}

export default new FriendDao();