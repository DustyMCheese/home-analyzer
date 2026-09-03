import { useState } from "react";
import ImageForm from "./ImageForm";
import ImageDisplay from "./ImageDisplay";
import type { Furniture } from "./types";

const ImageAnalyzer = () => {
  const [image, setImage] = useState<File | null>(null);
  const [analyzedData, setAnalyzedData] = useState<Furniture[]>([]);

  return (
    <section className="flex flex-col items-center justify-center">
      <ImageForm
        saveImage={setImage}
        saveAnalyzedData={setAnalyzedData}
      ></ImageForm>
      <ImageDisplay image={image} analyzedData={analyzedData}></ImageDisplay>
    </section>
  );
};

export default ImageAnalyzer;
