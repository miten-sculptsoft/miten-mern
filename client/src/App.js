import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./component/Signup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Login from "./component/Login";
import { ToastContainer } from "react-toastify";
import ResetPassword from "./component/ResetPassword";
import PageNotFound from "./component/PageNotFound";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ["Poppins"].join(","),
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/registration" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
