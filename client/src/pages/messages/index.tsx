import { Box, useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import MessageBox from "../../components/messageBox";
import MessageList from "../../components/messageList";
import Navbar from "../../components/navbar";

const Messages = () => {
  const { friendId } = useParams();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

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
          <MessageList />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "68%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MessageBox friendId={friendId} />
        </Box>
      </Box>
    </Box>
  );
};

export default Messages;