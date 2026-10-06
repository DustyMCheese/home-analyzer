import { useState } from "react";
import ImageForm from "./ImageForm";
import type { Furniture } from "./types";
import AnnotatedImage from "./AnnotatedImage";

interface Props {
  furnitureFrequencies: Map<string, number>;
  setFurnitureFrequencies: (frequencies: Map<string, number>) => void;
}

function updateFrequencies(
  updater: (frequencies: Map<string, number>) => void,
  frequencies: Map<string, number>,
  analyzedData: Furniture[],
) {
  const copyFrequencies = new Map(frequencies);
  for (let i = 0; i < analyzedData.length; i++) {
    let frequency = copyFrequencies.get(analyzedData[i].name);
    if (frequency) {
      copyFrequencies.set(analyzedData[i].name, frequency + 1);
    } else {
      copyFrequencies.set(analyzedData[i].name, 1);
    }
  }
  updater(copyFrequencies);
}

const ImageAnalyzer = ({
  furnitureFrequencies,
  setFurnitureFrequencies,
}: Props) => {
  const [image, setImage] = useState<File | null>(null);
  const [analyzedData, setAnalyzedData] = useState<Furniture[]>([]);

  return (
    <section>
      <div className="flex w-full flex-col items-center justify-center lg:flex-row">
        <ImageForm
          saveImage={setImage}
          saveAnalyzedData={setAnalyzedData}
        ></ImageForm>
        <AnnotatedImage
          image={image}
          analyzedData={analyzedData}
        ></AnnotatedImage>
      </div>
      <div className="flex w-full items-center justify-center">
        <button
          onClick={() => {
            updateFrequencies(
              setFurnitureFrequencies,
              furnitureFrequencies,
              analyzedData,
            );
          }}
          className="m-4 rounded bg-gray-400 px-12 py-4 hover:cursor-pointer hover:bg-gray-500"
        >
          Save to Table
        </button>
      </div>
    </section>
  );
};

export default ImageAnalyzer;
