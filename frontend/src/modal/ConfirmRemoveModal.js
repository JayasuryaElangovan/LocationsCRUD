const ConfirmRemove = ({ closeModal, handleDelete, ref, deleteId }) => {
  const handleRecentlyDeleted = () => {
    handleDelete(deleteId);
    closeModal();
  };
  return (
    <dialog ref={ref}>
      <div>
        Are you sure want to move the branch of id {deleteId} to recently
        deleted ?
        <div className="flex justify-around space-x-6 items-center mt-3">
          <button
            className="px-2 py-1 rounded-md bg-gray-400 text-white"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            onClick={handleRecentlyDeleted}
            className="bg-red-500 text-white px-2 py-1 rounded-md
          "
          >
            Delete
          </button>
        </div>
      </div>
    </dialog>
  );
};
export default ConfirmRemove;
