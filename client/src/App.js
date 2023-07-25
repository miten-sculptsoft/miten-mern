import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./component/Signup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Login from "./component/Login";
import { ToastContainer } from "react-toastify";
import ResetPassword from "./component/ResetPassword";
import PageNotFound from "./component/PageNotFound";
import ForgotPassword from "./component/ForgotPassword";
import Dashboard from "./component/Dashboard";
import Analytics from "./component/Analytics";
import NavBar from "./component/NavBar";
import ProtectedRoutes from "./component/ProtectedRoutes";
import CreateeCard from "./component/CreateeCard";
import Billing from "./component/Billing";
import ConfirmOrder from "./component/ConfirmOrder";
import PaymentSuccess from "./component/PaymentSuccess";
import EditeCard from "./component/EditeCard";
import ViewCard from "./component/ViewCard";

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
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<ProtectedRoutes Component={NavBar} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/add" element={<CreateeCard />} />
          <Route path="/edit/:name/:id" element={<EditeCard />} />
          <Route path="/view/:name/:id" element={<ViewCard />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/confirm-order" element={<ConfirmOrder />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
