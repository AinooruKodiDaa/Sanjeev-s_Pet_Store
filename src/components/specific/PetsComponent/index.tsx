import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
} from "@mui/material";
import { StyledTable, StyledTableCell, StyledTableHead } from "./styled";
import { fetchPets } from "../../../redux/actions/petsActions";
import { Pet, PetsState } from "../../../redux/types/petsTypes";
import {
  Add,
  Delete,
  Edit,
  ImportExport,
  ManageSearch,
  Refresh,
  RemoveCircleOutline,
  Search,
  Tune,
  Visibility,
} from "@mui/icons-material";
import { useIsModalOpen } from "../../../contexts/modalContextProvider";
import {
  AddEditPetModal,
  AdvancedSearchModal,
  DeletePetModal,
  ImportExportPetsModal,
  ViewPetModal,
} from "../../ui/Modals";
import { useDebouncedCallback } from "../../../hooks";
import { toast } from "react-toastify";
import { useCategories, usePets } from "../../../redux/selectors";
import { Category } from "../../../redux/types/categoriesType";
import { Button, IconButton } from "../../ui";

interface PetsComponentProps {
  role?: string;
}

export const PetsComponent: React.FC<PetsComponentProps> = (props) => {
  const { role } = props;
  const dispatch = useDispatch();
  const [page, setPage] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [rowsPerPage, setRowsPerPage] = useState<number>(10); // Number of items per page

  
/**Custom Selectors*/
  const pets = usePets();

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - pets.length) : 0;

  /**handlers*/
  const handleSearch = useDebouncedCallback((e: any) => {
    setSearchTerm(e.target.value);
  }, 500);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = pets
    // ?.sort((a, b) => {
    //   const dateA = new Date(a.updatedAt as any);
    //   const dateB = new Date(b.updatedAt as any);
    //   return dateB.getTime() - dateA.getTime(); // Ensure a valid date comparison
    // })
    .filter((pet) =>
      selectedCategory ? pet.category.name === selectedCategory : true
    )
    .filter((record: any) => {
      return Object.keys(record).some((key) =>
        (record[key].toString().toLowerCase() || "").includes(
          searchTerm.toLowerCase()
        )
      );
    });

  /**Modal Hook*/
  const { isModalOpen, setIsModalOpen } = useIsModalOpen();

  const categories = useCategories();

  /**Role based actions*/
  const renderActionButtons = (pet: Pet) => {
    if (role === "admin") {
      return (
        <>
          {" "}
          <IconButton
          size="small"
            tooltip={`View ${pet.name} details`}
            onClick={() =>
              setIsModalOpen({
                type: "OPEN_VIEW_PET_MODAL",
                payload: { ...pet, state: pet?.state?.name },
              })
            }
            color={"accent" as any}
            children={ <Visibility />}
          />
          <IconButton
          size="small"
            tooltip={`Edit ${pet.name} details`}
            children={ <Edit />}
            onClick={() =>
              setIsModalOpen({
                type: "OPEN_ADDEDIT_PET_MODAL",
                payload: { ...pet, isEdit: true },
              })
            }
            color={"accent" as any}
          />
          <IconButton
          size="small"
            tooltip={`Delete ${pet.name} record`}
            onClick={() =>
              setIsModalOpen({
                type: "OPEN_DELETE_PET_MODAL",
                payload: {
                  ...pet,
                  state: pet.state.name,
                  category: pet.category.name,
                },
              })
            }
            children={<Delete />}
            color={"accent" as any}
          />
        </>
      );
    } else if (role === "customer") {
      return (
        <>
          <IconButton
          size="small"
            tooltip={`View ${pet.name} details`}
            onClick={() =>
              setIsModalOpen({
                type: "OPEN_VIEW_PET_MODAL",
                payload: { ...pet, state: pet?.state?.name },
              })
            }
            color={"accent" as any}
            children={<Visibility />}
          />
        </>
      );
    }
  };
  return (
    <>
      <ViewPetModal />
      <AdvancedSearchModal />
      <AddEditPetModal />
      <DeletePetModal />
      <ImportExportPetsModal />
      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 3,
        }}
      >
        <Box
          component="div"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField
          size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
            placeholder="Search records"
          />
          <IconButton
          size="small"
            children={<Tune />}
            tooltip="advanced table"
            color="primary"
            onClick={() => {
              setIsModalOpen({
                type: "OPEN_ADVANCED_SEARCH_MODAL",
                payload: "",
              });
            }}
          />
        </Box>

        <Select
        size="small"
          value={selectedCategory || ""}
          onChange={(e) => setSelectedCategory(e.target.value as string)}
          displayEmpty
          sx={{ width: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          {categories.map((category: Category) => (
            <MenuItem key={category.id} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </Select>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
          }}
        >
          {role === "admin" && (
            <Button
            size="small"
              color="primary"
              startIcon={<ImportExport />}
              onClick={() =>
                setIsModalOpen({
                  type: "OPEN_IMPORTEXPORT_PET_MODAL",
                  payload: "",
                })
              }
            >
              Import
            </Button>
          )}
          {role === "admin" && (
            <Button
            size="small"
              color="primary"
              startIcon={<Add />}
              onClick={() =>
                setIsModalOpen({
                  type: "OPEN_ADDEDIT_PET_MODAL",
                  payload: { isEdit: false },
                })
              }
            >
              Add Pet
            </Button>
          )}

          <IconButton
          size="small"
            children={ <Refresh />}
            tooltip="refresh table"
            color="primary"
            onClick={() => {
              dispatch(fetchPets());
              setSearchTerm("");
              setSelectedCategory(null);
            }}
          />
        </Box>
      </Box>

      <TableContainer sx={{ height: "40vh", overflowY: "auto" }}>
        <StyledTable stickyHeader>
          <StyledTableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Pet name</StyledTableCell>
              <StyledTableCell>Place</StyledTableCell>
              <StyledTableCell>Age</StyledTableCell>
              <StyledTableCell>Gender</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((pet: Pet, index: number) => (
                <TableRow key={pet.id}>
                  <StyledTableCell data-cell="#">{index + 1}</StyledTableCell>
                  <StyledTableCell data-cell="name">{pet.name}</StyledTableCell>
                  <StyledTableCell data-cell="state">
                    {pet.state.name}
                  </StyledTableCell>
                  <StyledTableCell data-cell="age">{pet.age}</StyledTableCell>
                  <StyledTableCell data-cell="gender">
                    {pet.gender}
                  </StyledTableCell>
                  <StyledTableCell data-cell="category">
                    {pet.category.name}
                  </StyledTableCell>
                  <StyledTableCell data-cell="action">
                    <Box component="div">{renderActionButtons(pet)}</Box>
                  </StyledTableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <StyledTableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </StyledTable>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[1, 5, 10, 25]}
        component="div"
        count={pets.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};
