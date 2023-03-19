import {
  ManageAccountsOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import ProfilePicture from '../../profilePicture';
import FlexContainer from "../../../containers/flexContainer";
import WidgetContainer from "../../../containers/widgetContainer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CustomTheme, ReduxState } from "../../../interfaces";
import { URL } from "../../../constants";

const UserInfo = ({userId}: {userId: string}) => {
  const token    = useSelector((state: ReduxState) => state.user?.token);
  const userInfo = useSelector((state: ReduxState) => state.user);
  const friends  = useSelector((state: ReduxState) => state.friends);
  const navigate = useNavigate();
  
  const { palette }: {palette: CustomTheme} = useTheme();
  
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  let user;
  if(userInfo?.userId == userId){
    user = userInfo;
  } else{
    // const userData = await fetch(URL.USER_INFO(userId),{
    //   method: 'GET',
    //   headers: { Authorization: `Bearer ${token}` },
    // })
  }

  if (!user) return <></>;

  const {
    profilePicture,
    firstName,
    lastName,
    location,
    occupation
  } = user;

  const profileViews=0, currentLevel = 0;

  return (
    <WidgetContainer>
      {/* FIRST ROW */}
      <FlexContainer
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexContainer gap="1rem">
          <ProfilePicture image={profilePicture} size={"60px"} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends?.length} friends</Typography>
          </Box>
        </FlexContainer>
        <ManageAccountsOutlined sx={{cursor: 'pointer'}} />
      </FlexContainer>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexContainer mb="0.5rem">
          <Typography color={medium}>Profile Views</Typography>
          <Typography color={main} fontWeight="500">
            {profileViews}
          </Typography>
        </FlexContainer>
        <FlexContainer>
          <Typography color={medium}>Current Level</Typography>
          <Typography color={main} fontWeight="500">
            {currentLevel}
          </Typography>
        </FlexContainer>
      </Box>

    </WidgetContainer>
  );
};

export default UserInfo;