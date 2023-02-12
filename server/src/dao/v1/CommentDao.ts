import mongoose from "mongoose";
import { CONSTANTS } from "../../constants";
import { IComment } from "../../interfaces";
import { CommentModel } from "../../models";



class CommentDao{
  async list(query: Object, page: number, limit: number) {
    try {
      const data = await CommentModel.aggregate([
        {
          $match: {
            ...query,
            status: CONSTANTS.STATUS.ACTIVE
          },
        },
        {
          $lookup: {
            from: 'vote',
            localField: '_id',
            foreignField: 'ref',
            as: 'votes'
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

      const count: number = (await CommentModel.aggregate([
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

  save(comment: IComment){
    try{
      return CommentModel.create(comment);
    } catch(error){
      throw error;
    }
  }

  update(id: mongoose.Types.ObjectId, comment: Partial<IComment>){
    try{
      return CommentModel.findByIdAndUpdate(id, comment);
    } catch(error){
      throw error;
    }
  }

  delete(id: mongoose.Types.ObjectId){
    try{
      return CommentModel.findByIdAndUpdate(id, {status: CONSTANTS.STATUS.DELETED});
    } catch(error){
      throw error;
    }
  }

}

export default new CommentDao();