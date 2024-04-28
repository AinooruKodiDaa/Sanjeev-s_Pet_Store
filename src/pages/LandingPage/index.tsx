import { Box, Toolbar, Typography } from "@mui/material";
import { Button } from "../../components/ui";
import { useNavigate } from "react-router-dom";
import { Pets } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <video
          autoPlay
          muted
          loop
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -1,
          }}
        >
          <source src="/videos/sampleDogVideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>


        <Box
          sx={{
            mt: 4,
            p: 3,
            borderRadius: "50px",
            background: "rgba(0,0,0,0.4)",
          }}
        >
          <Typography color="white" variant="h2" gutterBottom>
            Welcome to PetSmart Connect
          </Typography>
          <Typography color="white" variant="h6" sx={{ mb: 4 }}>
            We offer a wide range of pets and pet supplies.
          </Typography>
          {/* <Typography color="white" variant="h6" sx={{ mb: 4 }}>
        {`Login with { username: sanjeev123 ,  password: Sanjeev@123 } for Admin role`}
        </Typography>
        <Typography color="white" variant="h6" sx={{ mb: 4 }}>
        {`Login with { username: customer123 ,  password: Customer@123 } for Customer role`}
        </Typography> */}
          <Typography color="white" variant="h6" sx={{ mb: 4 }}>
            developed by - Sanjeev Gunasekaran
          </Typography>

          <Button
          size="small"
            tooltip="Development in progress"
            variant="contained"
            color="primary"
            onClick={() => {
              toast.success("Something");
            }}
          >
            Shop Now
          </Button>
        </Box>
      </Box>
      {/* <Box
        sx={{
          width: "100%",
          height: "100%",
          background: "#d9d9d9",
          textAlign: "center",
        }}
      >
        {`Some more content here (Development in progress)`}
      </Box> */}
    </>
  );
};

export default LandingPage;
