import mongoose from "mongoose";
import { CONSTANTS } from "../../constants";
import { IPost } from "../../interfaces";
import { PostModel } from "../../models";



class PostDao{
  async list(query: Object, page: number, limit: number) {
    try {
      const data = await PostModel.aggregate([
        {
          $match: {
            ...query,
            status: CONSTANTS.STATUS.ACTIVE
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'postedBy',
            foreignField: '_id',
            as: 'user'
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
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'postId',
            as: 'comments',
            pipeline: [
              {
                $match: {
                  status: CONSTANTS.STATUS.ACTIVE
                }
              },
              {
                $lookup: {
                  from: 'users',
                  localField: 'userId',
                  foreignField: '_id',
                  as: 'user'
                }
              },
              {
                $addFields: {
                  user: {
                      "$arrayElemAt": ["$user", -1]
                  }
                }
              },
            ]
          }
        },
        {
          $lookup: {
            from: 'votes',
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

      const count: number = (await PostModel.aggregate([
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

  save(post: IPost){
    try{
      return PostModel.create(post);
    } catch(error){
      throw error;
    }
  }

  update(id: mongoose.Types.ObjectId, post: Partial<IPost>){
    try{
      return PostModel.findByIdAndUpdate(id, post);
    } catch(error){
      throw error;
    }
  }

  delete(id: mongoose.Types.ObjectId){
    try{
      return PostModel.findByIdAndUpdate(id, {status: CONSTANTS.STATUS.DELETED});
    } catch(error){
      throw error;
    }
  }

  search(term: string){
    try{
      return PostModel.aggregate([
        {
          $match: {
            $or: [
              {
                text: { $regex: `/${term}/`, $options: 'i' }
              },              
            ]
          }
        },
        {
          $addFields: {
            type: 'POST'
          }
        }
      ])
    } catch(error){
      throw error;
    }
  }

}

export default new PostDao();