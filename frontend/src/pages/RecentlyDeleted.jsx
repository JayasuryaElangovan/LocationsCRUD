import { toast } from "react-toastify";
import { RiDeleteBin2Line } from "react-icons/ri";
import { MdRestore } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteAllLocation,
  fetchRecentlyDeleted,
  permanentlyDelete,
  restoreAllLocations,
  restoreLocation,
} from "../api/api";
import { queryClient } from "../index.js";
import ConfirmDeleteAll from "../modal/ConfirmDeletelAllModal";

import ConfirmRestore from "../modal/ConfirmRestoreModal";
import ConfirmRestoreAll from "../modal/ConfirmRestoreAllModal";
import { useRef, useState } from "react";
import ConfirmDeleteModal from "../modal/ConfirmDeleteModal";
const RecentlyDeleted = () => {
  const restoreRef = useRef();
  const deleteRef = useRef();
  const deleteAllRef = useRef();
  const restoreAllRef = useRef();
  const [deleteData, setDeleteData] = useState({});
  const [restoreData, setRestoreData] = useState({});

  // API Handles

  const { data: recentlyDeleted = [], isLoading } = useQuery({
    queryKey: ["recentlyDeleted"],
    queryFn: fetchRecentlyDeleted,
  });
  const { mutate: handleDeleteAll } = useMutation({
    mutationFn: deleteAllLocation,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["recentlyDeleted"] });
      toast.success(response.data);
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });
  const { mutate: handleRestore } = useMutation({
    mutationFn: (locationData) => restoreLocation(locationData),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["recentlyDeleted"] });
      toast.success(response.data);
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });
  const { mutate: handleRestoreAll } = useMutation({
    mutationFn: restoreAllLocations,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["recentlyDeleted"] });
      toast.success(response.data);
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });
  const { mutate: handleDelete } = useMutation({
    mutationFn: (locationData) =>
      permanentlyDelete(locationData.branch_id, locationData.id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["recentlyDeleted"] });
      toast.success(response.data);
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });

  // Delete Modal Functions
  const handleDeleteModal = (deleteData) => {
    deleteRef.current.showModal();
    setDeleteData(deleteData);
  };

  const handleCloseDeleteModal = () => {
    deleteRef.current.close();
  };

  // Restore Modal Functions
  const handleRestoreModal = (restore_data) => {
    restoreRef.current.showModal();
    setRestoreData(restore_data);
  };
  const handleCloseRestoreModal = () => {
    restoreRef.current.close();
  };

  // Restore All Modal Functions

  const handleRestoreAllModal = () => {
    restoreAllRef.current.showModal();
  };
  const handleCloseRestoreAllModal = () => {
    restoreAllRef.current.close();
  };

  // Delete All Modal Functions

  const handleDeleteAllModal = () => {
    deleteAllRef.current.showModal();
  };
  const handleCloseDeleteAllModal = () => {
    deleteAllRef.current.close();
  };
  return (
    <>
      <ConfirmDeleteAll
        ref={deleteAllRef}
        closeModal={handleCloseDeleteAllModal}
        deleteAll={handleDeleteAll}
      />
      <ConfirmDeleteModal
        ref={deleteRef}
        closeModal={handleCloseDeleteModal}
        deleteData={deleteData}
        handleDelete={handleDelete}
      />
      <ConfirmRestore
        ref={restoreRef}
        restoreData={restoreData}
        closeModal={handleCloseRestoreModal}
        handleRestore={handleRestore}
      />
      <ConfirmRestoreAll
        ref={restoreAllRef}
        closeModal={handleCloseRestoreAllModal}
        restoreAll={handleRestoreAll}
      />
      <div className="flex flex-col space-y-4 px-4">
        <div className="flex justify-between items-center">
          <div className="w-1/2 flex items-center space-x-3">
            <Link to="/" className="text-xl">
              <IoMdArrowRoundBack />
            </Link>
            <p className=" text-xl font-bold"> Recently Deleted</p>
          </div>
          <div
            className={`${
              recentlyDeleted.length > 0
                ? "w-1/2 flex space-x-5  justify-end   items-center "
                : "hidden"
            }`}
          >
            <button
              className="border rounded-md font-semibold bg-gray-500 hover:bg-gray-400 text-white hover:text-black px-3 py-2"
              onClick={handleRestoreAllModal}
            >
              Restore All
            </button>
            <button
              className="border font-semibold rounded-md bg-gray-500 hover:bg-gray-400 text-white hover:text-black px-3 py-2"
              onClick={handleDeleteAllModal}
            >
              Delete All
            </button>
          </div>
        </div>
        {isLoading ? (
          <p>Fetching...</p>
        ) : recentlyDeleted.length > 0 ? (
          <table className="w-full ">
            <thead className="">
              <tr className=" ">
                <th className=" bg-gray-400 py-2 px-4 ">Branch Id</th>
                <th className="  bg-gray-400 py-2 px-4">City</th>
                <th className="  bg-gray-400 py-2 px-4">State</th>
                <th className="  bg-gray-400 py-2 px-4">Country</th>
                <th className="  bg-gray-400 py-2 px-4">Country Description</th>

                <th className="  bg-gray-400 py-2 px-4">Restore</th>
                <th className="  bg-gray-400 py-2 px-4">Delete</th>
              </tr>
            </thead>

            <tbody>
              {recentlyDeleted.map((location) => (
                <tr key={location.branch_id} className="border-b border-x">
                  <td className="  text-center py-1 px-4">
                    {location.branch_id}
                  </td>
                  <td className="  py-1 px-4">{location.city}</td>
                  <td className=" py-1 px-4">{location.state}</td>
                  <td className=" py-1 px-4">{location.country}</td>
                  <td className=" py-1 px-4">{location.country_description}</td>
                  <td>
                    <div className="flex justify-center">
                      <button
                        onClick={() => {
                          handleRestoreModal(location);
                        }}
                      >
                        <MdRestore
                          color="green"
                          className="text-xl cursor-pointer hover:scale-110"
                        />
                      </button>
                    </div>
                  </td>
                  <td className="text-center ">
                    <div className="flex justify-center">
                      <button
                        onClick={() => {
                          handleDeleteModal(location);
                        }}
                      >
                        <RiDeleteBin2Line
                          color="red"
                          className="text-xl cursor-pointer hover:scale-110"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-2xl">Nothing in the bin</p>
        )}
      </div>
    </>
  );
};
export default RecentlyDeleted;
