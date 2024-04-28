import React from "react";
import { Snackbar, Alert, SnackbarProps } from "@mui/material";

type ToastProps = {
  open: boolean;
  handleClose: () => void;
  message?: string;
} & SnackbarProps;

const Toast: React.FC<ToastProps> = (props) => {
  const { open, handleClose, message = "", autoHideDuration } = props;
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Toast;
