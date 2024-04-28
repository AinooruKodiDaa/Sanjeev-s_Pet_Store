import { Table, TableCell, TableHead } from "@mui/material";
import { styled } from "@mui/system";

export const StyledTable = styled(Table)({
  position: "relative",
  width: "100%",
  borderCollapse: "collapse",
  textAlign: "left",
});

export const StyledTableCell = styled(TableCell)({
  padding: "0.25rem 1.5rem",
  "@media(max-width: 600px)": {
    display: "grid",
    gap: "0.5rem",
    gridTemplateColumns: "1fr auto",
    padding: "0.5rem 1rem",
    "&:first-child": { paddingTop: "2rem" },
    "&:last-child": { paddingBottom: "2rem" },

    "&::before": {
      textTransform: "capitalize",
      fontWeight: "700",
      content: `attr(data-cell) ": "`,
    },
  },
});

export const StyledTableHead = styled(TableHead)({
  background: "rgba(3,126,255,1)",
  color: "white",
  "@media(max-width: 600px)": {
    display: "none",
  },
});
