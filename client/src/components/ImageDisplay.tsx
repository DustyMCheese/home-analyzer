import { useEffect, useState } from "react";
import type { Furniture } from "./types";

interface Props {
  image: null | File;
  analyzedData: Furniture[];
}

const ImageDisplay = ({ image, analyzedData }: Props) => {
  const [image_url, setImageUrl] = useState("");
  const [scale, setScale] = useState(0);

  useEffect(() => {
    let url_of_image = "";
    if (image != null) {
      url_of_image = URL.createObjectURL(image);
      setImageUrl(url_of_image);

      return () => {
        URL.revokeObjectURL(image_url);
        setImageUrl("");
      };
    }
  }, [image]);

  return image_url !== "" ? (
    <figure className="relative w-1/2 h-auto m-4">
      <img
        src={image_url}
        alt="Image of Home"
        className="w-full h-auto"
        onLoad={(data) => {
          setScale(
            data.currentTarget.clientWidth / data.currentTarget.naturalWidth,
          );
        }}
      />
      {analyzedData.map((item: Furniture, index) => (
        <div
          className="absolute bg-yellow-500/50"
          style={{
            top: item.box.y1 * scale,
            left: item.box.x1 * scale,
            width: (item.box.x2 - item.box.x1) * scale,
            height: (item.box.y2 - item.box.y1) * scale,
          }}
          key={index}
        ></div>
      ))}
    </figure>
  ) : (
    <div className="flex items-center justify-center border-2 m-4 w-1/2 h-128 rounded">
      Uploaded Image Appears Here
    </div>
  );
};

export default ImageDisplay;
