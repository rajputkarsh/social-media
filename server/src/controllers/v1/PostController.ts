import mongoose from "mongoose";
import { CONSTANTS, MESSAGES } from "../../constants";
import { postDao, voteDao } from "../../dao";
import { IPost } from "../../interfaces";

class PostController {

  async list(query: Object, page: number, limit: number) {
    try {
      return await postDao.list(query, page, limit);
    } catch (error) {
      throw error;
    }
  }

  async getPostById(postId: string){
    try{
      return await postDao.list({_id: new mongoose.Types.ObjectId(postId)}, 1, 1);
    } catch(error){
      throw error;
    }
  }

  async getPostsByUserId(userId: string, page: number, limit: number){
    try{
      return await postDao.list({postedBy: new mongoose.Types.ObjectId(userId)}, page, limit);
    } catch(error){
      throw error;
    }
  }
  
  async add(post: IPost, userId: string) {
    try {
      return await postDao.save({...post, postedBy: new mongoose.Types.ObjectId(userId)});
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, data: Partial<IPost>) {
    try {
      return await postDao.update(new mongoose.Types.ObjectId(id), data);
    } catch (error) {
      throw error;
    }
  }

  async like(postId: string, userId: string) {
    try {
      let votes = await voteDao.list(
        {
          ref   : new mongoose.Types.ObjectId(postId),
          userId: new mongoose.Types.ObjectId(userId),
          type  : CONSTANTS.VOTE_TYPE.UPVOTE,
        },
        1,
        1
      );
      if (votes.count > 0) throw MESSAGES.ERROR.POST_ALREADY_LIKED;

      await voteDao.deleteByQuery(
        {
          ref   : new mongoose.Types.ObjectId(postId),
          userId: new mongoose.Types.ObjectId(userId),
          type  : CONSTANTS.VOTE_TYPE.DOWNVOTE,
        }
      );

      let result = await voteDao.save({
        ref: new mongoose.Types.ObjectId(postId),
        for: CONSTANTS.VOTE_FOR.POST,
        type: CONSTANTS.VOTE_TYPE.UPVOTE,
        userId: new mongoose.Types.ObjectId(userId),
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  async unlike(postId: string, userId: string) {
    try {
      let votes = await voteDao.list(
        {
          ref   : new mongoose.Types.ObjectId(postId),
          userId: new mongoose.Types.ObjectId(userId),
          type  : CONSTANTS.VOTE_TYPE.DOWNVOTE,
        },
        1,
        1
      );
      if (votes.count > 0) throw MESSAGES.ERROR.POST_ALREADY_UNLIKED;

      await voteDao.deleteByQuery(
        {
          ref   : new mongoose.Types.ObjectId(postId),
          userId: new mongoose.Types.ObjectId(userId),
          type  : CONSTANTS.VOTE_TYPE.UPVOTE,
        }
      );

      let result = await voteDao.save({
        ref: new mongoose.Types.ObjectId(postId),
        for: CONSTANTS.VOTE_FOR.POST,
        type: CONSTANTS.VOTE_TYPE.DOWNVOTE,
        userId: new mongoose.Types.ObjectId(userId),
      });

      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default new PostController();
