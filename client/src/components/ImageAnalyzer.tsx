import { useState } from "react";
import ImageForm from "./ImageForm";
import ImageDisplay from "./ImageDisplay";

const ImageAnalyzer = () => {
  const [image, setImage] = useState<File | null>(null);

  return (
    <section className="flex flex-col items-center justify-center">
      <ImageForm saveForm={setImage}></ImageForm>
      <ImageDisplay image={image}></ImageDisplay>
    </section>
  );
};

export default ImageAnalyzer;
