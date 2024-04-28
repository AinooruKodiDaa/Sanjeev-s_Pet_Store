// index.tsx

import React, { useState } from "react";
import { useUniqueId } from "../../../hooks";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { StyledDiv, StyledDivActive, StyledSection, StyledImage } from "./styled";
import { IconButton } from "../Button"; // Remove unused import

interface ImageCarouselProps {
  images: any[];
}

export const ImageCarousel: React.FC<ImageCarouselProps> = (props) => {
  const { images } = props;
  const uniqueId = useUniqueId("image-");

  const [current, setCurrent] = useState<number>(0);
  const length = images.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(images) || images.length <= 0) {
    return null;
  }

  return (
    <StyledSection>
      <IconButton
        color="default"
        sx={{
          position: "absolute",
          top: "50%",
          right: "90%",
          zIndex: 10,
          userSelect: "none",
        }}
        children={<ChevronLeft />}
        onClick={prevSlide}
      />

      <IconButton

        color="default"
        sx={{
          position: "absolute",
          top: "50%",
          left: "90%",
          zIndex: 10,
          userSelect: "none",
        }}
        children={<ChevronRight />}
        onClick={nextSlide}
      />

      {images.map((image, index) => (
        <StyledDivActive
          key={index}
          sx={{
            display: index === current ? "inline-flex" : "none",
          }}
        >
          <StyledImage
            loading="lazy"
            style={{
              borderRadius: "12px",
              
            }}
            alt={image.src}
            src={image.src}
          />
        </StyledDivActive>
      ))}
    </StyledSection>
  );
};
