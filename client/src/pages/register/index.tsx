import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import { useFormik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import FlexContainer from "../../containers/flexContainer";
import { setLogin, setLogout } from "../../state";
import { uploadFile } from "../../utils";
import { CustomTheme, ReduxState, CustomResponseBody } from "../../interfaces";
import { MESSAGES, REGEX, SETTINGS, URL } from "../../constants";

function Register(){

  // validate if a legit user is already logged in
  const userInfo = useSelector((state: ReduxState) => state);
  useEffect(() => {
    if(Object.keys(userInfo).length > 0 && userInfo?.user?.token ){
      fetch(
        URL.VALIDATE_TOKEN,
        {
          headers: {authorization: `Bearer ${userInfo?.user?.token}`},
          method: "POST",
        }
      ).then(response => {
        response.json().then((data) => {
          if(data.status == 200 && data.data.isValid == true){
            navigate('/');
          } else{
            dispatch(setLogout());
          }
        })
      })
    }
  }, []);

  const { palette }: { palette: CustomTheme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    userName: yup.string().required("required"),
    email: yup.string().email("Invalid Email").required("required"),
    password: yup
      .string()
      .matches(REGEX.PASSWORD, MESSAGES.VALIDATION.INVALID_PASSWORD)
      .required("required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required"),
  });

  const initialValuesRegister = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    occupation: "",
    picture: new File([""], ""),
  };

  const register = async (values: typeof initialValuesRegister) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (let [key, value] of Object.entries(values)) {
      formData.append(key, value);
    }

    formData.delete("confirmPassword");

    // upload picture
    const apiResponse = await uploadFile(values.picture);
    const profilePicture: CustomResponseBody = await apiResponse.json();

    if (profilePicture.status !== 200) {
      toast.error(profilePicture.message);
      return;
    }

    formData.append("profilePicture", profilePicture.data?.url);

    const savedUserResponse = await fetch(
      URL.REGISTER,
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser: CustomResponseBody = await savedUserResponse.json();

    if (savedUser.status !== 200) {
      toast.error(savedUser.message);
      return;
    }

    dispatch(
      setLogin({
        userName: savedUser.data?.userName,
        token   : savedUser.data?.token,
      })
    );    

    navigate("/");
  };

  const handleFormSubmit = async (values: typeof initialValuesRegister) => {
    await register(values);
  };

  const formik = useFormik({
    initialValues: initialValuesRegister,
    onSubmit: handleFormSubmit,
    validationSchema: registerSchema,
  });
  


  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          backgroundColor: palette.background.alt,
          p: "1rem 6%",
          textAlign: "center",
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
          {SETTINGS.REGISTER.HEADING}
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
              label="First Name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.firstName}
              name="firstName"
              error={
                Boolean(formik.touched.firstName) &&
                Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Last Name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.lastName}
              name="lastName"
              error={
                Boolean(formik.touched.lastName) &&
                Boolean(formik.errors.lastName)
              }
              helperText={formik.touched.lastName && formik.errors.lastName}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="User Name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.userName}
              name="userName"
              error={
                Boolean(formik.touched.userName) &&
                Boolean(formik.errors.userName)
              }
              helperText={formik.touched.userName && formik.errors.userName}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              name="email"
              error={
                Boolean(formik.touched.email) && Boolean(formik.errors.email)
              }
              helperText={formik.touched.email && formik.errors.email}
              sx={{ gridColumn: "span 2" }}
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
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Confirm Password"
              type="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              name="confirmPassword"
              error={
                Boolean(formik.touched.confirmPassword) &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Location"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.location}
              name="location"
              error={
                Boolean(formik.touched.location) &&
                Boolean(formik.errors.location)
              }
              helperText={formik.touched.location && formik.errors.location}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Occupation"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.occupation}
              name="occupation"
              error={
                Boolean(formik.touched.occupation) &&
                Boolean(formik.errors.occupation)
              }
              helperText={formik.touched.occupation && formik.errors.occupation}
              sx={{ gridColumn: "span 2" }}
            />
            <Box
              gridColumn="span 4"
              border={`1px solid ${palette.neutral.medium}`}
              borderRadius="5px"
              p="1rem"
            >
              <Dropzone
                accept={{
                  "image/png": [".png"],
                  "image/jpg": [".jpg"],
                  "image/jpeg": [".jpeg"],
                }}
                multiple={false}
                onDrop={(acceptedFiles) =>
                  formik.setFieldValue("picture", acceptedFiles[0])
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!formik.values.picture.name ? (
                      <p>Add Picture Here</p>
                    ) : (
                      <FlexContainer>
                        <Typography>{formik.values.picture.name}</Typography>
                        <EditOutlined />
                      </FlexContainer>
                    )}
                  </Box>
                )}
              </Dropzone>
            </Box>
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
              REGISTER
            </Button>
            <Typography
              onClick={() => {
                navigate("/login");
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
              Already have an account? Login here.
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Register;