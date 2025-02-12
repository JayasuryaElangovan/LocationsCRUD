const ConfirmDeleteAll = ({ ref, closeModal, deleteAll }) => {
  const handleDeleteAll = () => {
    deleteAll();
    closeModal();
  };
  return (
    <dialog ref={ref}>
      <div>
        Are you sure want to permanently delete all ?
        <div className="flex justify-around space-x-6 items-center mt-3">
          <button
            className="px-2 py-1 rounded-md bg-gray-400 text-white"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteAll}
            className="bg-red-500 text-white px-2 py-1 rounded-md
      "
          >
            Delete All
          </button>
        </div>
      </div>
    </dialog>
  );
};
export default ConfirmDeleteAll;
