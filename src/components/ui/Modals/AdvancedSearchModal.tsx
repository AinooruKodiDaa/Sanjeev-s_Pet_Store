import { Box, Button, Fade, Modal, TextField, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useIsModalOpen } from "../../../contexts/modalContextProvider";
import { addPet } from "../../../redux/actions/petsActions";
import { Search } from '@mui/icons-material';

export const AdvancedSearchModal: React.FC<any> = (props) => {
  const { isModalOpen, setIsModalOpen } = useIsModalOpen();

  const setClose = useCallback(() => {
    setIsModalOpen({
      type: "CLOSE",
      payload: "",
    });
  }, [isModalOpen.isAddPetModalOpen]);

  const srcRandom = [
    {
      id: 1,
      src: "https://t3.ftcdn.net/jpg/05/87/82/38/360_F_587823826_EJBCgCgxC5A6ROvoDz1TPvFo81Lq22QO.jpg",
    },
    { id: 2, src: "https://images6.alphacoders.com/987/987910.jpg" },
  ];
  return (
    <Modal open={isModalOpen.isAdvancedSearchModalOpen} onClose={setClose}>
      <Fade in={isModalOpen.isAdvancedSearchModalOpen}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: {sm: 600},
            bgcolor: "background.paper",
            borderRadius: "8px",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 3,
            boxShadow: 24,
            p: 4,
          }}
        >
          <h1>Adv Search</h1>

          <img
            style={{ borderRadius:"12px", width:"100%", height:"100%", objectFit: "contain" }}
            // width="400"
            // height="300"
            src="https://images6.alphacoders.com/987/987910.jpg"
          />
          <span style={{ fontSize: "12px", display: "block", textAlign: "center" }}>
    For demo purposes, an image placeholder is used
  </span>

          <Box
            sx={{
              width: "100%",
              display: "grid",
              placeItems: "center",
              justifyItems: "center",
              textAlign: "start",

              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <Typography sx={{ width: "100%" }} component="h6" variant="h6">
              Name: <strong>{isModalOpen.payload.name}</strong>
            </Typography>
            <Typography sx={{ width: "100%" }} component="h6" variant="h6">
              Age: <strong>{isModalOpen.payload.age}</strong>
            </Typography>
            <Typography sx={{ width: "100%" }} component="h6" variant="h6">
              Gender: <strong>{isModalOpen.payload.gender}</strong>
            </Typography>
            <Typography sx={{ width: "100%" }} component="h6" variant="h6">
              Place: <strong>{isModalOpen.payload.state}</strong>
            </Typography>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};
