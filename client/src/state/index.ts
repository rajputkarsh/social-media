import { createSlice } from "@reduxjs/toolkit";
import { ReduxState } from "../interfaces";

const initialState: ReduxState = {
  mode: "light",
  user: null,
  userProfile: null,
  token: null,
  posts: [],
  friends: [],
  chatMessages: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state: ReduxState  ) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user =action.payload
    },
    setUserProfile: (state, action) => {
      state.userProfile =action.payload
    },
    setLogout: (state) => {
      Object.assign(state, {...initialState, mode: state.mode});
    },
    setFriends: (state: ReduxState, action) => {
      if (state.friends) {
        state.friends = action.payload.friends;
      }
    },
    setPosts: (state: ReduxState, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state: ReduxState, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setMessages: (state: ReduxState, action) => {
      state.chatMessages = action.payload.chatMessages
    }
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost, setUserProfile, setMessages } = authSlice.actions;

export default authSlice.reducer;