import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import MessageBox from "../../components/messageBox";
import MessageList from "../../components/messageList";
import Navbar from "../../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../../interfaces";
import { URL } from "../../constants";
import { setMessages } from "../../state";
import SocketContext from "../../context/socket";

const Messages = () => {
  const dispatch = useDispatch();
  const { friendId } = useParams();
  const socketInstance = useContext(SocketContext);
  const user     = useSelector((state: ReduxState) => state.user);
  const token    = useSelector((state: ReduxState) => state.user?.token);
  const friends  = useSelector((state: ReduxState) => state.friends);
  const messages = useSelector((state: ReduxState) => state?.chatMessages);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  socketInstance.on('MESSAGE', (messageData) => {
    const data = JSON.parse(JSON.stringify(messageData));
    if(messageData?.sender == friendId){
      fetch(URL.MARK_MESSAGE_SEEN(friendId as string),{
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });
      data['status'] = 'SEEN';
    }
    let previousMessages = JSON.parse(JSON.stringify(messages[messageData?.sender  as string]));
    previousMessages.unshift(data);
    dispatch(setMessages({chatMessages: {...messages, [messageData?.sender  as string]: previousMessages}}));    
  });

  // initialize chat messages with last messages of each friend  
  useEffect(() => {
    if(!friendId){
      
      const friendIds = friends?.map((friend) => friend?.friend?._id);
      Promise.all(
        friendIds.map((friend: string) =>
          fetch(URL.GET_LAST_MESSAGE(friend), {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      ).then((responses) => {
        Promise.all(responses.map((res) => res.json())).then((lastMessages) => {
          const lastChatMessages: {[key: string]: any} = {};
          lastMessages.forEach(
            (lastMessage) => {
              if ( Array.isArray(lastMessage.data) && lastMessage.data?.length > 0){
                if(lastMessage.data[0]?.sender == user?.userId){
                  lastChatMessages[lastMessage.data[0].receiver] =  [lastMessage.data[0]];
                } else{
                  lastChatMessages[lastMessage.data[0].sender] =  [lastMessage.data[0]];
                }
              }
            });
          dispatch(setMessages({chatMessages: lastChatMessages}));
        });
      });    
    } 
  }, []);

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