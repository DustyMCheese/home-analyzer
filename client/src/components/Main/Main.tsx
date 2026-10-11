import { useState } from "react";
import ImageAnalyzer from "./Analyzer/ImageAnalyzer";
import Summary from "./Summary/Summary";

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
      <Summary furnitureFrequencies={furnitureFrequencies}></Summary>
    </main>
  );
};

export default Main;
