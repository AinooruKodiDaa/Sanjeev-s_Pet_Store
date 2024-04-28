import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { loginRequest, loginSuccess } from "../../../redux/actions/authActions";
import * as Yup from "yup";
import { FormikValues, useFormik } from "formik";
import TextField from "@mui/material/TextField";

import { Box, Typography } from "@mui/material";
import { redirect, useNavigate } from "react-router-dom";
import Toast from "../../ui/Toast";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "../../ui";

interface LoginComponentProps {}

export const LoginComponent: React.FC<LoginComponentProps> = () => {
  /**toast state*/
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  /**dispatch action*/
  const dispatch = useDispatch();

  /**initial values*/
  const INITIAL_STATE = {
    username: "",
    password: "",
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [initialValues, setInitialValues] = useState(INITIAL_STATE);

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is mandatory"),
    password: Yup.string()
      .required("Password is mandatory")

      .matches(
        /^(?=.*[!@#$%^&*])/,
        "Password must contain at least 1 special character"
      )
      .matches(
        /^(?=.*[A-Z])/,
        "Password must contain at least 1 capital letter"
      )
      .matches(/^(?=.*[0-9])/, "Password must contain at least 1 digit")
      .matches(
        /^(?=.*[a-z])/,
        "Password must contain at least 1 lowercase letter"
      )
      // .notMatches(/^(?=.*[0-9]{4,})/, "Password cannot have sequential numbers of 4 or more")
      .min(8, "Password must be at least 8 characters long"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,

    onSubmit: (values) => {
      try {
        dispatch(loginRequest(values.username, values.password));
      } catch (error: any) {
        toast.error(error.message);
      }
    },
  });

  return (
    <>
      <Typography component="h6" variant="h6" fontWeight={700}>
        Login
      </Typography>
      <form
        id="login-form"
        onSubmit={formik.handleSubmit}
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "15px",
        }}
      >
        <TextField
        size="small"
          id="login-username"
          name="username"
          label="Username"
          variant="outlined"
          fullWidth
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
        size="small"
          id="login-password"
          name="password"
          type="password"
          label="Password"
          variant="outlined"
          fullWidth
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
          <Button
          size="small"
            id="login-btn"
            disabled={!formik.isValid}
            type="submit"
            fullWidth
            variant="outlined"
            color="primary"
          >
            Login
          </Button>
          <Button
          size="small"
            id="signup-btn"
            onClick={() => {
              navigate("/signup");
            }}
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign up
          </Button>
        </Box>
      </form>
    </>
  );
};
