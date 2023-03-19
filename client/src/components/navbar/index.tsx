import { useState } from "react";
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
} from "@mui/material";
import {
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../../state";
import { useNavigate } from "react-router-dom";
import FlexContainer from "../../containers/flexContainer";
import { CustomTheme, ReduxState } from "../../interfaces";
import { SETTINGS } from "../../constants";
import SearchBar from "../widgets/searchBar";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: ReduxState) => state.user);
  const isNonMobileScreens: boolean = useMediaQuery("(min-width: 1000px)");

  const { palette } : { palette: CustomTheme } = useTheme();
  const neutralLight = palette.neutral.light;
  const dark = palette.neutral.dark;
  const background = palette.background.default;
  const alt = palette.background.alt;

  const fullName = `${user?.firstName} ${user?.lastName}`;

  const handleLogout = () => {
    dispatch(setLogout());
    navigate('/')
  }

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
          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <FormControl variant="standard">
            <Select
              value={fullName}
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
              <MenuItem value={fullName}  onClick={() => {
                  navigate(`/profile/${user?.userId}`);
                  navigate(0);
                }}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleLogout()}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexContainer>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
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
          minWidth:"300px",
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
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard">
              <Select
                value={fullName}
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
                <MenuItem value={fullName} onClick={() => {
                  navigate(`/profile/${user?.userId}`);
                  navigate(0);
                }}>
                  <Typography>{fullName}</Typography>
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
