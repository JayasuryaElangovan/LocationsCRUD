import React, { useContext, useEffect, useRef, useState } from "react";
import { queryClient } from "../index.js";
import { FiEdit2 } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { RiDeleteBin2Line } from "react-icons/ri";
import { toast } from "react-toastify";
import useTable from "./useTable.js";
import { TableContext } from "./TableContextProvider.js";
import ConfirmRemove from "../modal/ConfirmRemove.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteLocation, fetchLocations, fetchTotal } from "../api/api.js";
const NewHome = () => {
  const [searchText, setSearhText] = useState("");
  const deleteModal = useRef();
  const [deleteId, setDeleteId] = useState("");
  const { setPageNumber, pageNumber } = useContext(TableContext);
  const { data: totalData, isLoading: isLoadingTotal } = useQuery({
    queryKey: ["getTotal", searchText],
    queryFn: () => fetchTotal(searchText),
  });

  const { data: locations, isLoading: isLoadingLocations } = useQuery({
    queryKey: ["getLocations", searchText, pageNumber],
    queryFn: () => fetchLocations(searchText, pageNumber),
  });

  const { range } = useTable({
    len: isLoadingTotal ? 0 : totalData[0].len,
    rowsPerPage: 6,
  });

  const navigate = useNavigate();
  const handleView = (locationData) => {
    navigate("/location-details", { state: { ...locationData } });
  };

  const handleEdit = (branchId) => {
    const data = locations.find((loc) => loc.branch_id === branchId);
    navigate("/edit-location", { state: { ...data } });
  };
  // const handleDelete = async (branch_id) => {
  //   const response = await axios.delete(
  //     `http://localhost:8000/delete-location/${branch_id}`
  //   );
  //   if (response.data.status === 200) {
  //

  //     const result = await axios.get(
  //       `${process.env.REACT_APP_BACKEND_URL}/get-locations?from=${
  //         (pageNumber - 1) * 6 + 1
  //       }&to=${pageNumber * 6}&searchText=${searchText}`
  //     );
  //   } else {
  //
  //   }
  // };
  const { mutate: handleDelete } = useMutation({
    mutationFn: (branch_id) => deleteLocation(branch_id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["getTotal"] });
      queryClient.invalidateQueries({ queryKey: ["getLocations"] });
      toast.success(response.data.message);
    },
    onError: () => {
      toast.error("Server Error");
    },
  });

  const handleModal = (delete_id) => {
    setDeleteId(delete_id);
    deleteModal.current.showModal();
  };
  const closeModal = () => {
    deleteModal.current.close();
  };
  const handlePrev = () => {
    setPageNumber((prev) => prev - 1);
  };
  const handleNext = () => {
    setPageNumber((curr) => curr + 1);
  };
  const handleSearch = (e) => {
    setSearhText(e.target.value);

    setPageNumber(range[0]);
  };
  return (
    <>
      <ConfirmRemove
        ref={deleteModal}
        closeModal={closeModal}
        deleteId={deleteId}
        handleDelete={handleDelete}
      />
      <div className="flex flex-col justify-between space-y-6 px-4">
        <p className="font-bold text-xl">Locations Data</p>
        <div className="flex justify-between items-center space-x-4">
          <div className="w-[75%] relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              className="w-full border-blue-500 border-2 focus:outline-none rounded-md pl-2 py-2"
              onChange={(e) => handleSearch(e)}
            />
            <button
              className={`text-red-500 text-xl absolute top-1 right-4 ${
                searchText.trim().length > 0 ? "block" : "hidden"
              }`}
              onClick={() => setSearhText("")}
            >
              x
            </button>
          </div>
          <Link
            to="/add-location"
            className="border font-semibold rounded-md bg-gray-500 hover:bg-gray-400 text-white hover:text-black px-3 py-2
             "
          >
            Add Location
          </Link>
          <Link
            to="/recently-deleted"
            className="border font-semibold rounded-md bg-gray-500 hover:bg-gray-400 text-white hover:text-black px-3 py-2"
          >
            Recently Deleted
          </Link>
        </div>

        <table className="w-full ">
          <thead className="">
            <tr className=" ">
              <th className=" bg-gray-400 py-2 px-4 ">Branch Id</th>
              <th className="  bg-gray-400 py-2 px-4">City</th>
              <th className="  bg-gray-400 py-2 px-4">State</th>
              <th className="  bg-gray-400 py-2 px-4">Country</th>
              <th className="  bg-gray-400 py-2 px-4">Country Description</th>
              <th className="  bg-gray-400 py-2 px-4">Details</th>
              <th className="  bg-gray-400 py-2 px-4">Edit</th>
              <th className="  bg-gray-400 py-2 px-4">Delete</th>
            </tr>
          </thead>
          <tbody>
            {isLoadingLocations ? (
              <tr>Fetching...</tr>
            ) : (
              locations.map((location) => (
                <tr key={location.branch_id} className="border-b border-x">
                  <td className="  text-center py-1 px-4">
                    {location.branch_id}
                  </td>
                  <td className="  py-1 px-4">{location.city}</td>
                  <td className=" py-1 px-4">{location.state}</td>
                  <td className=" py-1 px-4">{location.country}</td>
                  <td className=" py-1 px-4">{location.country_description}</td>
                  <td
                    className=" py-1 px-4 cursor-pointer text-blue-500 hover:underline text-center"
                    onClick={() => handleView(location)}
                  >
                    View
                  </td>
                  <td className="  ">
                    {" "}
                    <div className="flex justify-center">
                      {" "}
                      <button onClick={() => handleEdit(location.branch_id)}>
                        <FiEdit2 className="text-blue-500 text-center cursor-pointer hover:text-blue-400" />
                      </button>
                    </div>
                  </td>
                  <td className="text-center ">
                    <div className="flex justify-center">
                      <button onClick={() => handleModal(location.branch_id)}>
                        <RiDeleteBin2Line
                          color="red"
                          className="text-xl cursor-pointer hover:scale-110"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="flex justify-center w-full  items-center">
          <div className=" flex self-stretch border items-center space-x-3">
            <p className="font-bold">Pages: </p>
            <button
              className={`px-2 py-1 rounded-sm bg-gray-500 ${
                pageNumber < 2 ? "hidden" : ""
              }`}
              onClick={handlePrev}
            >
              Prev
            </button>
            {range.map((page) => (
              <button
                key={page}
                onClick={() => setPageNumber(page)}
                className={`${
                  pageNumber === page ? "underline" : ""
                } hover:underline`}
              >
                {page}
              </button>
            ))}
            <button
              className={`px-2 py-1  rounded-sm bg-gray-500  ${
                pageNumber === range.length ? "hidden" : ""
              }`}
              onClick={handleNext}
              disabled={pageNumber === range.length}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default NewHome;
