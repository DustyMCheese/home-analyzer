import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type FormFields = {
  image: FileList;
};

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

const ImageForm = () => {
  const { register, handleSubmit } = useForm<FormFields>();
  const { mutate } = useMutation({ mutationFn: sendImage });

  return (
    <form
      className="flex flex-col items-center justify-center p-4"
      onSubmit={handleSubmit((data) => {
        mutate(data.image);
      })}
    >
      <label htmlFor="home-image-upload" className="w-full">
        Photo Of Home:
        <div className="flex items-center justify-center border-2 w-full h-128 rounded">
          Click to Select a File to Upload
        </div>
      </label>
      <input
        {...register("image")}
        type="file"
        id="home-image-upload"
        className="hidden"
      />
      <button type="submit" className="w-1/4 mt-4 p-4 bg-gray-400">
        Submit
      </button>
    </form>
  );
};

export default ImageForm;
