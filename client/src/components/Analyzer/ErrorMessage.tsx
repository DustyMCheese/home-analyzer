const serverErrors = new Map([
  ["POST Request Error: 413", "Uploaded file is too large"],
  ["POST Request Error: 415", "Unsupported file type"],
  ["POST Request Error: 422", "JPEG or PNG does not contain a valid image"],
  ["POST Request Error: 500", "A server error occurred. Please try again."],
  ["Failed to fetch", "Server currently unavailable. Try again later."],
]);

interface Props {
  serverErrorMessage: string;
}

const ErrorMessage = ({ serverErrorMessage }: Props) => {
  return <p className="text-red-500">{serverErrors.get(serverErrorMessage)}</p>;
};

export default ErrorMessage;
