import mongoose from "mongoose";
import { CONSTANTS } from "../../constants";
import { IUser } from "../../interfaces";
import { UserModel } from "../../models";

class UserDao {
  async list(query: Object, page: number, limit: number) {
    try {
      const data = await UserModel.aggregate([
        {
          $match: {
            ...query,
            status: CONSTANTS.STATUS.ACTIVE
          },
        },
        {
          $lookup: {
            from: 'friends',
            localField: '_id',
            foreignField: 'userId',
            as: 'friends'            
          }
        },
        {
          $lookup: {
            from: 'profileViews',
            localField: '_id',
            foreignField: 'userId',
            as: 'profileViews'       
          }
        },
        {
          $addFields: {
            profileViews: {
              $size: '$profileViews',
            },
          },
        },
        {
          $addFields: {
            currentLevel: 1,
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

      const count: number = (await UserModel.aggregate([
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

  save(user: IUser){
    try{
      return UserModel.create(user);
    } catch(error){
      throw error;
    }
  }

  updateProfile(userId: string, user: Partial<IUser>) {
    try{
      return UserModel.updateOne({_id: new mongoose.Types.ObjectId(userId)}, user);
    } catch(error){
      throw error;
    }
  }

  search(term: string){
    try{
      return UserModel.aggregate([
        {
          $match: {
            $or: [
              {
                firstName: { $regex: `${term}`, $options: 'i' }
              },
              {
                lastName: { $regex: `${term}`, $options: 'i' }
              },
              {
                userName: { $regex: `${term}`, $options: 'i' }
              },
              {
                email: { $regex: `${term}`, $options: 'i' }
              },
            ],            
          }
        },
        {
          $addFields: {
            type: 'USER'
          }
        }
      ]);
    } catch(error){
      throw error;
    }
  }

}

export default new UserDao();
