import { createSlice } from "@reduxjs/toolkit";
import { ReduxState } from "../interfaces";

const initialState: ReduxState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  friends: [],
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
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state: ReduxState, action) => {
      if (state.friends) {
        state.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
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

    // reset state to initial
    reset: (state: ReduxState) => {
      Object.assign(state, initialState);
    }
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;

export default authSlice.reducer;