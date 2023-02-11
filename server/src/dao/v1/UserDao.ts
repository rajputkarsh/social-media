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

  async updateProfile(userId: string, user: Partial<IUser>) {
    try{
      return UserModel.updateOne({_id: new mongoose.Schema.Types.ObjectId(userId)}, user);
    } catch(error){
      throw error;
    }
  }

}

export default new UserDao();
