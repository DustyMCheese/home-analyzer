import { useState } from "react";
import ImageForm from "./ImageForm";

const ImageAnalyzer = () => {
  const [image, setImage] = useState<File | null>(null);

  return (
    <section>
      <ImageForm saveForm={setImage}></ImageForm>
    </section>
  );
};

export default ImageAnalyzer;
