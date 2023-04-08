import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Menu as MenuHolder,
} from "@mui/material";
import {
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout, setNotifications } from "../../state";
import { useNavigate } from "react-router-dom";
import FlexContainer from "../../containers/flexContainer";
import { CustomTheme, ReduxState } from "../../interfaces";
import { SETTINGS, URL } from "../../constants";
import SearchBar from "../widgets/searchBar";
import NotificationList from "../notificationList";
import { useContext } from "react";
import SocketContext from "../../context/socket";

const Navbar = () => {

  const socketInstance = useContext(SocketContext);

  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState<boolean>(false);
  const [notificationMenuAnchor, setNotificationMenuAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(notificationMenuAnchor);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: ReduxState) => state.user);
  const token = useSelector((state: ReduxState) => state.user?.token);
  const notifications = useSelector((state: ReduxState) => state.notifications);
  const isNonMobileScreens: boolean = useMediaQuery("(min-width: 1000px)");

  const { palette } : { palette: CustomTheme } = useTheme();
  const neutralLight = palette.neutral.light;
  const dark = palette.neutral.dark;
  const background = palette.background.default;
  const alt = palette.background.alt;

  useEffect(() => {
    fetch(URL.LIST_NOTIFICATIONS(), {  
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },      
    }).then((response) => {
      if(response.status == 200){
        response.json().then((data) => {
          dispatch(setNotifications({notifications: data.data?.data}));
        })
      } else{
        console.log('Something went wrong');
      }
    })
  }, []);

  const handleLogout = () => {
    dispatch(setLogout());
    navigate('/')
  }

  socketInstance.on('NOTIFICATION', (notification: {[key: string]: any}) => {
    const previousNotifications: Array<{[key: string]: any}> = JSON.parse(JSON.stringify(notifications)) || [];
    previousNotifications.unshift(notification.data);
    dispatch(setNotifications(previousNotifications));
  })

  const handleNotificationMenuButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setNotificationMenuAnchor(event.currentTarget);
  };
  const handleNotificationMenuClose = () => {
    setNotificationMenuAnchor(null);
  };  

  const NotificationMenu = () => (
    <MenuHolder
      id="notification-menu"
      anchorEl={notificationMenuAnchor}
      open={open}
      onClose={handleNotificationMenuClose}
      MenuListProps={{
        'aria-labelledby': 'notification-button',
      }}
      sx={{maxHeight: '40vh'}}
    >
      <NotificationList/>
    </MenuHolder>    
  );

  return (
    <FlexContainer sx={{ padding: "1rem 6%", backgroundColor: alt }}>
      <FlexContainer gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/")}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          { SETTINGS.APP_NAME }
        </Typography>
      </FlexContainer>

      {isNonMobileScreens && (
        <SearchBar />
      )}

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexContainer gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton onClick={() => navigate('/messages')}>
            <Message sx={{ fontSize: "25px" }} />
          </IconButton>
          <IconButton
            id="notification-button"
            aria-controls={open ? 'notification-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleNotificationMenuButtonClick}
          >
            <Notifications sx={{ fontSize: "25px" }} />
          </IconButton>
          <NotificationMenu />
          <FormControl variant="standard">
            <Select
              value={`${user?.firstName} ${user?.lastName}`}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={`${user?.firstName} ${user?.lastName}`}  onClick={() => {
                  navigate(`/profile/${user?.userId}`);
                  navigate(0);
                }}>
                <Typography>{`${user?.firstName} ${user?.lastName}`}</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleLogout()}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexContainer>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (

        <Box sx={{
          position:"fixed",
          right:"0",
          bottom:"0",
          height:"100%",
          zIndex:"10",
          maxWidth:"500px",
          minWidth:"150px",
          backgroundColor:{background},
        }}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexContainer
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <IconButton onClick={() => navigate('/messages')}>
              <Message sx={{ fontSize: "25px" }} />
            </IconButton>
            <IconButton
              id="notification-button"
              aria-controls={open ? 'notification-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleNotificationMenuButtonClick}
            >
              <Notifications sx={{ fontSize: "25px" }} />
            </IconButton>
            <NotificationMenu />
            <FormControl variant="standard">
              <Select
                value={`${user?.firstName} ${user?.lastName}`}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={`${user?.firstName} ${user?.lastName}`} onClick={() => {
                  navigate(`/profile/${user?.userId}`);
                  navigate(0);
                }}>
                  <Typography>{`${user?.firstName} ${user?.lastName}`}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexContainer>
        </Box>
      )}
    </FlexContainer>
  );
};

export default Navbar;
