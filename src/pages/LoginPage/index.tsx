import { Box, Paper, Typography } from "@mui/material";
import { LoginComponent } from "../../components/specific";

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  return (
    <Box
    component={Paper}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "15px",
        borderRadius: "8px",
        width: "100%",
        maxWidth: "600px",
        margin: "auto",
        transform: "translateY(50%)",
      }}
    >
 
      <LoginComponent />
    </Box>
  );
};
export default LoginPage;
