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
          $lookup: {
            from: 'users',
            localField: 'friend',
            foreignField: '_id',
            as: 'friend'
          }
        },
        {
          $addFields: {
            friend: {
                "$arrayElemAt": ["$friend", -1]
            }
          }
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
            ...query,
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

  async listWithUserInfo(query: Object, userId: string, page: number, limit: number){
    try{

      console.log(JSON.stringify([
        {
          $match: {
            ...query,
            status: CONSTANTS.STATUS.ACTIVE
          },
        },
        {
          $addFields: {
            currentFriend: {
              $cond: [
              {
                $eq: ['$userId', new mongoose.Types.ObjectId(userId)]
              },
                '$friend',
                '$userId'
              ]
            }
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'currentFriend',
            foreignField: '_id',
            as: 'friend'
          }
        },
        {
          $addFields: {
            friend: {
                "$arrayElemAt": ["$friend", -1]
            }
          }
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
      ], null, 2));

      const data = await FriendModel.aggregate([
        {
          $match: {
            ...query,
            status: CONSTANTS.STATUS.ACTIVE
          },
        },
        {
          $addFields: {
            currentFriend: {
              $cond: [
              {
                $eq: ['$userId', new mongoose.Types.ObjectId(userId)]
              },
                '$friend',
                '$userId'
              ]
            }
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'currentFriend',
            foreignField: '_id',
            as: 'friend'
          }
        },
        {
          $addFields: {
            friend: {
                "$arrayElemAt": ["$friend", -1]
            }
          }
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
            ...query,
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

  save(userId: mongoose.Types.ObjectId, friend: mongoose.Types.ObjectId){
    try{
      return FriendModel.create({userId, friend});
    } catch(error){
      throw error;
    }
  }

  delete(userId: mongoose.Types.ObjectId, friendId: mongoose.Types.ObjectId){
    try{
      return FriendModel.deleteMany({userId: userId, friend: friendId});
    } catch(error){
      throw error;
    }
  }
}

export default new FriendDao();