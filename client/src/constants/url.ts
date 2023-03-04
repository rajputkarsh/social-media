
export default {
  // user related
  VALIDATE_TOKEN: () => `${import.meta.env.VITE_API_BASE_URL}/user/validate`,
  REGISTER      : () => `${import.meta.env.VITE_API_BASE_URL}/user/register`,
  LOGIN         : () => `${import.meta.env.VITE_API_BASE_URL}/user/login`,
  USER_INFO     : (id: string) => `${import.meta.env.VITE_API_BASE_URL}/user/${id}`,

  // post related
  LIST_POST: () => `${import.meta.env.VITE_API_BASE_URL}/post`,
  ADD_POST : () => `${import.meta.env.VITE_API_BASE_URL}/post`,
  LIST_USER_POST: (userId: string) => `${import.meta.env.VITE_API_BASE_URL}/post/${userId}/posts`,

  // friend related
  LIST_FRIENDS: (userId: string) => `${import.meta.env.VITE_API_BASE_URL}/user/${userId}/friends`,
  ADD_FRIEND: (friendId: string) => `${import.meta.env.VITE_API_BASE_URL}/user/friend/${friendId}`,
  REMOVE_FRIEND: (friendId: string) => `${import.meta.env.VITE_API_BASE_URL}/user/friend/${friendId}`,

  // upload
  UPLOAD_MEDIA: () => `${import.meta.env.VITE_API_BASE_URL}/upload`
};