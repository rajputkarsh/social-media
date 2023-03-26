import { useRef, useEffect, useState } from "react";
import { Badge, Box, Typography } from "@mui/material";
import FlexContainer from "../../containers/flexContainer";
import WidgetContainer from "../../containers/widgetContainer";
import { CustomTheme, ReduxState } from "../../interfaces";
import { useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { URL } from "../../constants";
import ProfilePicture from "../profilePicture";
import * as moment from 'moment-timezone';

function MessageList() {
  const navigate = useNavigate();
  const user = useSelector((state: ReduxState) => state.user);
  const token = useSelector((state: ReduxState) => state.user?.token);
  const friends = useSelector((state: ReduxState) => state.friends);
  const [topOffset, setTopOffset] = useState<Number>(0);
  const [lastMessages, setLastMessages] = useState<Array<any>>([]);
  const divRef = useRef<HTMLElement | null>(null);
  const { palette }: { palette: CustomTheme } = useTheme();

  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const light = palette.neutral.light;

  const getLastChatMessage = (
    userId: string
  ): { message: string; time: string; seen: boolean } => {
    let lastMessage = lastMessages.filter((lastMessage) =>
      lastMessage?.chatId?.includes(userId)
    );
    if (lastMessage.length > 1) lastMessage = lastMessage.sort((obj1, obj2) => new Date(obj2?.createdAt).getTime() - new Date(obj1?.createdAt).getTime()).splice(0, 1);
    const hours = (moment().utc().diff(moment(lastMessage[0]?.createdAt)))/3600000;

    return {
      message: lastMessage[0]?.media ? "Media" : lastMessage[0]?.message,
      time: Math.round(hours) > 0 ? `${Math.round(hours)}h ago` : `${Math.round(hours * 60)} mins ago`,
      seen: userId == user?.userId || lastMessage[0]?.status == 'SEEN',
    };
  };

  useEffect(() => {
    setTopOffset(divRef?.current?.offsetTop || 0);
    const friendIds = friends?.map((friend) => friend?.friend?._id);

    Promise.all(
      friendIds.map((friendId: string) =>
        fetch(URL.GET_LAST_MESSAGE(friendId), {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        })
      )
    ).then((responses) => {
      Promise.all(responses.map((res) => res.json())).then((lastMessages) => {
        const lastChatMessages = lastMessages.reduce(
          (messages, lastMessage) => {
            if (
              Array.isArray(lastMessage.data) &&
              lastMessage.data?.length > 0
            ) {
              messages.push(lastMessage.data[0]);
            }
            return messages;
          },
          []
        );
        setLastMessages(lastChatMessages);
      });
    });
  }, []);

  return (
    <WidgetContainer
      ref={divRef}
      height={`calc(95vh - ${topOffset}px)`}
      overflow={"auto"}
    >
      <FlexContainer>
        <Typography color={dark} variant="h5">
          Select Chat
        </Typography>
      </FlexContainer>

      {!friends?.length && (
        <Typography variant="h4">Please add some friends to chat</Typography>
      )}

      {friends?.map((friend, index) => {
        const lastMessage = getLastChatMessage(friend?.friend?._id);
        let lastMessageText = lastMessage.message;

        if (lastMessageText?.length && lastMessageText.split(" ")?.length > 3) {
          lastMessageText =
            lastMessageText.split(" ").splice(0, 4).join(" ") + " ...";
        }

        return (
          <Box
            onClick={() => navigate(`/messages/${friend?.friend?._id}`)}
            key={`message_box_item_${index}`}
            sx={{
              border: `1px solid ${light}`,
              borderRadius: "0.5rem",
              padding: "0.4rem",
              marginTop: "0.4rem",
              marginBottom: "0.4rem",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: `${light}`,
              },
            }}
          >
            <FlexContainer>
              <FlexContainer gap={"0.2rem"} marginBottom={"0.2rem"}>
                <ProfilePicture
                  image={friend?.friend?.profilePicture}
                  size="25px"
                />
                <Typography
                  color={dark}
                  variant="h6"
                  sx={{ textTransform: "capitalize" }}
                >
                  {friend?.friend?.firstName + " " + friend?.friend?.lastName}
                </Typography>
              </FlexContainer>
              {!lastMessage.seen && (
                <Badge
                  color="error"
                  variant="dot"
                  sx={{ marginRight: "10px" }}
                />
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
