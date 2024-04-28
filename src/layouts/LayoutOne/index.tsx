import React, { ReactNode } from "react";
import { Box, Container, Toolbar } from "@mui/material";
import { drawerWidth } from "../../consts";
import Navbar from "../../components/ui/Navbar";
import Sidebar from "../../components/ui/Sidebar";

interface LayoutOneProps {
  children: ReactNode;
  handleDrawerToggle: () => void;
  mobileOpen: boolean;
  handleDrawerTransitionEnd: () => void;
  handleDrawerClose: () => void;
  drawerListItems: any[] | React.ReactElement; // Adjust the type according to your drawerListItems
}

const LayoutOne: React.FC<LayoutOneProps> = ({
  children,
  handleDrawerToggle,
  mobileOpen,
  handleDrawerTransitionEnd,
  handleDrawerClose,
  drawerListItems,
}) => {
  return (
    <>
      <Navbar />
      {/* <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerTransitionEnd={handleDrawerTransitionEnd}
        handleDrawerClose={handleDrawerClose}
        drawerListItems={drawerListItems}
      />     <Toolbar /> */}
      <Container
        sx={{ padding: 2, margin: "0 auto", maxWidth: "90rem" }}
        // sx={{
        //   padding: 2,
        //   marginLeft: { sm: `${drawerWidth}px` },
        //   display: "flex",
        // }}
      >
        {children}
      </Container>
    </>
  );
};

export default LayoutOne;
