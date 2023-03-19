import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { URL } from "../../../constants";
import url from "../../../constants/url";
import { ReduxState } from "../../../interfaces";
import { setPosts } from "../../../state";
import Post from "../post";

const PostList = ({userId="", isProfile = false }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: ReduxState) => state.user);
  const posts = useSelector(((state: ReduxState) => state.posts) || []);

  const getPosts = async () => {
    try{
      const response = await fetch(URL.LIST_POST(), {
        method: "GET",
        headers: {authorization: `Bearer ${userInfo?.token}`},
      });
      const data = await response.json();

      if(data.status !== 200){
        throw data.message;
      }

      dispatch(setPosts({ posts: data.data.data }));
    } catch(error){
      toast.error('something went wrong');
    }
  };

  const getUserPosts = async () => {
    try{
      const response = await fetch(
        URL.LIST_USER_POST(userId || userInfo?.userId),
        {
          method: "GET",
          headers: {authorization: `Bearer ${userInfo?.token}`},
        }
      );
      
      const data = await response.json();
      if(data.status !== 200){
        throw data.message;
      }

      dispatch(setPosts({ posts: data.data.data }));
    } catch(error){
      toast.error('something went wrong');
    }
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {
        (!posts.length) && (
          <p>This user hasn't posted anything</p>
        )
      }
      {posts.map(
        ({
          _id,
          user,
          text,
          media,
          votes,
          comments,
        }) => (
          <Post
            key={_id}
            postId={_id}
            postUser={user}
            text={text}
            media={media}
            votes={votes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostList;