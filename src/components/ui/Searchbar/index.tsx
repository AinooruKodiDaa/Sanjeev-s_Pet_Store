import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Directions, Search } from "@mui/icons-material";

const Searchbar = (props: any) => {
  const { sx, handleChange, placeholder } = props;

  return (
    <Paper component="form" sx={sx} elevation={6}>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
        onChange={handleChange}
        inputProps={{ "aria-label": "search google maps" }}
      />
      <IconButton
        disableRipple
        type="button"
        sx={{ p: "10px", color: "#c4a596" }}
        aria-label="search"
      >
        <Search color="inherit" />
      </IconButton>
      {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: "10px" }} aria-label="directions">
        <Directions />
      </IconButton> */}
    </Paper>
  );
};
export default Searchbar;
