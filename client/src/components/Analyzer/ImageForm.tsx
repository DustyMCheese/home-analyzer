import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import type { Furniture } from "./types";
import ErrorMessage from "./ErrorMessage";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const MAX_FILE_SIZE = 10485760;

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
    throw new Error("POST Request Error: " + response.status);
  }

  return response.json();
}

const ImageForm = ({ saveImage, saveAnalyzedData }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();
  const { mutate, error: mutateError } = useMutation({
    mutationFn: sendImage,
    onSuccess: (data, variables) => {
      // Saving the File object of the image to help display it
      saveImage(variables[0]);
      saveAnalyzedData(data);
    },
  });

  return (
    <form
      className="m-4 flex w-1/2 flex-col items-center justify-center lg:w-1/3"
      onSubmit={handleSubmit((data) => {
        mutate(data.image);
      })}
    >
      <label
        htmlFor="home-image-upload"
        className="w-full hover:cursor-pointer"
      >
        <div className="m-4 flex h-64 flex-col items-center justify-center rounded border-2 bg-gray-100 p-4 text-center hover:bg-gray-200 lg:h-128">
          <p className="mb-3">Click to Select a File to Upload</p>
          <p className="text-xs text-gray-500">
            (Only PNG and JPEG files with max size of 10MB)
          </p>
        </div>
      </label>
      <input
        {...register("image", {
          required: { value: true, message: "File is required" },
          validate: (file: FileList) => {
            if (file[0].type !== "image/png" && file[0].type !== "image/jpeg") {
              return "Invalid file type";
            } else if (file[0].size > MAX_FILE_SIZE) {
              return "File is too large";
            }
            return true;
          },
        })}
        type="file"
        id="home-image-upload"
        className="hidden"
      />
      {errors.image ? (
        <p className="text-red-500">{errors.image.message}</p>
      ) : null}
      {/* Only display a server error when no client error is displayed as client errors represent the most recent issue */}
      {mutateError && errors.image === undefined ? (
        <ErrorMessage serverErrorMessage={mutateError.message}></ErrorMessage>
      ) : null}
      <button
        type="submit"
        className="mt-4 w-1/2 rounded bg-gray-400 p-4 hover:cursor-pointer hover:bg-gray-500 md:w-1/4"
      >
        Submit
      </button>
      <p className="m-2 text-xs text-gray-500">
        Note: All images uploaded are processed and displayed for this session
        and not stored. Since this is a personal project, there are no
        guarantees about the performance, reliability or service provided. Use
        this tool responsibly.
      </p>
    </form>
  );
};

export default ImageForm;
