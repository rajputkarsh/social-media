import { useLocation } from "react-router-dom";
import { Button, InputBase, useTheme } from '@mui/material';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FlexContainer from '../../../containers/flexContainer';
import { CustomTheme, ReduxState } from '../../../interfaces';
import { MESSAGES, URL } from "../../../constants";
import { toast } from 'react-toastify';
import { setPosts } from '../../../state';

function AddComment({postId}: {postId: string}) {

  const dispatch = useDispatch();
  const location = useLocation();
  const userInfo = useSelector((state: ReduxState) => state.user);
  const token = useSelector((state: ReduxState) => state.user?.token);
  const { palette } : { palette: CustomTheme } = useTheme();
  const [comment, setComment] = useState("");

  const handleComment = async () => {
    const formData = new FormData();
    formData.append("comment", comment);


    const response = await fetch(URL.ADD_COMMENT(postId), {
      method: "POST",
      headers: { Authorization: `Bearer ${userInfo?.token}` },
      body: formData,
    });

    const posts = await response.json();

    if(posts.status !== 200){
      toast.error(posts.message);
      return;
    }

    let responseUrl = URL.LIST_POST();
    if(location.pathname.includes('profile')){
      const urlParts = location.pathname.split('/');
      responseUrl = URL.LIST_USER_POST(urlParts[urlParts.length - 1]);
    }
    
    const postData = await fetch(
      responseUrl,
      {
        method: "GET",
        headers: {authorization: `Bearer ${token}`},
      }
    );
    
    const data = await postData.json();
    if(data.status !== 200){
      throw data.message;
    }

    dispatch(setPosts({ posts: data.data.data }));    
    setComment("");

    toast.success(MESSAGES.SUCCESS.COMMENTED_SUCCESSFULLY);
  };  

  return (
    <FlexContainer gap="0.5rem" padding={'0.3rem 0.3rem 0.3rem 0.3rem'}>
      <InputBase
          placeholder="Add new comment"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          sx={{
            width: "80%",
            backgroundColor: palette.neutral.light,
            borderRadius: "0.8rem",
            padding: "0rem 0.5rem",
          }}
        />
        <Button
          disabled={!comment}
          onClick={handleComment}
          size='small'
          variant='outlined'
          sx={{
            color: `${palette.text.primary} !important`,
            backgroundColor: palette.primary.main,
            borderRadius: "1rem",
          }}
        >
          POST
        </Button>        
    </FlexContainer>
  );
}

export default AddComment;
