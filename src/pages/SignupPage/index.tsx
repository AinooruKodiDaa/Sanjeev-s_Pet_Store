import { Box, Button, Paper, Typography } from "@mui/material";
import { SignupComponent } from "../../components/specific";
import { useLanguage } from "../../contexts";
import { FormattedMessage } from "react-intl";

interface SignupPageProps {}

const SignupPage: React.FC<SignupPageProps> = () => {
  const { language, changeLanguage } = useLanguage();

  return (
    <Box component="div">
      <Box
        component={Paper}
        sx={{
          textAlign: "center",
          margin: "auto",
          transform: "translateY(20%)",
          maxWidth: "600px",
          padding: 3,
        }}
        elevation={4}
      >
        <SignupComponent />
      </Box>
      
    </Box>
  );
};
export default SignupPage;
