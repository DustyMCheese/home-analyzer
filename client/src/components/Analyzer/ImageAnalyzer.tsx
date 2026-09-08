import { useState } from "react";
import ImageForm from "./ImageForm";
import type { Furniture } from "./types";
import AnnotatedImage from "./AnnotatedImage";

const ImageAnalyzer = () => {
  const [image, setImage] = useState<File | null>(null);
  const [analyzedData, setAnalyzedData] = useState<Furniture[]>([]);

  return (
    <section className="flex flex-col items-center justify-center">
      <ImageForm
        saveImage={setImage}
        saveAnalyzedData={setAnalyzedData}
      ></ImageForm>
      <AnnotatedImage
        image={image}
        analyzedData={analyzedData}
      ></AnnotatedImage>
    </section>
  );
};

export default ImageAnalyzer;
