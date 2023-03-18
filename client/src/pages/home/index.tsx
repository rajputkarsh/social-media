import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../../components/navbar";
import UserInfo from "../../components/widgets/userInfo";
import AddPost from "../../components/widgets/addPost";
import PostList from "../../components/widgets/postList";
import Advertisememt from "../../components/widgets/advertisement";
import FriendList from "../../components/widgets/friendList";
import { ReduxState } from "../../interfaces";

const Home = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const userInfo = useSelector((state: ReduxState) => state.user);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserInfo/>
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <AddPost/>
          <PostList />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <Advertisememt />
            <Box m="2rem 0" />
            <FriendList userId={userInfo?.userId} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;