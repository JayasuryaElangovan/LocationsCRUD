const ConfirmRestoreAll = ({ ref, closeModal, restoreAll }) => {
  const handleRestoreAll = () => {
    restoreAll();
    closeModal();
  };
  return (
    <dialog ref={ref}>
      <div>
        Are you sure want to restore all ?
        <div className="flex justify-around space-x-6 items-center mt-3">
          <button
            className="px-2 py-1 rounded-md bg-gray-400 text-white"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            onClick={handleRestoreAll}
            className="bg-green-500 text-white px-2 py-1 rounded-md
  "
          >
            Restore All
          </button>
        </div>
      </div>
    </dialog>
  );
};
export default ConfirmRestoreAll;
