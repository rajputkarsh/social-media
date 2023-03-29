import { Divider, IconButton, InputBase, Typography } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FlexContainer from "../../containers/flexContainer";
import WidgetContainer from "../../containers/widgetContainer"
import { useTheme } from "@mui/material";
import { Send } from "@mui/icons-material";
import { CustomTheme, ReduxState } from "../../interfaces";
import ProfilePicture from "../profilePicture";
import * as moment from 'moment-timezone';

function MessageBox({ friendId }: {friendId: string | undefined | null}) {
  
  const userInfo = useSelector((state: ReduxState) => state?.user);
  const friends  = useSelector((state: ReduxState) => state?.friends);
  const token    = useSelector((state: ReduxState) => state?.user?.token);
  const [topOffset, setTopOffset]       = useState<number>(0);
  const [friendInfo, setFriendInfo]     = useState<{[key: string]: any} | null>(null);
  const[messages, setMessages]          = useState<Array<{[key: string]: any}>>([]);
  const divRef   = useRef<HTMLElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { palette }: { palette: CustomTheme } = useTheme();

  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const light = palette.neutral.light;

  const primary = palette.primary.main;

  let previouslyPressedKey: string = '';
  let previouslyPressedKeyTime: number = 0;

  // const getLastChatMessage = (
  //   userId: string
  // ): { message: string; time: string; seen: boolean } => {
  //   let lastMessage = lastMessages.filter((lastMessage) =>
  //     lastMessage?.chatId?.includes(userId)
  //   );
  //   if (lastMessage.length > 1) lastMessage = lastMessage.sort((obj1, obj2) => new Date(obj2?.createdAt).getTime() - new Date(obj1?.createdAt).getTime()).splice(0, 1);
  //   const hours = (moment().utc().diff(moment(lastMessage[0]?.createdAt)))/3600000;

  //   return {
  //     message: lastMessage[0]?.media ? "Media" : lastMessage[0]?.message,
  //     time: Math.round(hours) > 0 ? `${Math.round(hours)}h ago` : `${Math.round(hours * 60)} mins ago`,
  //     seen: userId == user?.userId || lastMessage[0]?.status == 'SEEN',
  //   };
  // };
  
  useEffect(() => {
    setTopOffset(divRef?.current?.offsetTop || 0);
  }, []);

  useEffect(() => {
    if(Array.isArray(friends) && friends?.length > 0){
      const currentChatFriend = friends.filter((friend) => friend?.friend?._id == friendId);
      if(currentChatFriend.length > 0) setFriendInfo((prev) => currentChatFriend[0]?.friend);
    }
  }, [friendId]);

  let errorMessage = (!friendId) ? 'Please select a chat to continue' : '';
  errorMessage = (!errorMessage && !friendInfo) ? 'Unable to load user information' : errorMessage;

  const handleSubmit = () => {
    if (inputRef?.current ){
      const currentText = inputRef.current.value;
      inputRef.current.value = '';

      //TODO:  trigger send message API
    }
  }

  const handleInputChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const currentlyPressedKey: string = e.key;
    const currentlyPressedKeyTime: number = new Date().getTime();

    // TODO: check if time logic is required or something else can be done

    if(
      (previouslyPressedKey !== 'Shift' && currentlyPressedKey === 'Enter') ||
      (previouslyPressedKey === 'Enter' && currentlyPressedKey !== 'Shift')
    ){
      handleSubmit();
    }

    previouslyPressedKey = currentlyPressedKey;
    previouslyPressedKeyTime = currentlyPressedKeyTime;
  }

  if (errorMessage){
    return (
      <WidgetContainer ref={divRef} height={`calc(95vh - ${topOffset}px)`} overflow={'auto'} display={'flex'} flexDirection={'column'}>
        <FlexContainer justifyContent={'center !important'}>
          <Typography variant='h4'>
            {errorMessage}
          </Typography>
        </FlexContainer>
      </WidgetContainer>
    )
  }

  return (
    <WidgetContainer ref={divRef} height={`calc(95vh - ${topOffset}px)`} overflow={'auto'} display={'flex'} flexDirection={'column'}>
      <FlexContainer marginBottom={'0.6rem'} >
        <FlexContainer gap='2rem'>
          <ProfilePicture
            image={friendInfo?.profilePicture}
            size="45px"
          /> 
          <Typography
            color={dark}
            variant="h4"
            sx={{ textTransform: "capitalize" }}
          >
            {friendInfo?.firstName + " " + friendInfo?.lastName}
          </Typography>
        </FlexContainer>   
        <FlexContainer gap='2rem'>
          Last Message: X mins ago
        </FlexContainer>
      </FlexContainer>

      <Divider />

      {/* messages here */}
      <div>

      </div>

      <FlexContainer gap='1rem' marginTop='auto'>
        <InputBase
            placeholder="Type your message here..."
            onKeyUp={handleInputChange}
            multiline={true}
            inputRef={inputRef}
            sx={{
              width:'100%',
              backgroundColor: light,
              borderRadius: "2rem",
              padding: "1rem 2rem",
            }}
          />
          <IconButton onClick={handleSubmit}>
            <Send sx={{color: primary, fontSize:'1.7rem'}} />
          </IconButton>
      </FlexContainer>

    </WidgetContainer>
  )
}

export default MessageBox