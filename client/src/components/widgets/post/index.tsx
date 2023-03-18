import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexContainer from "../../../containers/flexContainer";
import Friend from "../../../containers/friend";
import WidgetContainer from "../../../containers/widgetContainer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../../state";
import { CustomTheme, ReduxState } from "../../../interfaces";
import { SETTINGS } from "../../../constants";
import URL from "../../../constants/url";
import AddComment from "../addComment";
import ProfilePicture from "../../profilePicture";

interface IPost {
  postId: string;
  postUser: { [key: string]: any };
  text: string;
  media: string;
  votes: { [key: string]: any };
  comments: { [key: string]: any };
}

const Post = ({ postId, postUser, text, media, votes, comments }: IPost) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state: ReduxState) => state?.user);
  const token = useSelector((state: ReduxState) => state?.user?.token);

  const upvotes = votes.filter(
    (vote: { [key: string]: any }) =>
      vote.type === SETTINGS.COMMON.VOTE_TYPE.UPVOTE
  );
  // const downvotes = votes.filter((vote: {[key: string]: any}) => vote.type ===  SETTINGS.COMMON.VOTE_TYPE.DOWNVOTE);

  const isLiked =
    upvotes.filter(
      (vote: { [key: string]: any }) => vote.userId === loggedInUser?.userId
    ).length > 0;

  const { palette }: { palette: CustomTheme } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const url = isLiked ? URL.UNLIKE_POST(postId) : URL.LIKE_POST(postId);
    const method = isLiked ? "DELETE" : "POST";

    await fetch(url, {
      method: method,
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ userId: loggedInUser?.userId }),
    });

    const response = await fetch(
      URL.LIST_POST(),
      {
        method: "GET",
        headers: {authorization: `Bearer ${token}`},
      }
    );
    
    const data = await response.json();
    if(data.status !== 200){
      throw data.message;
    }

    dispatch(setPosts({ posts: data.data.data }));    
    
  };

  return (
    <WidgetContainer m="2rem 0">
      <Friend
        friendId={postUser?._id}
        name={[postUser?.firstName, postUser?.lastName].join(" ")}
        subtitle={postUser?.location}
        profilePicture={postUser?.profilePicture || ""}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {text}
      </Typography>
      {media && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={media}
        />
      )}
      <FlexContainer mt="0.25rem">
        <FlexContainer gap="1rem">
          <FlexContainer gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{upvotes.length}</Typography>
          </FlexContainer>

          <FlexContainer gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
      {isComments && (
        <Box mt="0.5rem">
          <AddComment postId={postId} />
          {comments.map((comment: { [key: string]: any }, i: number) => (
            <Box key={`${comment._id}-${i}`} display={'flex'} sx={{
              marginLeft: '1.5rem',
              padding: `0.3rem`,
            }}>
              <ProfilePicture image={comment?.user?.profilePicture} size={'40px'}/>
              <Box sx={{backgroundColor: `${palette.neutral.light}`, width: '100%', borderRadius: '0.6rem', marginLeft:'0.3rem'}}>
              <Typography variant='h6' sx={{ color: main, pl: "1rem" }}>
                {`${comment?.user?.firstName || ""} ${comment?.user?.lastName || ""}`}
              </Typography>
              <Typography sx={{ color: main, m: "0.1rem 0", pl: "1rem" }}>
                {comment.text}
              </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </WidgetContainer>
  );
};

export default Post;
