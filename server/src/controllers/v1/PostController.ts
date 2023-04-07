import mongoose from "mongoose";
import { CONSTANTS, MESSAGES, SOCKET } from "../../constants";
import { commentDao, friendDao, notificationDao, postDao, userDao, voteDao } from "../../dao";
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
      const newPost = await postDao.save({...post, postedBy: new mongoose.Types.ObjectId(userId)});

      const friends = await friendDao.listWithUserInfo({$or: [{userId: new mongoose.Types.ObjectId(userId)}, {friend: new mongoose.Types.ObjectId(userId)}]}, userId, null, null);
      if (friends?.count) {
        // save notification and send socket
        friends?.data?.forEach((friend: {[key: string]: any}) => {
          notificationDao.save({
            type: CONSTANTS.NOTIFICATION_TYPE.NORMAL,
            action: CONSTANTS.NOTIFICATION_ACTION.POST_ADDED,
            sender: new mongoose.Types.ObjectId(userId),
            receiver: new mongoose.Types.ObjectId(friend?.currentFriend.toString()),
            status: CONSTANTS.NOTIFICATION_STATUS.NOT_SEEN,
            text: CONSTANTS.NOTIFICATION_TEXT.POST_ADDED(friend?.user?.firstName + " " + friend?.user?.lastName),
            url: '#',
          }).then((response: {[key: string]: any}) => {
            global.socketInstance.sendMessage(friend?.currentFriend.toString(), SOCKET.EVENTS.POST_ADDED, response);
          })
        });
      }
      return await postDao.list({_id: newPost._id}, 1, 1);
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

      const userInfo = await userDao.list({_id: new mongoose.Types.ObjectId(userId)}, 1, 1);
      const userName = userInfo?.data[0].firstName + " " + userInfo?.data[0].lastName;
      const postInfo = await postDao.list({_id: new mongoose.Types.ObjectId(postId)}, 1, 1);
      const postedBy = postInfo?.data[0]?.postedBy;

      notificationDao.save({
        type: CONSTANTS.NOTIFICATION_TYPE.NORMAL,
        action: CONSTANTS.NOTIFICATION_ACTION.POST_ADDED,
        sender: new mongoose.Types.ObjectId(userId),
        receiver: new mongoose.Types.ObjectId(postedBy),
        status: CONSTANTS.NOTIFICATION_STATUS.NOT_SEEN,
        text: CONSTANTS.NOTIFICATION_TEXT.POST_LIKED(userName),
        url: '#',
      }).then((response: {[key: string]: any}) => {
        global.socketInstance.sendMessage(postedBy.toString(), SOCKET.EVENTS.POST_LIKED, response);
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

      const userInfo = await userDao.list({_id: new mongoose.Types.ObjectId(userId)}, 1, 1);
      const userName = userInfo?.data[0].firstName + " " + userInfo?.data[0].lastName;
      const postInfo = await postDao.list({_id: new mongoose.Types.ObjectId(postId)}, 1, 1);
      const postedBy = postInfo?.data[0]?.postedBy;

      notificationDao.save({
        type: CONSTANTS.NOTIFICATION_TYPE.NORMAL,
        action: CONSTANTS.NOTIFICATION_ACTION.POST_ADDED,
        sender: new mongoose.Types.ObjectId(userId),
        receiver: new mongoose.Types.ObjectId(postedBy),
        status: CONSTANTS.NOTIFICATION_STATUS.NOT_SEEN,
        text: CONSTANTS.NOTIFICATION_TEXT.POST_UNLIKED(userName),
        url: '#',
      }).then((response: {[key: string]: any}) => {
        global.socketInstance.sendMessage(postedBy.toString(), SOCKET.EVENTS.POST_UNLIKED, response);
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  async addComment(postId: string, userId: string, text: string){
    try{
      const result = await commentDao.save({
        postId: new mongoose.Types.ObjectId(postId),
        userId: new mongoose.Types.ObjectId(userId),
        text: text,
      }); 

      const userInfo = await userDao.list({_id: new mongoose.Types.ObjectId(userId)}, 1, 1);
      const userName = userInfo?.data[0].firstName + " " + userInfo?.data[0].lastName;
      const postInfo = await postDao.list({_id: new mongoose.Types.ObjectId(postId)}, 1, 1);
      const postedBy = postInfo?.data[0]?.postedBy;

      notificationDao.save({
        type: CONSTANTS.NOTIFICATION_TYPE.NORMAL,
        action: CONSTANTS.NOTIFICATION_ACTION.COMMENT_ADDED,
        sender: new mongoose.Types.ObjectId(userId),
        receiver: new mongoose.Types.ObjectId(postedBy),
        status: CONSTANTS.NOTIFICATION_STATUS.NOT_SEEN,
        text: CONSTANTS.NOTIFICATION_TEXT.COMMENT_ADDED(userName),
        url: '#',
      }).then((response: {[key: string]: any}) => {
        global.socketInstance.sendMessage(postedBy.toString(), SOCKET.EVENTS.COMMENT_ADDED, response);
      });      

      return result;
    } catch(error){
      throw error;
    }
  }

  async deleteComment(commentId: string){
    try{
      const result = await commentDao.delete(new mongoose.Types.ObjectId(commentId)); 
      return result;
    } catch(error){
      throw error;
    }
  }
}

export default new PostController();
