
const USER_TYPE = {
  USER: 'USER'
};

const STATUS = {
  ACTIVE  : 'ACTIVE',
  INACTIVE: 'INACTIVE',
  DELETED : 'DELETED',
};

const CHAT_MESSAGE_STATUS = {
  SEEN     : 'SEEN',
  NOT_SEEN : 'NOT_SEEN',
  DELETED  : 'DELETED',
};

const NOTIFICATION_TYPE = {
  PUSH: 'PUSH',
  NORMAL: 'NORMAL'
};

const NOTIFICATION_STATUS = {
  SEEN: 'SEEN',
  NOT_SEEN: 'NOT_SEEN',
};

const NOTIFICATION_ACTION = {
  POST: 'POST',
  FRIEND_ADDED: 'FRIEND_ADDED',
  FRIEND_REQUESTED: 'FRIEND_REQUESTED',
};

const NOTIFICATION_TEXT = {
  POST_ADDED: (name: string) => `${name} has added a new post`,
  POST_LIKED: (name: string) => `${name} has liked your post`,
  POST_UNLIKED: (name: string) => `${name} has unliked your post`,
  FRIEND_ADDED: (name: string) => `${name} has added as their friend`,
  FRIEND_REQUESTED: (name: string) => `${name} has requested you to add them as friend`,
  COMMENT_ADDED: (name: string) => `${name} has added a comment on your post`,
}

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE   = 10;

const VOTE_TYPE = {
  UPVOTE  : 'UPVOTE',
  DOWNVOTE: 'DOWNVOTE',
};

const VOTE_FOR = {
  POST   : 'POST',
  COMMENT: 'COMMENT',
};

export default {
  VOTE_FOR,
  VOTE_TYPE,
  USER_TYPE,
  CHAT_MESSAGE_STATUS,
  NOTIFICATION_TYPE,
  NOTIFICATION_TEXT,
  NOTIFICATION_STATUS,
  NOTIFICATION_ACTION,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_NUMBER,
  STATUS,
}