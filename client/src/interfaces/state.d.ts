
export default interface 
ReduxState {
  mode: string,
  user: {[key: string]: any} | null,
  token: string | null,
  posts: Array<{[key: string]: any}>,
  friends: Array<{[key: string]: any}>,
  userProfile: {[key: string]: any} | null,
  chatMessages: {[key: string]: any},
  unseenChatMessages: boolean,
  notifications: Array<{[key: string]: any}>,
  unseenNotifications: boolean,
};