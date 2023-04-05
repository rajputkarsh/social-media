import mongoose from "mongoose";
import { CONSTANTS } from "../../constants";
import { PaginationOptions } from "../../interfaces/Common";
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

  async listWithUserInfo(query: Object, userId: string, page: number | null, limit: number | null){
    try{

      let pageCondition: PaginationOptions = [];

      if(page && limit){
        pageCondition.push({'$skip' : (page - 1) * limit});
        pageCondition.push({'$limit': limit});
      }

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
          $addFields: {
            user: new mongoose.Types.ObjectId(userId)
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'user'
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
          $addFields: {
            user: {
                "$arrayElemAt": ["$user", -1]
            }
          }
        },        
        {
          $sort: {
            createdAt: -1,
          },
        },
        ...pageCondition,
      ]);

      const count: number = (await FriendModel.aggregate([
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
          $addFields: {
            user: new mongoose.Types.ObjectId(userId)
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'user'
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
          $addFields: {
            user: {
                "$arrayElemAt": ["$user", -1]
            }
          }
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