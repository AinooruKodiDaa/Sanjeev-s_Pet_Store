import { Box,  Fade, Modal, Typography } from "@mui/material";
import { useCallback } from "react";
import { useIsModalOpen } from "../../../contexts/modalContextProvider";
import { Tooltip } from "../Tooltip";
import { useDispatch } from "react-redux";
import { deletePet, fetchPets } from "../../../redux/actions/petsActions";
import { Button } from "../Button";

export const DeletePetModal: React.FC<any> = (props) => {
  const { isModalOpen, setIsModalOpen } = useIsModalOpen();

  const { id, name, state, age, gender } = isModalOpen.payload as any;

  const setClose = useCallback(() => {
    setIsModalOpen({
      type: "CLOSE",
      payload: "",
    });
  }, [isModalOpen.isDeletePetModalOpen]);

const dispatch =  useDispatch();

  const handleDelete = useCallback(() => {
    // Add your delete logic here
    // alert(`Deleting pet... ${name}(${id})`);

    dispatch(deletePet(id));

    setTimeout(()=> {
      dispatch(fetchPets())
    },250);
    

    // Close the modal after deleting
    setClose();
  }, [setClose]);

 
  return (
    <Modal open={isModalOpen.isDeletePetModalOpen} onClose={setClose}>
      <Fade in={isModalOpen.isDeletePetModalOpen}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: {sm: 400},
            bgcolor: "background.paper",
            borderRadius: "8px",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 3,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography component="h6" variant="h6">
            Are you sure you want to remove {name} from the list ?
          </Typography>

          <Typography component="h1">
            Name: <strong>{name}</strong>
          </Typography>
          <Typography component="h1">
            Place: <strong>{state}</strong>
          </Typography>
          <Typography component="h1">
            Age: <strong>{age}</strong>
          </Typography>
          <Typography component="h1">
            Gender: <strong>{gender}</strong>
          </Typography>

          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3}>
        
          <Button onClick={setClose} variant="outlined" color="error">
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="contained" color="primary">
            Delete
          </Button>
          </Box>
       
        </Box>
      </Fade>
    </Modal>
  );
};
