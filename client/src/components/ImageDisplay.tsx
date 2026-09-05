import { useEffect, useState } from "react";
import type { Furniture } from "./types";

interface Props {
  image: null | File;
  analyzedData: Furniture[];
  saveHoveredDetails: (details: Furniture | null) => void;
}

const ImageDisplay = ({ image, analyzedData, saveHoveredDetails }: Props) => {
  const [image_url, setImageUrl] = useState("");
  const [scale, setScale] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

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
    <div className="relative w-2/3">
      <img
        src={image_url}
        alt="Image of Home"
        className="h-auto"
        onLoad={(data) => {
          // Calculating the scaling factor between the rendered image and original image
          setScale(
            data.currentTarget.clientWidth / data.currentTarget.naturalWidth,
          );
          setWidth(data.currentTarget.clientWidth);
          setHeight(data.currentTarget.clientHeight);
        }}
      />
      {analyzedData.map((item: Furniture, index) => (
        <div
          className="absolute bg-yellow-500/50"
          style={{
            /* Scaling the coordinates and dimensions of a bounding box to fit the rendered image
            and converting the result to a percentage relative to the rendered image */
            top: (item.box.y1 * scale * 100) / height + "%",
            left: (item.box.x1 * scale * 100) / width + "%",
            width: ((item.box.x2 - item.box.x1) * scale * 100) / width + "%",
            height: ((item.box.y2 - item.box.y1) * scale * 100) / height + "%",
          }}
          key={index}
          onMouseEnter={() => {
            saveHoveredDetails(item);
          }}
          onMouseLeave={() => {
            saveHoveredDetails(null);
          }}
        ></div>
      ))}
    </div>
  ) : (
    <div className="flex items-center justify-center border-2 m-4 w-1/2 h-128 rounded">
      Uploaded Image Appears Here
    </div>
  );
};

export default ImageDisplay;
