import { CONSTANTS, MESSAGES } from "../../constants";
import { friendDao, userDao } from "../../dao";
import { hashPassword } from "../../utils/common";
import { generateToken } from "../../utils/jwt";
import { UserRequest } from "../../interfaces/request";
import mongoose from "mongoose";

class UserController {

  async register(params: UserRequest.Register){
    try{
      const users = await userDao.list(
        { $or: [{ email: params.email }, { userName: params.userName }] },
        1,
        1
      );
      if(users?.count > 0){
        throw users.data[0].email == params.email ? MESSAGES.ERROR.EMAIL_ALREADY_REGISTERED : MESSAGES.ERROR.USERNAME_ALREADY_REGISTERED;
      }

      const passwordHash = hashPassword(params.password);
      const savedUser = await userDao.save({...params, password: passwordHash});

      const token = generateToken({type: CONSTANTS.USER_TYPE.USER, userId: savedUser._id.toString()});

      return {
        token,
        firstName     : savedUser.firstName,
        lastName      : savedUser.lastName,
        userName      : savedUser.userName,
        email         : savedUser.email,
        location      : savedUser.location,
        occupation    : savedUser.occupation,
        profilePicture: savedUser.profilePicture,
      };

    } catch(error){
      throw error;
    }
  }

  async login(params: UserRequest.Login){
    try{
      const passwordHash = hashPassword(params.password);
      const user = await userDao.list(
        { 
          $and: [
            {
              $or: [{ email: params.userIdentifier }, {userName: params.userIdentifier}]
            },
            {
              password: passwordHash,
            }
          ]
        },
        1,
        1
      );

      if(user?.count < 1){
        throw MESSAGES.ERROR.INVALID_CREDENTIALS
      }

      const token = generateToken({type: CONSTANTS.USER_TYPE.USER, userId: user.data[0]._id.toString()});

      return {
        token,
        firstName     : user.data[0].firstName,
        lastName      : user.data[0].lastName,
        userName      : user.data[0].userName,
        email         : user.data[0].email, 
        location      : user.data[0].location,
        occupation    : user.data[0].occupation,
        profilePicture: user.data[0].profilePicture,
      };      

    } catch(error){
      throw error;
    }
  }

  getUserInfo(userId: string){
    try{
      return userDao.list({_id: new mongoose.Types.ObjectId(userId)}, 1, 1);
    } catch(error){
      throw error;
    }
  }

  getFriendList(userId: string, page: number, limit: number){
    try{
      return friendDao.list({userId: new mongoose.Types.ObjectId(userId)}, page, limit);
    } catch(error){
      throw error;
    }
  }

  async updateFriend(userId: string, friendId: string, add:boolean){
    try{
      if(add){
        // add friend
        let friends = await friendDao.list({userId: new mongoose.Types.ObjectId(userId), friend: new mongoose.Types.ObjectId()}, 1, 1);
        if(friends.count > 0) throw MESSAGES.ERROR.ALREADY_ADDED_FRIEND;

        await friendDao.save(new mongoose.Types.ObjectId(userId), new mongoose.Types.ObjectId(friendId));
        return MESSAGES.SUCCESS.FRIEND_ADDED_SUCCESSFULLY;
      } else{
        // delete friend
        let friends = await friendDao.list({userId: new mongoose.Types.ObjectId(userId), friend: new mongoose.Types.ObjectId()}, 1, 1);
        if(friends.count == 0) throw MESSAGES.ERROR.FRIEND_DOES_NOT_EXIST;

        friendDao.delete(new mongoose.Types.ObjectId(userId), new mongoose.Types.ObjectId(friendId));
        return MESSAGES.SUCCESS.FRIEND_REMOVED_SUCCESSFULLY;
      }
    } catch(error){
      throw error;
    }
  }

}

export default new UserController();