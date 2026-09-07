import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import type { Furniture } from "./types";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type FormFields = {
  image: FileList;
};

interface Props {
  saveImage: (file: File) => void;
  saveAnalyzedData: (result: Furniture[]) => void;
}

async function sendImage(image: FileList) {
  const formData = new FormData();
  formData.append("file", image[0]);
  const response = await fetch(BACKEND_URL + "/upload/", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Server Error" + response.status);
  }

  return response.json();
}

const ImageForm = ({ saveImage, saveAnalyzedData }: Props) => {
  const { register, handleSubmit } = useForm<FormFields>();
  const { mutate } = useMutation({
    mutationFn: sendImage,
    onSuccess: (data, variables) => {
      // Saving the File object of the image to help display it
      saveImage(variables[0]);
      saveAnalyzedData(data);
    },
  });

  return (
    <form
      className="m-4 flex w-2/3 flex-col items-center justify-center"
      onSubmit={handleSubmit((data) => {
        mutate(data.image);
      })}
    >
      <label
        htmlFor="home-image-upload"
        className="w-full hover:cursor-pointer"
      >
        <div className="m-4 flex h-128 items-center justify-center rounded border-2 bg-gray-100 hover:bg-gray-200">
          Click to Select a File to Upload
        </div>
      </label>
      <input
        {...register("image")}
        type="file"
        id="home-image-upload"
        className="hidden"
      />
      <button
        type="submit"
        className="mt-4 w-1/4 rounded bg-gray-400 p-4 hover:cursor-pointer hover:bg-gray-500"
      >
        Submit
      </button>
    </form>
  );
};

export default ImageForm;
