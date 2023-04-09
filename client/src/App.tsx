
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Profile  from './pages/profile';
import Messages from './pages/messages';
import { useContext, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { ReduxState } from './interfaces';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchInterceptor } from './interceptors';
import SocketContext from './context/socket';

function App() {

  fetchInterceptor();

  const socketInstance = useContext(SocketContext);
  const mode = useSelector((state: ReduxState) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode as PaletteMode)), [mode]);
  const isAuth = Boolean(useSelector((state: ReduxState) => state?.user?.token));
  const user = useSelector((state: ReduxState) => state.user);

  useEffect(() => {
    if(user?.userId){
      socketInstance.emit('join', user.userId);
    }  
  }, []);  

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
            <Route
              path="/messages"
              element={isAuth ? <Messages /> : <Navigate to="/login" />}
            />
            <Route
              path="/messages/:friendId"
              element={isAuth ? <Messages /> : <Navigate to="/login" />}
            />
            <Route 
              path="*"
              element={isAuth ? <Home /> : <Navigate to="/login" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
