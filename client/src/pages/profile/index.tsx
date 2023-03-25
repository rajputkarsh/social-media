import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar";
import FriendList from "../../components/widgets/friendList";
import AddPost from "../../components/widgets/addPost";
import PostList from "../../components/widgets/postList";
import UserInfo from "../../components/widgets/userInfo";
import { ReduxState } from "../../interfaces";

const Profile = () => {
  const { userId } = useParams();
  const userInfo = useSelector((state: ReduxState) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserInfo userId={userId || userInfo?.userId}/>
          <Box m="2rem 0" />
          <FriendList userId={userId || userInfo?.userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {
            userId === userInfo?.userId && <AddPost/>
          }
          
          <Box m="2rem 0" />
          <PostList userId={userId || ""} isProfile={true} />
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;