import { Box, Typography, useTheme } from "@mui/material";
import Friend from "../../../containers/friend";
import WidgetContainer from "../../../containers/widgetContainer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../../../state";
import { CustomTheme, ReduxState } from "../../../interfaces";
import { URL } from "../../../constants";

const FriendListWidget = ({ userId }: { userId: string }) => {
  const dispatch = useDispatch();
  const { palette }: { palette: CustomTheme } = useTheme();
  const userInfo = useSelector((state: ReduxState) => state.user);

  const getFriends = async () => {
    const response = await fetch(
      URL.LIST_FRIENDS(userId),
      {
        method: "GET",
        headers: { Authorization: `Bearer ${userInfo?.token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data.data?.data }));
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetContainer>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {userInfo?.friends.map((friend: {[key: string]: any}) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            profilePicture={friend.profilePicture}
          />
        ))}
      </Box>
    </WidgetContainer>
  );
};

export default FriendListWidget;