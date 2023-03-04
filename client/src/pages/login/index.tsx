import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setLogout } from "../../state";
import { CustomTheme, ReduxState } from "../../interfaces";
import { SETTINGS, URL } from "../../constants";
import { toast } from "react-toastify";

const Login = () => {

  const userInfo = useSelector((state: ReduxState) => state.user);
  const [searchParams, setSearchParams] = useSearchParams();

  // validate if a legit user is already logged in
  useEffect(() => {
    if(userInfo && Object.keys(userInfo).length > 0 && userInfo?.token ){
      fetch(
        URL.VALIDATE_TOKEN(),
        {
          headers: {authorization: `Bearer ${userInfo?.token}`},
          method: "POST",
        }
      ).then(response => {
        response.json().then((data) => {
          if(data.status == 200 && data.data.isValid == true){
            navigate('/');
          } else{
            dispatch(setLogout())
          }
        })
      })
    }
  }, []);

  const { palette }: { palette: CustomTheme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const loginSchema = yup.object().shape({
    userIdentifier: yup.string().required("required"),
    password: yup.string().required("required"),
  });

  const initialLoginValues = {
    userIdentifier: "",
    password: "",
  };

  const login = async (values: typeof initialLoginValues) => {
    const loggedInResponse = await fetch(URL.LOGIN(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();

    if (loggedIn.status !== 200) {
      toast.error(loggedIn.message);
      return;
    }

    dispatch(
      setLogin({
        userId        : loggedIn.data?.userId,
        userName      : loggedIn.data?.userName,
        token         : loggedIn.data?.token,
        firstName     : loggedIn.data?.firstName,
        lastName      : loggedIn.data?.lastName,
        email         : loggedIn.data?.email,
        location      : loggedIn.data?.location,
        occupation    : loggedIn.data?.occupation,
        profilePicture: loggedIn.data?.profilePicture,
        friends       : loggedIn.data?.friends
      })
    );

    // check if there is a redirect url before redirecting
    const redirectUrl: string | null = searchParams.get('redirect');
    if(redirectUrl){
      navigate(redirectUrl);
    } else{
      navigate("/");
    }

  };

  const handleFormSubmit = async (values: typeof initialLoginValues) => {
    await login(values);
  };

  const formik = useFormik({
    initialValues: initialLoginValues,
    onSubmit: handleFormSubmit,
    validationSchema: loginSchema,
  });

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          p: "1rem 6%",
          textAlign: "center",
          backgroundColor: palette.background.alt,
        }}
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          {SETTINGS.APP_NAME}
        </Typography>
      </Box>

      <Box
        sx={{
          width: isNonMobileScreens ? "50%" : "93%",
          p: "2rem",
          m: "2rem auto",
          borderRadius: "1.5rem",
          backgroundColor: palette.background.alt,
        }}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          {SETTINGS.LOGIN.HEADING}
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              label="Email/ Username"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.userIdentifier}
              name="userIdentifier"
              error={
                Boolean(formik.touched.userIdentifier) && Boolean(formik.errors.userIdentifier)
              }
              helperText={formik.touched.userIdentifier && formik.errors.userIdentifier}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              name="password"
              error={
                Boolean(formik.touched.password) &&
                Boolean(formik.errors.password)
              }
              helperText={formik.touched.password && formik.errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              LOGIN
            </Button>
            <Typography
              onClick={() => {
                navigate("/register");
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              Don't have an account? Sign Up here.
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
