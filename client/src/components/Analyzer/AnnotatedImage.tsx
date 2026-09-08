import { useState } from "react";
import FurnitureDetails from "./FurnitureDetails";
import ImageDisplay from "./ImageDisplay";
import type { Furniture } from "./types";

interface Props {
  image: null | File;
  analyzedData: Furniture[];
}

const AnnotatedImage = ({ image, analyzedData }: Props) => {
  const [hoveredDetails, setHoveredDetails] = useState<Furniture | null>(null);
  return (
    <figure className="m-4 flex h-auto w-full flex-col items-center justify-center lg:w-1/2 lg:flex-row lg:justify-evenly">
      <ImageDisplay
        image={image}
        analyzedData={analyzedData}
        saveHoveredDetails={setHoveredDetails}
      ></ImageDisplay>
      <FurnitureDetails hoveredDetails={hoveredDetails}></FurnitureDetails>
    </figure>
  );
};

export default AnnotatedImage;
