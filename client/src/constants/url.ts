
export default {
  // user related
  VALIDATE_TOKEN: () => `${import.meta.env.VITE_API_BASE_URL}/user/validate`,
  REGISTER      : () => `${import.meta.env.VITE_API_BASE_URL}/user/register`,
  LOGIN         : () => `${import.meta.env.VITE_API_BASE_URL}/user/login`,
  USER_INFO     : (id: string) => `${import.meta.env.VITE_API_BASE_URL}/user/${id}`,

  // post related
  LIST_POST: () => `${import.meta.env.VITE_API_BASE_URL}/post`,
  ADD_POST : () => `${import.meta.env.VITE_API_BASE_URL}/post`,
  LIKE_POST: (id: string) => `${import.meta.env.VITE_API_BASE_URL}/post/${id}/like`,
  UNLIKE_POST: (id: string) => `${import.meta.env.VITE_API_BASE_URL}/post/${id}/like`,
  LIST_USER_POST: (userId: string) => `${import.meta.env.VITE_API_BASE_URL}/post/${userId}/posts`,
  ADD_COMMENT: (id: string) => `${import.meta.env.VITE_API_BASE_URL}/post/${id}/comment`,
  DELETE_POST: (postId: string, commentId: string) => `${import.meta.env.VITE_API_BASE_URL}/post/${postId}/comment/${commentId}`,

  // friend related
  LIST_FRIENDS: (userId: string) => `${import.meta.env.VITE_API_BASE_URL}/user/${userId}/friends`,
  ADD_FRIEND: (friendId: string) => `${import.meta.env.VITE_API_BASE_URL}/user/friend/${friendId}`,
  REMOVE_FRIEND: (friendId: string) => `${import.meta.env.VITE_API_BASE_URL}/user/friend/${friendId}`,

  // upload
  UPLOAD_MEDIA: () => `${import.meta.env.VITE_API_BASE_URL}/upload`,

  // search
  SEARCH_TERM: (term: string) => `${import.meta.env.VITE_API_BASE_URL}/search/${term}`,

  // chat
  LIST_ALL_MESSAGES: (friendId: string) => `${import.meta.env.VITE_API_BASE_URL}/chat/${friendId}`,
  GET_LAST_MESSAGE: (friendId: string) => `${import.meta.env.VITE_API_BASE_URL}/chat/${friendId}/get-last-message`,
  SEND_MESSAGE: () => `${import.meta.env.VITE_API_BASE_URL}/chat/send`,
  MARK_MESSAGE_SEEN: (friendId: string) => `${import.meta.env.VITE_API_BASE_URL}/chat/${friendId}/mark-seen`,

  // notification
  LIST_NOTIFICATIONS: () => `${import.meta.env.VITE_API_BASE_URL}/notification`,
  MARK_NOTIFICATION_SEEN: (notificationId: string) => `${import.meta.env.VITE_API_BASE_URL}/notification/mark-seen/${notificationId}`,

  // socket: 
  SOCKET_BASE_URL: () => `${import.meta.env.VITE_BACKEND_URL}`
};