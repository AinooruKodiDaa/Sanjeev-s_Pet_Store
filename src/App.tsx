import {
  BrowserRouter as Router,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import {
  CalendarMonth,
  Dashboard,
  LocalHospital,
  PersonAdd,
  Place,
  TrendingUp,
} from "@mui/icons-material";
import "./App.css";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import ReportPage from "./pages/LandingPage";
import LayoutOne from "./layouts/LayoutOne";
import LoginPage from "./pages/LoginPage";
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import {
  AuthProvider,
  NavTabProvider,
  ThemeContextProvider,
  useAuth,
  useThemeContext,
} from "./contexts";
import { useUniqueId } from "./hooks";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignupPage from "./pages/SignupPage";
import Navbar from "./components/ui/Navbar";
import { ModalProvider } from "./contexts/modalContextProvider";
import { ProtectedRoute } from "./components/specific/ProtectedRoute";
import CustomerDashboardPage from "./pages/CustomerDashboardPage";
import LandingPage from "./pages/LandingPage";

function App() {
  /**theme context */
  const { theme, mode } = useThemeContext();

  /**uuid*/
  const uniqueId = useUniqueId("path-");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavTabProvider>
        <Navbar />

        <Container
          sx={{ paddingBlock: 2, margin: "0 auto", maxWidth: "90rem" }}
        >
          <ToastContainer
            hideProgressBar={true}
            pauseOnHover
            position="bottom-right"
            autoClose={4000}
            theme={mode}
          />
          <Box sx={{ display: { sm: "none" } }}>
            Responsiveness development in progress
          </Box>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route
                path="/adminDashboard"
                element={
                  <ProtectedRoute>
                    <ModalProvider>
                      <AdminDashboardPage />
                    </ModalProvider>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customerDashboard"
                element={
                  <ProtectedRoute>
                    <ModalProvider>
                      <CustomerDashboardPage />
                    </ModalProvider>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </Container>
      </NavTabProvider>
    </ThemeProvider>
  );
}

export default App;
