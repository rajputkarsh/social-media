import { useRef, useEffect, useState } from "react";
import { Badge, Box, Typography } from "@mui/material";
import FlexContainer from "../../containers/flexContainer";
import WidgetContainer from "../../containers/widgetContainer";
import { CustomTheme, ReduxState } from "../../interfaces";
import { useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { URL } from "../../constants";

function MessageList() {
  const navigate = useNavigate();
  const divRef = useRef<HTMLElement | null>(null);
  const [topOffset, setTopOffset] = useState<Number>(0);
  const [lastMessages, setLastMessages] = useState<Array<any>>([])
  const friends = useSelector((state: ReduxState) => state.friends);
  const { palette }: { palette: CustomTheme } = useTheme();

  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const light = palette.neutral.light;


  // function to get last message of users.
  const getLastChatMessage = (
    userId: string | undefined
  ): { message: string; time: string; seen: number } => {
    if (!userId) return { message: "", time: "", seen: 0 };

    return { message: "hello world hello world hello world hello world hello world", time: "12:40 pm", seen: 10 };
  };

  useEffect(() => {
    setTopOffset(divRef?.current?.offsetTop || 0);
    const friendIds = friends?.map((friend) => friend?._id)

    const response = fetch(URL.)
    
  }, []);

  return (
    <WidgetContainer ref={divRef} height={`calc(95vh - ${topOffset}px)`} overflow={'auto'}>
      <FlexContainer>
        <Typography color={dark} variant="h5">
          Select Chat
        </Typography>
      </FlexContainer>

        {
          !friends?.length && (
            <Typography variant='h4'>
              Please add some friends to chat
            </Typography>
          )
        }

        {friends?.map((friend, index) => {
          const lastMessage = getLastChatMessage(friend?.friend?._id);
          let lastMessageText = lastMessage.message;

          if ( lastMessageText?.length && lastMessageText.split(" ")?.length > 3){
            lastMessageText = (lastMessageText.split(" ").splice(0, 4)).join(" ") + " ...";
          }
          
          return (
            <Box
              onClick={() => navigate(`/messages/${friend?.friend?._id}`)}
              key={`message_box_item_${index}`}
              sx={{
                border: `1px solid ${light}`,
                borderRadius: '0.5rem',
                padding: '0.4rem',
                marginTop: '0.4rem',
                marginBottom: '0.4rem',

                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: `${light}`
                }
              }}
            >
              <FlexContainer>
                <Typography color={dark} variant='h6' sx={{textTransform: 'capitalize'}}>
                  {friend?.friend?.firstName + ' ' + friend?.friend?.lastName}
                </Typography>
                {lastMessage?.seen > 0 && (
                  <Badge
                    color='error'
                    variant='dot'
                    sx={{ marginRight: '10px' }}
                    badgeContent={lastMessage?.seen} />
                )}
              </FlexContainer>
              <FlexContainer>
                <Typography color={medium}>{lastMessageText}</Typography>
                <Typography color={medium}>{lastMessage?.time}</Typography>
              </FlexContainer>
            </Box>                      
          );
        })}
    </WidgetContainer>
  );
}

export default MessageList;
