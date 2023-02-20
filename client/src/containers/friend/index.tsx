import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../../state";
import FlexContainer from "../flexContainer";
import ProfilePicture from "../../components/profilePicture";
import { CustomTheme, ReduxState } from "../../interfaces";
import { useState } from "react";

interface FriendInfo {
  friendId: string,
  name: string,
  subtitle: string,
  profilePicture: string,
};

const Friend = ({ friendId, name, subtitle, profilePicture }: FriendInfo) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state: ReduxState) => state.user);

  const { palette }: { palette: CustomTheme } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = userInfo?.friends.find((friend: {[key: string]: any}) => friend._id === friendId);

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userInfo?.userId}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <FlexContainer>
      <FlexContainer gap="1rem">
        <ProfilePicture image={profilePicture} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexContainer>
      <IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexContainer>
  );
};

export default Friend;