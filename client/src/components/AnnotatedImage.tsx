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
    <figure className="flex justify-evenly w-1/2 h-auto m-4">
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
