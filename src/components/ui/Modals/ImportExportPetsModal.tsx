import {
  Box,
  Checkbox,
  Chip,
  Divider,
  Fade,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import React, { useCallback, useRef, useState } from "react";
import { useIsModalOpen } from "../../../contexts/modalContextProvider";
import * as XLSX from "xlsx";
import { Pet } from "../../../redux/types/petsTypes";
import {
  Delete,
  Download,
  Female,
  FileUpload,
  Male,
  Pets,
} from "@mui/icons-material";
import { Button, IconButton } from "../Button";
import { useDispatch } from "react-redux";
import { addPet, fetchPets } from "../../../redux/actions/petsActions";
import { toast } from "react-toastify";
import { useCategories, useStates } from "../../../redux/selectors";
import { Category } from "../../../redux/types/categoriesType";
import { State } from "../../../redux/types/statesType";
import { useDebouncedCallback } from "../../../hooks";

export const ImportExportPetsModal: React.FC<any> = (props) => {
  const { isModalOpen, setIsModalOpen } = useIsModalOpen();
  const [petsData, setPetsData] = useState<any[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  /**custom selectors*/
  const states = useStates();
  const categories = useCategories();

  const dispatch = useDispatch();

  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleFileInputClick = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      setFileName(file.name); // Store the uploaded file name

      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        if (!data) return;

        if (file.name.endsWith(".csv")) {
          // Process CSV file
          // Example: parseCSV(data);
        } else {
          // Process Excel file
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName =
            workbook.SheetNames[workbook.SheetNames.indexOf("Sheet1")];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, {
            blankrows: false,
            raw: false,
          });

          // Filter out rows that don't have all required columns
          const filteredData = jsonData.filter(
            (row: any) =>
              row.Name && row.Gender && row.Age && row.State && row.Category
          );

          const transformed = filteredData.map((jsonPet: any, index) => {
            return {
              name: jsonPet.Name,
              age: jsonPet.Age,
              gender: jsonPet.Gender,
              state: jsonPet.State,
              category: jsonPet.Category,
            };
          });

          // alert("Transformed data" + JSON.stringify(transformed, null, 2));
          setPetsData(transformed);
        }
      };
      reader.readAsBinaryString(file);
    },
    []
  );

  const handleClose = useCallback(() => {
    setIsModalOpen({ type: "CLOSE", payload: "" });
    setTimeout(() => {
      setPetsData([]);
      setFileName(null);
    }, 100);
  }, [isModalOpen.isImportExportPetsModalOpen]);

  const handleImportPets = () => {
    const petsPayload = petsData.map((pet) => {
      return {
        name: pet.name,
        age: pet.age,
        gender: pet.gender,
        stateId: states?.find((state) => state.name === pet.state)?.id,
        categoryId: categories?.find(
          (category) => category.name === pet.category
        )?.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    alert("petsPayload" + JSON.stringify(petsPayload, null, 2));

    for (let i of petsPayload) {
      console.log("JAJ", i);

      dispatch(addPet(i as any));
    }
    setTimeout(() => {
      dispatch(fetchPets());
    }, 250);

    // toast.success(
    //   "Import sample toast message" + JSON.stringify(petsPayload, null, 2)
    // );
    setIsModalOpen({ type: "CLOSE", payload: "" });
  };

  const handleDeletePet = useDebouncedCallback((index: number) => {
    const updatedPetsData = [...petsData];
    updatedPetsData.splice(index, 1);
    setPetsData(updatedPetsData);
  }, 100);

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const selectedIndex = selectedItems.indexOf(index);
    let newSelected: number[] = [];

    if (selectAll) {
      newSelected = event.target.checked
        ? [...Array(petsData.length).keys()]
        : [];
    } else {
      if (selectedIndex === -1) {
        newSelected = [...selectedItems, index];
      } else {
        newSelected = selectedItems.filter((item) => item !== index);
      }
    }

    setSelectedItems(newSelected);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectAll(event.target.checked);
    setSelectedItems(
      event.target.checked ? [...Array(petsData.length).keys()] : []
    );
  };

  const handleDeleteSelectedPets = () => {
    const updatedPetsData = petsData.filter(
      (_, index) => !selectedItems.includes(index)
    );
    setPetsData(updatedPetsData);
    setSelectedItems([]);
    setSelectAll(false);
  };

  const handleDownloadTemplate = () => {
    const downloadUrl = "/files/ImportPetsTemplate.xlsx"; // Specify the download URL

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "ImportPetsTemplate.xlsx"; // Specify the file name for download
    link.click();
  };

  return (
    <Modal
      color="secondary"
      open={isModalOpen.isImportExportPetsModalOpen}
      onClose={handleClose}
    >
      <Fade in={isModalOpen.isImportExportPetsModalOpen}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            minWidth: { sm: 660 },
            bgcolor: "background.paper",
            borderRadius: "8px",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 3,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Stack
            spacing={2}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" component="h6" gutterBottom>
              Import/Export Pets
            </Typography>

            <IconButton
              size="small"
              tooltip={`Download "Import pets" template`}
              children={<Download />}
              onClick={handleDownloadTemplate}
            />
          </Stack>

          <Box
            component="div"
            sx={{
              display: "flex",
              padding: 3,
              height: 150,
              borderRadius: "8px",
              flexDirection: "column",
              gap: 2,
              justifyContent: "center",
              alignItems: "center",
              border: "1px dashed rgba(3,126,255,1)",
            }}
          >
            <Button
              color="primary"
              onClick={handleFileInputClick}
              size="small"
              startIcon={<FileUpload />}
            >
              {fileName ?? "Choose file"}
            </Button>
            <span
              style={{
                fontSize: "12px",
                display: "block",
                textAlign: "center",
              }}
            >
              Please choose a file to upload. Allowed file types are .xlsx,
              .xls, .csv, with a maximum file size of 5MB.
            </span>
          </Box>
          <input
            ref={fileRef}
            draggable
            // size={5}
            type="file"
            accept=".xlsx, .xls, .csv"
            onChange={handleFileUpload}
            style={{ display: "none", marginBottom: "20px" }}
          />

          {/* <Box
            sx={{
              width: "100%",
              height: 250,
              overflowY: "auto",
              minWidth: { sm: 660 },
              bgcolor: "background.paper",
            }}
          >
            {petsData.length > 0 && (
              <table>
                <thead>
                  <tr>
                    {Object.keys(petsData[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {petsData.map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value: any, i) => (
                        <td key={i}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Box> */}

          {petsData.length > 0 && (
            <>
              {/* <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography component="body" variant="body1">
                  Preview {petsData.length} records
                </Typography>
              </Stack> */}
              <List
                disablePadding
                sx={{
                  width: "100%",
                  height: 250,
                  overflowY: "auto",
                  minWidth: { sm: 660 },
                  bgcolor: "background.paper",
                }}
              >
                <ListItem disableGutters>
                  <ListItemIcon>
                    {" "}
                    <Checkbox
                      edge="start"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Stack
                        spacing={2}
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography component="body" variant="body1">
                          Select All
                        </Typography>

                        {selectedItems.length > 0 && (
                          <IconButton
                            size="small"
                            tooltip={`Delete ${selectedItems.length} pet ${
                              selectedItems.length === 1 ? "record" : "records"
                            }`}
                            //disabled={selectedItems.length === 0}

                            color="primary"
                          children={ <Delete />}
                            onClick={handleDeleteSelectedPets}
                          />
                        )}
                      </Stack>
                    }
                  />
                </ListItem>
                <Divider variant="fullWidth" component="li" />
                {petsData.map((value, index) => (
                  <React.Fragment key={index}>
                    <ListItem disableGutters>
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={selectAll || selectedItems.includes(index)}
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => handleCheckboxChange(event, index)}
                          tabIndex={-1}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Stack
                            spacing={2}
                            direction="row"
                            justifyContent="start"
                            alignItems="center"
                          >
                            <Typography component="body" variant="body1">
                              {value.name}
                            </Typography>
                            <Chip
                              size="small"
                              color={
                                value.gender === "Male"
                                  ? "primary"
                                  : "secondary"
                              }
                              label={value.gender}
                              icon={
                                value.gender === "Male" ? <Male /> : <Female />
                              }
                            />{" "}
                            <Chip
                              size="small"
                              color={"warning"}
                              label={value.category}
                              icon={<Pets />}
                            />
                          </Stack>
                        }
                        secondary={
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="start"
                            gap={3}
                            marginTop={1}
                          >
                            <Typography
                              color="gray"
                              component="body"
                              variant="body2"
                              fontSize={12.5}
                            >
                              {value.state}
                            </Typography>
                          </Stack>
                        }
                      />
                    </ListItem>
                    <Divider variant="fullWidth" component="li" />
                  </React.Fragment>
                ))}
              </List>
            </>
          )}
          <Stack spacing={2} justifyContent="end" direction="row">
            {petsData.length > 0 && (
              <Button
                //disabled={petsData.length === 0}
                size="small"
                color="primary"
                onClick={handleImportPets}
              >
                Import
              </Button>
            )}
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};
