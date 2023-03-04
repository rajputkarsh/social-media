
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Profile  from './pages/profile';
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { ReduxState } from './interfaces';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchInterceptor } from './interceptors';

function App() {

  fetchInterceptor();

  const mode = useSelector((state: ReduxState) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode as PaletteMode)), [mode]);
  const isAuth = Boolean(useSelector((state: ReduxState) => state?.user?.token));

  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={isAuth ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile/"
              element={isAuth ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <Profile /> : <Navigate to="/login" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
