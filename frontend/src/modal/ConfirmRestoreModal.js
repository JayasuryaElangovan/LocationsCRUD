const ConfirmRestore = ({ ref, restoreData, closeModal, handleRestore }) => {
  const handleRestoreLocation = () => {
    handleRestore(restoreData);
    closeModal();
  };
  return (
    <dialog ref={ref}>
      <div>
        Are you sure want to restore the branch of id {restoreData.branch_id} ?
        <div className="flex justify-around space-x-6 items-center mt-3">
          <button
            className="px-2 py-1 rounded-md bg-gray-400 text-white"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            onClick={handleRestoreLocation}
            className="bg-green-500 text-white px-2 py-1 rounded-md
      "
          >
            Restore
          </button>
        </div>
      </div>
    </dialog>
  );
};
export default ConfirmRestore;
