import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexContainer from "../../../containers/flexContainer";
import Dropzone from "react-dropzone";
import ProfilePicture from "../../profilePicture";
import WidgetContainer from "../../../containers/widgetContainer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../../state";
import { CustomResponseBody, CustomTheme, ReduxState } from "../../../interfaces";
import { MESSAGES, URL } from "../../../constants";
import { uploadFile } from "../../../utils";
import { toast } from "react-toastify";

const AddPost = () => {

  const dispatch = useDispatch();
  const postList = useSelector((state: ReduxState) => state.posts);
  const [isFile, setIsFile] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<string>("");
  const [post, setPost] = useState("");
  const { palette } : { palette: CustomTheme } = useTheme();
  const userInfo = useSelector((state: ReduxState) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("postedBy", userInfo?.userId);
    formData.append("text", post);
    if (file) {

      // upload picture
      const apiResponse = await uploadFile(file);
      const mediaResponse: CustomResponseBody = await apiResponse.json();

      if (mediaResponse.status !== 200) {
        toast.error(mediaResponse.message);
        return;
      }

      formData.append("media", mediaResponse.data?.url);
    }

    const response = await fetch(URL.ADD_POST(), {
      method: "POST",
      headers: { Authorization: `Bearer ${userInfo?.token}` },
      body: formData,
    });

    const posts = await response.json();

    if(posts.status !== 200){
      toast.error(posts.message);
      return;
    }

    dispatch(setPosts({posts: [  ...posts.data?.data, ...postList ]}));
    setFile(null);
    setPost("");

    toast.success(MESSAGES.SUCCESS.POSTED_SUCCESSFULLY);
  };

  return (
    <WidgetContainer>
      <FlexContainer gap="1.5rem">
        <ProfilePicture image={userInfo?.profilePicture} size={'60px'}/>
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexContainer>
      {isFile && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            multiple={false}
            onDrop={(acceptedFiles) => setFile((prev) => acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexContainer>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!file ? (
                    <p>Add {fileType} Here</p>
                  ) : (
                    <FlexContainer>
                      <Typography>{file.name}</Typography>
                      <EditOutlined />
                    </FlexContainer>
                  )}
                </Box>
                {file && (
                  <IconButton
                    onClick={() => setFile((prev) => null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexContainer>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexContainer>
        <FlexContainer gap="0.25rem" onClick={() => setIsFile(!isFile)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            onClick={() => {setFileType('Image')}}
          >
            Image
          </Typography>
        </FlexContainer>

        {isNonMobileScreens ? (
          <>
            <FlexContainer gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography
                color={mediumMain}
                sx={{ "&:hover": { cursor: "pointer", color: medium } }}
                onClick={() => {setFileType('Clip')}}
              >
                Clip
              </Typography>
            </FlexContainer>

            <FlexContainer gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography
                color={mediumMain}
                sx={{ "&:hover": { cursor: "pointer", color: medium } }}
                onClick={() => {setFileType('Attachment')}}
              >
                Attachment
              </Typography>
            </FlexContainer>

            <FlexContainer gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography
                color={mediumMain}
                sx={{ "&:hover": { cursor: "pointer", color: medium } }}
                onClick={() => {setFileType('Audio')}}
              >
                Audio
              </Typography>
            </FlexContainer>
          </>
        ) : (
          <FlexContainer gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexContainer>
        )}

        <Button
          disabled={!post}
          onClick={handlePost}
          variant='outlined'
          sx={{
            color: `${palette.text.primary} !important`,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexContainer>
    </WidgetContainer>
  );
};

export default AddPost;