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
import { setPost } from "../../../state";
import { CustomTheme, ReduxState } from "../../../interfaces";
import { SETTINGS } from "../../../constants";

interface IPost {
  postId: string;
  postUser: {[key: string]: any};
  text: string;
  media: string;
  votes: {[key: string]: any};
  comments: {[key: string]: any};  
}

const Post = ({
  postId,
  postUser,
  text,
  media,
  votes,
  comments,
}: IPost) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state: ReduxState) => state?.user);

  const upvotes   = votes.filter((vote: {[key: string]: any}) => vote.type ===  SETTINGS.COMMON.VOTE_TYPE.UPVOTE);
  const downvotes = votes.filter((vote: {[key: string]: any}) => vote.type ===  SETTINGS.COMMON.VOTE_TYPE.DOWNVOTE);

  const isLiked   = upvotes.filter((vote: {[key: string]: any}) => vote.userId === loggedInUser?.userId);
  const isDisiked = downvotes.filter((vote: {[key: string]: any}) => vote.userId === loggedInUser?.userId);

  const { palette }: { palette: CustomTheme } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${loggedInUser?.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUser?.userId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
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

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexContainer>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment: {[key: string]: any}, i: number) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment.text}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetContainer>
  );
};

export default Post;