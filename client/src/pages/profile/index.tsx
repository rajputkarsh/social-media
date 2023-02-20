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
import { URL } from "../../constants";

const Profile = () => {
  const [user, setUser] = useState<{[key: string]: any} | null>(null);
  const { userId } = useParams();
  const userInfo = useSelector((state: ReduxState) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    const response = await fetch(URL.USER_INFO(userId || ""), {
      method: "GET",
      headers: { Authorization: `Bearer ${userInfo?.token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

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
          <UserInfo userId={userId || ""} profilePicture={user?.profilePicture || ""} />
          <Box m="2rem 0" />
          <FriendList userId={userId || ""} />
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