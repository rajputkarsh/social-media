import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../../state";
import FlexContainer from "../flexContainer";
import ProfilePicture from "../../components/profilePicture";
import { CustomTheme, ReduxState } from "../../interfaces";
import { useState } from "react";
import { URL } from "../../constants";

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
  const friends  = useSelector((state: ReduxState) => state.friends);

  const { palette }: { palette: CustomTheme } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends?.find((friend: {[key: string]: any}) => friend.friend._id === friendId);

  const patchFriend = async () => {

    let url = '', method = '';

    if(isFriend){
      url = URL.REMOVE_FRIEND(friendId);
      method = 'DELETE';
    } else{
      url = URL.ADD_FRIEND(friendId);
      method = 'POST';
    }

    const response = await fetch(
      url,
      {
        method: method,
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    // update friends list inside state
    const friendList = useSelector((state: ReduxState) => state.friends)?.filter(friend => friend?._id !== friendId);
    dispatch(setFriends({ friends: friendList }));
    
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