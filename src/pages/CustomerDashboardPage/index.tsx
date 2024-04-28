import { Box, Paper, Toolbar } from "@mui/material";
import { PetsComponent } from "../../components/specific";
import {Typography} from "../../components/ui";

const CustomerDashboardPage = () => {
  const userData = JSON.parse(sessionStorage.getItem("user") as any);
  return (
    <Box sx={{ width: "100%" }}>
       <Typography marginBottom={2} variant="h6" component="h6">{`Welcome ${userData?.username}!`}</Typography>
      <Box component={Paper} padding={2} marginBottom={2} elevation={4}>
        <PetsComponent role={userData.role}/>
      </Box>
    </Box>
  );
};
export default CustomerDashboardPage;
