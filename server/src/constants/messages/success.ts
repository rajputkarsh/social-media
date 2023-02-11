import { HTTP_STATUS_CODE } from "../";

export default {
  

  // user related
  USER_REGISTRATION: (data: Object) => ({
    status : HTTP_STATUS_CODE.OK,
    type   : 'USER_REGISTRATION',
    message: 'User Registered Successfully',
    data   : data,
  }),

  USER_LOGGEDIN: (data: Object) => ({
    status : HTTP_STATUS_CODE.OK,
    type   : 'USER_LOGGEDIN',
    message: 'User Logged in Successfully',
    data   : data,
  }),

};