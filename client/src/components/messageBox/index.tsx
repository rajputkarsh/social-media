import { Divider, IconButton, InputBase, Typography } from "@mui/material";
import { useRef, useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import FlexContainer from "../../containers/flexContainer";
import WidgetContainer from "../../containers/widgetContainer"
import { useTheme } from "@mui/material";
import { Send } from "@mui/icons-material";
import { CustomTheme, ReduxState } from "../../interfaces";
import ProfilePicture from "../profilePicture";
import { URL } from "../../constants";
import css from './messageBox.module.scss';
import { toast } from "react-toastify";
import { setMessages } from "../../state";

function MessageBox({ friendId }: {friendId: string | undefined | null}) {
  
  const dispatch = useDispatch();
  const messages = useSelector((state: ReduxState) => state?.chatMessages);
  const friends  = useSelector((state: ReduxState) => state?.friends);
  const token    = useSelector((state: ReduxState) => state?.user?.token);
  const widgetRef     = useRef<HTMLElement | null>(null);
  const chatWindowRef = useRef<HTMLDivElement | null>(null);
  const inputRef      = useRef<HTMLInputElement | null>(null);
  const [topOffset, setTopOffset]   = useState<number>(0);
  const [friendInfo, setFriendInfo] = useState<{[key: string]: any} | null>(null);
  const { palette }: { palette: CustomTheme } = useTheme();

  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const light = palette.neutral.light;

  const primary = palette.primary.main;

  let previouslyPressedKey: string = '';

  const getLastChatMessageTime = (): string => {
    if( !messages[friendId as string] || messages[friendId as string].length < 1) return '';
    const hours: number = (new Date().getTime() - new Date(messages[friendId as string][0]?.createdAt).getTime()) / 60000; 
    return 'Last Message: ' + (Math.round(hours) > 0 ? `${Math.round(hours)}h ago` : `${Math.round(hours * 60)}mins ago`);
  };
  
  useEffect(() => {
    chatWindowRef.current?.scrollBy(0, chatWindowRef.current?.scrollHeight);

  }, [messages]);

  useEffect(() => {

    setTopOffset(widgetRef?.current?.offsetTop || 0);

    if(Array.isArray(friends) && friends?.length > 0){
      const currentChatFriend = friends.filter((friend) => friend?.friend?._id == friendId);
      if(currentChatFriend.length > 0) setFriendInfo((prev) => currentChatFriend[0]?.friend);
    }

    async function updateMessages(){
      if(friendId){

        // mark messages as seen
        await fetch(URL.MARK_MESSAGE_SEEN(friendId),{
          method: 'PATCH',
          headers: { Authorization: `Bearer ${token}` },
        });
  
        // get messages
        fetch(URL.LIST_ALL_MESSAGES(friendId), {  
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },      
        }).then((response) => {
          if(response.status == 200){
            response.json().then((data) => {
              dispatch(setMessages({chatMessages: {...messages, [friendId as string]: data.data?.data}}));
            })
          } else{
            console.log('Something went wrong');
          }
        });
      }
    }

    updateMessages();

  }, [friendId]);

  let errorMessage = (!friendId) ? 'Please select a chat to continue' : '';
  errorMessage = (!errorMessage && !friendInfo) ? 'Unable to load user information' : errorMessage;

  const handleSubmit = () => {
    if (inputRef?.current ){
      const currentText = inputRef.current.value?.trim();
      inputRef.current.value = '';

      if(!currentText || !currentText.length) return;

      const formData = new FormData();
      formData.append('message', currentText);
      formData.append('media', ''); // TODO: Add support to send media in chat
      formData.append('receiver', friendId as string);

      fetch(URL.SEND_MESSAGE(), {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      }).then((response) => {
        if(response.status === 200){
          response.json().then((data) => {
            const newMessage = data.data as unknown as {[key: string]: any};
            let previousMessages = JSON.parse(JSON.stringify(messages[friendId as string])) || [];
            previousMessages.unshift(newMessage);
            dispatch(setMessages({chatMessages: {...messages, [friendId as string]: previousMessages}}));
          });
        } else{
          toast.error('Something went wrong');
        }
      });
    }
  }

  const handleInputChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const currentlyPressedKey: string = e.key;

    if(
      (previouslyPressedKey !== 'Shift' && currentlyPressedKey === 'Enter') ||
      (previouslyPressedKey === 'Enter' && currentlyPressedKey !== 'Shift')
    ){
      handleSubmit();
    }

    previouslyPressedKey = currentlyPressedKey;
  }

  if (errorMessage){
    return (
      <WidgetContainer ref={widgetRef} height={`calc(95vh - ${topOffset}px)`} overflow={'auto'} display={'flex'} flexDirection={'column'}>
        <FlexContainer justifyContent={'center !important'}>
          <Typography variant='h4'>
            {errorMessage}
          </Typography>
        </FlexContainer>
      </WidgetContainer>
    )
  }

  return (
    <WidgetContainer ref={widgetRef} height={`calc(95vh - ${topOffset}px)`} overflow={'auto'} display={'flex'} flexDirection={'column'}>
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
          {getLastChatMessageTime()}
        </FlexContainer>
      </FlexContainer>

      <Divider />

        {
          (!messages[friendId as string] || !messages[friendId as string].length) && (
            <FlexContainer justifyContent={'center !important'} height={'100% !important'} alignItems={'center !important'}>
              <Typography variant='h5'>
                No Chat Found!
              </Typography>            
            </FlexContainer>
          )
        }
        {
          (messages[friendId as string] && messages[friendId as string].length) > 0 && (
            <div className={css.chatWindow} ref={chatWindowRef}>
              {
                messages[friendId as string].slice(0).reverse().map((message: {[key: string]: any}, index: number) => (
                  <FlexContainer key={`${friendId}_chat_${index}`} className={css.chatBox + " " + ((message?.sender == friendId )? css.friendMessage : css.userMessage)} >
                    <Typography variant='subtitle1' sx={{border: `1px solid ${medium}`}}>
                      { message?.message }
                    </Typography>
                  </FlexContainer>
                ))     
              }
            </div>
          )
        }

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