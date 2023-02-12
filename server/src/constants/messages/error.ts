
import HTTP_CODES from "../httpCodes"

export default {

  BAD_REQUEST: (data: string) => ({
    status : HTTP_CODES.BAD_REQUEST,
    type   : 'BAD_REQUEST',
    message: data,
  }),

  USER_NOT_AUTHORISED: {
    status : HTTP_CODES.BAD_REQUEST,
    type   : 'USER_NOT_AUTHORISED',
    message: `You're not authorised to access this page`,
  },

  PAYLOAD_TOO_LARGE: {
    status : HTTP_CODES.PAYLOAD_TOO_LARGE,
    type   : 'PAYLOAD_TOO_LARGE',
    message: 'The payload has exceeded the maximum size limit' 
  },

  INTERNAL_SERVER_ERROR: (data: string) => ({
    status : HTTP_CODES.INTERNAL_SERVER_ERROR,
    type   : 'INTERNAL_SERVER_ERROR',
    message: data,
  }),

  // uswer related
  EMAIL_ALREADY_REGISTERED: {
    status : HTTP_CODES.BAD_REQUEST,
    type   : 'EMAIL_ALREADY_REGISTERED',
    message: 'Email is already registered',
  },

  USERNAME_ALREADY_REGISTERED :{
    status : HTTP_CODES.BAD_REQUEST,
    type   : 'USERNAME_ALREADY_REGISTERED',
    message: 'Username is already registered',
  },

  INVALID_CREDENTIALS :{
    status : HTTP_CODES.BAD_REQUEST,
    type   : 'INVALID_CREDENTIALS',
    message: 'You have entered invalid credentials',
  },

  INVALID_USER: {
    status : HTTP_CODES.BAD_REQUEST,
    type   : 'INVALID_USER',
    message: 'The provided user does not exist',
  },
  
  // friend related
  ALREADY_ADDED_FRIEND: {
    status : HTTP_CODES.BAD_REQUEST,
    type   : 'ALREADY_ADDED_FRIEND',
    message: 'User already has been added as a friend',
  },

  FRIEND_DOES_NOT_EXIST: {
    status : HTTP_CODES.BAD_REQUEST,
    type   : 'FRIEND_DOES_NOT_EXIST',
    message: 'This friend does not exist',
  },

  // post related
  POST_ALREADY_LIKED: {
    status : HTTP_CODES.BAD_REQUEST,
    type   : 'POST_ALREADY_LIKED',
    message: 'You cannot like a post twice',
  },

  POST_ALREADY_UNLIKED:{
    status : HTTP_CODES.BAD_REQUEST,
    type   : 'POST_ALREADY_UNLIKED',
    message: 'You cannot unlike a post twice',
  },

  POST_NOT_LIKED: {
    status : HTTP_CODES.BAD_REQUEST,
    type   : 'POST_NOT_LIKED',
    message: 'You have not liked this post',
  },
}