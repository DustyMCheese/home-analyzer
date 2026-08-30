import { useEffect, useState } from "react";

interface Props {
  image: null | File;
}

const ImageDisplay = ({ image }: Props) => {
  const [image_url, set_image_url] = useState("");

  useEffect(() => {
    let url_of_image = "";
    if (image != null) {
      url_of_image = URL.createObjectURL(image);
      set_image_url(url_of_image);
    }
    return () => {
      URL.revokeObjectURL(image_url);
    };
  }, [image]);

  return image_url !== "" ? (
    <img src={image_url} alt="Image of Home" className="w-1/2 h-auto m-4" />
  ) : (
    <div className="flex items-center justify-center border-2 m-4 w-1/2 h-128 rounded">
      Uploaded Image Appears Here
    </div>
  );
};

export default ImageDisplay;
