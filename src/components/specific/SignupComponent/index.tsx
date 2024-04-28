import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import { Box, Typography } from "@mui/material";
import { addUser, fetchUsers } from "../../../redux/actions/usersActions";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui";

export const SignupComponent: React.FC = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  
  const INITIAL_STATE = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  };


  const today = new Date();

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is mandatory"),
    lastName: Yup.string().required("Last Name is mandatory"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    username: Yup.string().required("Username is mandatory"),
    password: Yup.string()
      .required("Password is mandatory")
      .min(8, "Password must be at least 8 characters long")
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
      ),
    confirmPassword: Yup.string()
     // .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  });


  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: INITIAL_STATE,
    validationSchema,
    onSubmit: (values) => {
      const { confirmPassword, ...userData } = values; // Exclude confirmPassword from user data
    dispatch(addUser({...userData,role:"customer", createdAt: today, updatedAt: today} as any));
    navigate("/login")
    },
  });

  return (
    <>
      <Typography marginBottom={3} component="h6" variant="h6" fontWeight={700}>
        Sign up
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "15px",
        }}>
          <TextField
          size="small"
            id="firstName"
            name="firstName"
            label="First Name"
            variant="outlined"
            fullWidth
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
          size="small"
            id="lastName"
            name="lastName"
            label="Last Name"
            variant="outlined"
            fullWidth
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <TextField
          size="small"
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
          size="small"
            id="username"
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
            id="password"
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
          <TextField
          size="small"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            variant="outlined"
            fullWidth
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />
        </Box>
        <Box display="flex" marginTop={2} justifyContent="end" alignItems="center" gap={2}>
          <Button
          size="small"
            disabled={!formik.isValid}
            type="submit"
            fullWidth
            variant="outlined"
            color="primary"
          >
            Register
          </Button>
        </Box>
      </form>
    </>
  );
};


