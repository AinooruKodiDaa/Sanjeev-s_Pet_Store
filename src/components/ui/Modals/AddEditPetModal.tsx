import {
  Box,
  Fade,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useIsModalOpen } from "../../../contexts/modalContextProvider";
import { addPet, editPet, fetchPets } from "../../../redux/actions/petsActions";
import { fetchStates } from "../../../redux/actions/statesActions";
import { State } from "../../../redux/types/statesType";
import { useCategories, useStates } from "../../../redux/selectors";
import { Button } from "../Button";
import { fetchCategories } from "../../../redux/actions/categoriesActions";
import { Category } from "../../../redux/types/categoriesType";
export const AddEditPetModal: React.FC<any> = (props) => {
  const { isModalOpen, setIsModalOpen } = useIsModalOpen();

  /**Custom Selectors hooks*/
  const states = useStates();
  const categories = useCategories();

  const {
    id,
    name,
    state,
    category,
    categoryId,
    stateId,
    age,
    gender,
    isEdit,
  } = isModalOpen.payload as any;
  const dispatch = useDispatch();

  // Convert states to dropdown options format
  const stateOptions = states.map((state: State) => ({
    id: state.id,
    label: state.name,
  }));

  // Convert states to dropdown options format
  const categoryOptions = categories.map((category: Category) => ({
    id: category.id,
    label: category.name,
  }));

  // Define initial values based on isEdit
  const INITIAL_STATE = isEdit
    ? {
        name,
        stateId,
        categoryId,
        gender,
        age,
      }
    : {
        name: "",
        gender: "",
        age: "",
        stateId: "",
        categoryId: "",
      };

  const validationSchema = Yup.object({
    name: Yup.string().required("Pet's name is mandatory"),
    gender: Yup.string().required("Please select the gender"),
    age: Yup.string().required("Age is mandatory"),
    stateId: Yup.string().required("Please select a state"),
    categoryId: Yup.string().required("Please select a category"),
  });

  const formik = useFormik({
    initialValues: INITIAL_STATE,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const payload = {
        ...values,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      try {
        if (isEdit) {
          dispatch(editPet({ ...payload, updatedAt: new Date() } as any, id));
        } else {
          dispatch(
            addPet({
              ...payload,
              createdAt: new Date(),
              updatedAt: new Date(),
            } as any)
          );
        }

        setIsModalOpen({ type: "CLOSE", payload: "" });
        setTimeout(() => {
          dispatch(fetchPets());
        }, 250);
      } catch (error: any) {
        toast.error(error.message);
      }
    },
  });

  const setClose = useCallback(() => {
    setIsModalOpen({ type: "CLOSE", payload: "" });
  }, [setIsModalOpen]);

  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleFileInputClick = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
  };

  return (
    <Modal open={isModalOpen.isAddPetModalOpen} onClose={setClose}>
      <Fade in={isModalOpen.isAddPetModalOpen}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: { sm: 600 },
            bgcolor: "background.paper",
            borderRadius: "8px",
            gap: 3,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography marginBottom={3} component="h1">
            {isEdit ? "Edit pet" : "Add a new pet"}
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <Box
              sx={{
                width: "100%",
                display: "grid",
                padding: 1,
                gridTemplateColumns: "1fr 1fr",
                alignContent: "center",
                placeItems: "center",
                gap: "15px",
              }}
            >
              <TextField
                size="small"
                fullWidth
                id="pet-name"
                name="name"
                label="Pet Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={
                  (formik.touched.name as any) && (formik.errors.name as any)
                }
              />

              <FormControl
                size="small"
                sx={{ width: "100%", minWidth: 120 }}
                error={formik.touched.stateId && Boolean(formik.errors.stateId)}
              >
                <InputLabel id="pet-stateId-label">State</InputLabel>
                <Select
                  size="small"
                  labelId="pet-stateId-label"
                  label="State"
                  id="pet-stateId"
                  value={formik.values.stateId}
                  name="stateId"
                  onChange={formik.handleChange}
                >
                  <MenuItem value="">
                    <em>Select</em>
                  </MenuItem>
                  {stateOptions.map((option: any) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.stateId && Boolean(formik.errors.stateId) ? (
                  <FormHelperText>
                    {formik.errors.stateId as any}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <FormControl
                size="small"
                sx={{ width: "100%", minWidth: 120 }}
                error={
                  formik.touched.categoryId && Boolean(formik.errors.categoryId)
                }
              >
                <InputLabel size="small" id="pet-categoryId-label">
                  Category
                </InputLabel>
                <Select
                  size="small"
                  labelId="pet-categoryId-label"
                  label="Category"
                  id="pet-categoryId"
                  value={formik.values.categoryId}
                  name="categoryId"
                  onChange={formik.handleChange}
                >
                  <MenuItem value="">
                    <em>Select</em>
                  </MenuItem>
                  {categoryOptions.map((option: any) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.categoryId &&
                Boolean(formik.errors.categoryId) ? (
                  <FormHelperText>
                    {formik.errors.categoryId as any}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <FormControl
                size="small"
                fullWidth
                error={formik.touched.gender && Boolean(formik.errors.gender)}
              >
                <InputLabel size="small" id="pet-gender-label">
                  Gender
                </InputLabel>
                <Select
                  size="small"
                  labelId="pet-gender-label"
                  label="Gender"
                  id="pet-gender"
                  value={formik.values.gender}
                  name="gender"
                  onChange={formik.handleChange}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
                {formik.touched.gender && Boolean(formik.errors.gender) ? (
                  <FormHelperText>{formik.errors.gender as any}</FormHelperText>
                ) : null}
              </FormControl>

              <TextField
                size="small"
                fullWidth
                id="petage"
                name="age"
                label="Age"
                type="number"
                value={formik.values.age}
                onChange={formik.handleChange}
                error={formik.touched.age && Boolean(formik.errors.age)}
                helperText={
                  (formik.touched.age as any) && (formik.errors.age as any)
                }
              />

              <FormControl size="small" fullWidth>
                <Button variant="contained" color="primary" size="small" onClick={handleFileInputClick}>
                  Upload Image
                </Button>
                <input
                  ref={fileRef}
                  style={{
                    display: "none",
                  }}
                  draggable
                  id="file-input"
                  type="file"
                  multiple
                  accept=".png, .jpg, .jpeg" // Specify accepted file types
                  onChange={handleFileChange}

                  // Hide the input visually
                />
                {/* <FormHelperText>
                  Note: This file upload is for view purposes only and has no
                  effect on the application.
                </FormHelperText> */}
              </FormControl>
            </Box>
            <Box
              sx={{
                width: "100%",
                marginTop: 3,
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <Button
                size="small"
                onClick={setClose}
                color="error"
                variant="outlined"
              >
                Cancel
              </Button>
              <Button
                size="small"
                color="primary"
                variant="contained"
                type="submit"
              >
                {isEdit ? "Edit pet" : "Add pet"}
              </Button>
            </Box>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};
