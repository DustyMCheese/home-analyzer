import { useEffect, useRef } from "react";

const SubmittingModal = () => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  // Showing the Modal whenever it is created as it is hidden by default
  useEffect(() => {
    if (modalRef.current !== null) {
      modalRef.current.showModal();
    }
  }, []);

  return (
    <dialog
      className="fixed top-1/2 left-1/2 -translate-1/2 rounded-md p-4 text-center backdrop:backdrop-blur-md"
      ref={modalRef}
    >
      <h2 className="font-bold">Currently being processed by the server...</h2>
      <p className="mb-8 text-red-500">
        Warning: Due to the use of free hosting, the server may take up to a few
        minutes to process the input
      </p>
      <p className="mb-8">Feel free to watch this video demo while you wait:</p>
      <p>Thank you for your understanding</p>
    </dialog>
  );
};

export default SubmittingModal;
