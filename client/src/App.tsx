
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Profile  from './pages/profile';
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { ReduxState } from './interfaces';

function App() {

  const mode = useSelector((state: ReduxState) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode as PaletteMode)), [mode]);
  const isAuth = Boolean(useSelector((state: ReduxState) => state.token));

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/home"
              element={isAuth ? <Home /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/"
              element={isAuth ? <Profile /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <Profile /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
