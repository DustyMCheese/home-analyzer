import { useState } from "react";
import ImageAnalyzer from "./Analyzer/ImageAnalyzer";

const Main = () => {
  const [furnitureFrequencies, setFurnitureFrequencies] = useState<
    Map<string, number>
  >(new Map());

  return (
    <main className="w-full">
      <ImageAnalyzer
        furnitureFrequencies={furnitureFrequencies}
        setFurnitureFrequencies={setFurnitureFrequencies}
      ></ImageAnalyzer>
    </main>
  );
};

export default Main;
