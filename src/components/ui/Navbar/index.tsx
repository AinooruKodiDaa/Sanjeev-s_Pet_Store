import React from "react";
import {
  AppBar,
  Badge,
  Box,
  Container,
  FormControlLabel,
  Menu,
  Popover,
  SimplePaletteColorOptions,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { drawerWidth } from "../../../consts";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AutoStories,
  Login,
  Logout,
  Notifications,
  Person,
  Pets,
  ShoppingCart,
} from "@mui/icons-material";
import { useThemeContext } from "../../../contexts";
import { StyledDarkLightSwitch } from "./styled";
import { Button, IconButton } from "../Button";
import { BrowserRouter, Navigate, Router } from "react-router-dom";

const Navbar: React.FC<any> = (props) => {
  /**theme context*/
  const { toggleColorMode, mode } = useThemeContext();

  const {} = props;

  const userData = JSON.parse(sessionStorage.getItem("user") as any);

  return (
    <AppBar position="sticky">
      <Container sx={{ margin: "auto", maxWidth: "90rem" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Pets />
            <Typography
              component="h6"
              fontWeight={700}
              textTransform="uppercase"
            >
              PetSmart Connect {userData?.role ? ` - ${userData?.role}` : null}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }} gap={1}>
            <StyledDarkLightSwitch
              value={mode}
              checked={mode === "dark" ? true : false}
              onChange={() => toggleColorMode()}
            />

            {userData && (
              <IconButton
                size="small"
                tooltip="Notifications (development in progress)"
               children={ <Notifications />}
              />
            )}
            {userData && (
              <IconButton
                size="small"
                tooltip="Logout"
                children={<Logout />}
                onClick={() => {
                  sessionStorage.removeItem("user");
                  setTimeout(() => {
                    window.location.href = "/";
                  }, 250);
                }}
             / >
             
            )}
            {!userData && (
              <IconButton
                size="small"
                tooltip="Log In"
                children={<Login />}
                onClick={() => {
                  sessionStorage.removeItem("user");
                  setTimeout(() => {
                    window.location.href = "/login";
                  }, 250);
                }}
              />
            )}
          </Box>
        </Toolbar>
      </Container>{" "}
    </AppBar>
  );
};

export default Navbar;
