import Box from "@mui/material/Box";
import { useEffect, useMemo } from "react";
import { PetsComponent } from "../../components/specific";
import BarChart from "../../components/ui/BarChart";
import { IconButton, Paper } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchPets } from "../../redux/actions/petsActions";
import { useCategories, usePets } from "../../redux/selectors";
import { Pet } from "../../redux/types/petsTypes";
import { Category } from "../../redux/types/categoriesType";
import PieChart from "../../components/ui/PieChart";
import { Typography } from "../../components/ui";

interface Props {
  window?: () => Window;
}

export default function AdminDashboardPage(props: Props) {
  const { window } = props;

  const userData = useMemo(
    () => JSON.parse(sessionStorage?.getItem("user") as any),
    []
  );

  const pets = usePets();
  const categories = useCategories();

  const categoriesToCount = ["Dog", "Cat", "Bird", "Rabbit"];

  // Initialize an object to store the counts
  const categoryCounts: { [key: string]: number } = {};

  // Count the number of pets for each category
  categoriesToCount.forEach((category) => {
    const count = pets.filter((pet) => pet.category.name === category).length;
    categoryCounts[category] = count;
  });

  // Prepare data for BarChart
  const data = categoriesToCount.map((category) => ({
    name: category,
    value: categoryCounts[category] || 0, // Default to 0 if category count is undefined
  }));

  // Colors object with custom colors for each category
  const colors = {
    Dog: "blue",
    Rabbit: "red",
    Cat: "green",
    Bird: "orange",
  };

  return (
    
    <Box sx={{ width: "100%" }}>
      <Typography
        marginBottom={2}
        variant="h6"
        component="h6"
      >{`Welcome ${userData?.username}!`}</Typography>

      <Box component={Paper} padding={2} marginBottom={2} elevation={4}>
        <PetsComponent role={userData?.role} />
      </Box>
      <Box
        component={Paper}
        padding={2}
        marginBottom={2}
        elevation={4}
        sx={{ width: "100%", height: "80vh" }}
      >
        <BarChart data={data} colors={colors} />
      </Box>
      {/* <Box component={Paper} padding={2} marginBottom={2} elevation={4} sx={{ display:{sm: "none"},width: "100%" }}>
        <PieChart data={data} colors={colors}/>
      </Box> */}
    </Box>
  );
}
