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

  FILE_UPLOADED_SUCCESSFULLY: (data: Object) => ({
    status : HTTP_STATUS_CODE.OK,
    type   : 'FILE_UPLOADED_SUCCESSFULLY',
    message: 'File Uploaded Successfully',
    data   : data,
  }),

  USER_INFO: (data: Object) => ({
    status : HTTP_STATUS_CODE.OK,
    type   : 'USER_INFO',
    message: 'User Information fetched sucessfully',
    data   : data,
  }),

  USER_VALIDATED: (data: Object) => ({
    status : HTTP_STATUS_CODE.OK,
    type   : 'USER_VALIDATED',
    message: 'User validated sucessfully',
    data   : data,
  }),

  // friends related
  USER_FRIEND_LIST: (data: Object) => ({
    status : HTTP_STATUS_CODE.OK,
    type   : 'USER_FRIEND_LIST',
    message: 'User Friend List fetched sucessfully',
    data   : data,
  }),

  FRIEND_ADDED_SUCCESSFULLY: {
    status : HTTP_STATUS_CODE.OK,
    type   : 'FRIEND_ADDED_SUCCESSFULLY',
    message: 'Friend added sucessfully',
  },

  FRIEND_REMOVED_SUCCESSFULLY: {
    status : HTTP_STATUS_CODE.OK,
    type   : 'FRIEND_REMOVED_SUCCESSFULLY',
    message: 'Friend removed sucessfully',
  },

  // post related
  POSTS_FETCHED_SUCCESSFULLY: (data: Object) => ({
    status : HTTP_STATUS_CODE.OK,
    type   : 'POSTS_FETCHED_SUCCESSFULLY',
    message: 'Posts fetched successfully',
    data   : data,
  }),

  POSTED_SUCCESSFULLY: (data: Object) => ({
    status : HTTP_STATUS_CODE.OK,
    type   : 'POSTED_SUCCESSFULLY',
    message: 'You\'ve posted successfully',
    data   : data,
  }),

  POST_UPDATED_SUCCESSFULLY: (data: Object) => ({
    status : HTTP_STATUS_CODE.OK,
    type   : 'POST_UPDATED_SUCCESSFULLY',
    message: 'Post updated successfully',
    data   : data,
  }),

  POST_LIKED_SUCCESSFULLY: (data: Object) => ({
    status : HTTP_STATUS_CODE.OK,
    type   : 'POST_LIKED_SUCCESSFULLY',
    message: 'Post liked successfully',
    data   : data,
  }),

  POST_UNLIKED_SUCCESSFULLY: (data: Object) => ({
    status : HTTP_STATUS_CODE.OK,
    type   : 'POST_UNLIKED_SUCCESSFULLY',
    message: 'Post unliked successfully',
    data   : data,
  }),

  COMMENT_ADDED_SUCCESSFULLY: (data: Object) => ({
    status : HTTP_STATUS_CODE.OK,
    type   : 'COMMENT_ADDED_SUCCESSFULLY',
    message: 'Comment added successfully',
    data   : data,
  }),

  COMMENT_DELETED_SUCCESSFULLY: (data: Object) => ({
    status : HTTP_STATUS_CODE.OK,
    type   : 'COMMENT_DELETED_SUCCESSFULLY',
    message: 'Comment deleted successfully',
    data   : data,
  }),

  // Search related
  SEARCH_RESULTS: (data: Object) => ({
    status : HTTP_STATUS_CODE.OK,
    type   : 'SEARCH_RESULTS',
    message: 'Search results fetched successfully',
    data   : data,
  }),

  // chat related
  MESSAGE_LIST: (data: Object) => ({
    status : HTTP_STATUS_CODE.OK,
    type   : 'MESSAGE_LIST',
    message: 'Messages fetched successfully',
    data   : data,
  }),
  MESSAGE_SENT: (data: Object) => ({
    status : HTTP_STATUS_CODE.OK,
    type   : 'MESSAGE_SENT',
    message: 'Message sent successfully',
    data   : data,
  }),
  LAST_CHAT_MESSAGE: (data: Object) => ({
    status : HTTP_STATUS_CODE.OK,
    type   : 'LAST_CHAT_MESSAGE',
    message: 'Last chat message fetched successfully',
    data   : data,
  }),
  MESSAGE_MARKED_SEEN:(data: Object) => ({
    status : HTTP_STATUS_CODE.OK,
    type   : 'MESSAGE_MARKED_SEEN',
    message: 'Message marked seen successfully',
    data   : data,
  }),

  // NOTIFICATION related
  NOTIFICATION_LIST: (data: Object) => ({
    status : HTTP_STATUS_CODE.OK,
    type   : 'NOTIFICATION_LIST',
    message: 'Notifications fetched successfully',
    data   : data,
  }), 
  NOTIFICATIONS_MARKED_SEEN: (data: Object) => ({
    status : HTTP_STATUS_CODE.OK,
    type   : 'NOTIFICATIONS_MARKED_SEEN',
    message: 'Notifications marked seen successfully',
    data   : data,
  }), 
};