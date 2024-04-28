// styled.tsx

import { styled } from "@mui/material";

export const StyledSection = styled("section")({
  position: "relative",
  height:"100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden", // Ensure the container clips overflowing content
});

export const StyledDiv = styled("div")({
  width: "100%",
  height: "100%",
  transition: "opacity 0.5s ease, transform 0.5s ease", // Add transition for opacity and transform
});

export const StyledImage = styled("img")({
  borderRadius: "12px",
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

export const StyledDivActive = styled(StyledDiv)({
  opacity: 1, // Ensure active slide is fully visible
  transform: "scale(1.00)", // Optional: Apply scaling to active slide
});
