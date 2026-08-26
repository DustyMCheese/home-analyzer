const ImageForm = () => {
  return (
    <form className="flex flex-col items-center justify-center p-4">
      <label htmlFor="home-image-upload" className="w-full">
        Photo Of Home:
        <div className="flex items-center justify-center border-2 w-full h-128 rounded">
          Click to Select a File to Upload
        </div>
      </label>
      <input type="file" id="home-image-upload" className="hidden" />
      <button type="submit" className="w-1/4 mt-4 p-4 bg-gray-400">
        Submit
      </button>
    </form>
  );
};

export default ImageForm;
