import { Box} from "@mui/material";
import { Button } from "../Button";





const Fallback = ({ error, resetErrorBoundary }: any) => {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  console.log(error, "errorss");
  const handleRetry = () => {
    // Call resetErrorBoundary() to reset the error boundary and retry the render.
    resetErrorBoundary();
  };

  return (
    <Box
      component="div"
      role="alert"
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        width: "900px", // Adjust the width as needed
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",

        gap: "10px",
      }}
    >
      <h1>Something went wrong</h1>
      <pre style={{ color: "red", marginBottom: "20px" }}>{error.message}</pre>
      <Button variant="contained" color="error" onClick={handleRetry}>
        Retry
      </Button>
    </Box>
  );
};

export default Fallback;
