import mongoose from "mongoose";
import { CONSTANTS } from "../../constants";
import { IVote } from "../../interfaces";
import { VoteModel } from "../../models";



class VoteDao{
  async list(query: Object, page: number, limit: number) {
    try {
      const data = await VoteModel.aggregate([
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

      const count: number = (await VoteModel.aggregate([
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

  save(vote: IVote){
    try{
      return VoteModel.create(vote);
    } catch(error){
      throw error;
    }
  }

  update(id: mongoose.Types.ObjectId, vote: Partial<IVote>){
    try{
      return VoteModel.findByIdAndUpdate(id, vote);
    } catch(error){
      throw error;
    }
  }

  deleteByQuery(query: Object){
    try{
      return VoteModel.deleteMany(query);
    } catch(error){
      throw error;
    }
  }

  delete(id: mongoose.Types.ObjectId){
    try{
      return VoteModel.findByIdAndDelete(id);
    } catch(error){
      throw error;
    }
  }

}

export default new VoteDao();