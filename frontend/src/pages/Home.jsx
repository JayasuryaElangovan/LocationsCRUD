import React, { useContext, useRef, useState } from "react";
import { queryClient } from "../index.js";
import { FiEdit2 } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { RiDeleteBin2Line } from "react-icons/ri";
import { toast } from "react-toastify";
import useTable from "./useTable.js";
import { TableContext } from "./TableContextProvider.js";
import ConfirmRemove from "../modal/ConfirmRemoveModal.js";
import { FaCaretUp } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteLocation, fetchLocations, fetchTotal } from "../api/api.js";
const NewHome = () => {
  const deleteModal = useRef();
  const [deleteId, setDeleteId] = useState("");

  const {
    setPageNumber,
    pageNumber,
    searchText,
    setSearhText,
    filter,
    setFilter,
    order,
    setOrder,
  } = useContext(TableContext);
  const [pageValue, setPageValue] = useState(pageNumber);
  const { data: totalData, isLoading: isLoadingTotal } = useQuery({
    queryKey: ["getTotal", searchText],
    queryFn: () => fetchTotal(searchText),
  });

  const { data: locations, isLoading: isLoadingLocations } = useQuery({
    queryKey: ["getLocations", searchText, pageNumber, filter, order],
    queryFn: () => fetchLocations(searchText, pageNumber, filter, order),
  });

  const { range } = useTable({
    len: isLoadingTotal ? 0 : totalData[0].len,
    rowsPerPage: 6,
  });
  const pageRef = useRef();
  const navigate = useNavigate();
  const handleView = (locationData) => {
    navigate("/location-details", { state: { ...locationData } });
  };

  const handleEdit = (branchId) => {
    const data = locations.find((loc) => loc.branch_id === branchId);
    navigate("/edit-location", { state: { ...data } });
  };

  const { mutate: handleDelete } = useMutation({
    mutationFn: (branch_id) => deleteLocation(branch_id),
    onSuccess: (response) => {
      if (locations.length === 1 && pageNumber === range.length) {
        setPageNumber(pageNumber - 1);
        setPageValue(pageNumber - 1);
      }
      queryClient.invalidateQueries({ queryKey: ["getTotal"] });
      queryClient.invalidateQueries({ queryKey: ["getLocations"] });
      toast.success(response.data);
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
    setPageNumber((prev) => +prev - 1);
    setPageValue((prev) => +prev - 1);
  };
  const handleNext = () => {
    setPageNumber((curr) => +curr + 1);
    setPageValue((curr) => +curr + 1);
  };
  const handleSearch = (e) => {
    setSearhText(e.target.value);

    setPageNumber(range[0]);
    setPageValue(range[0]);
  };
  const handleBlur = (e) => {
    const page = pageRef.current.value;

    if (page < range[0] || page > range[range.length - 1]) {
      toast.error("Invalid Page Number");

      setPageValue(pageNumber);
    } else {
      setPageNumber(page);
      setPageValue(page);
    }
  };
  function handleClear() {
    setSearhText("");
    setPageNumber(range[0]);
    setPageValue(range[0]);
  }
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
              onChange={handleSearch}
              placeholder="Search..."
              value={searchText}
              className="w-full border-blue-500 border-2 focus:outline-none rounded-md pl-2 py-2"
            />
            <button
              className={`text-red-500 text-xl absolute top-1 right-4 ${
                searchText.trim().length > 0 ? "block" : "hidden"
              }`}
              onClick={handleClear}
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

        <table className="w-full  ">
          <thead className="">
            <tr className=" ">
              <th className=" bg-gray-400 py-2 px-4 ">
                <p className="flex items-center space-x-2">
                  <span>Branch Id</span>

                  <span>
                    <span
                      className={`cursor-pointer text-sm hover:text-gray-500 ${
                        order === "ASC" && filter === "branch_id"
                          ? "text-zinc-500"
                          : ""
                      }`}
                      onClick={() => {
                        setOrder("ASC");
                        setFilter("branch_id");
                      }}
                    >
                      <FaCaretUp />
                    </span>

                    <span
                      className={`cursor-pointer text-sm hover:text-gray-600 ${
                        order === "DESC" && filter === "branch_id"
                          ? "text-zinc-500"
                          : ""
                      }`}
                      onClick={() => {
                        setOrder("DESC");
                        setFilter("branch_id");
                      }}
                    >
                      <FaCaretDown />
                    </span>
                  </span>
                </p>
              </th>
              <th className="  bg-gray-400 py-2 px-4">
                <p className="flex items-center space-x-2">
                  <span>City</span>

                  <span>
                    <span
                      className={`cursor-pointer text-sm hover:text-gray-600 ${
                        order === "ASC" && filter === "city"
                          ? "text-zinc-500"
                          : ""
                      }`}
                      onClick={() => {
                        setOrder("ASC");
                        setFilter("city");
                      }}
                    >
                      <FaCaretUp />
                    </span>

                    <span
                      className={`cursor-pointer text-sm hover:text-gray-600 ${
                        order === "DESC" && filter === "city"
                          ? "text-zinc-500"
                          : ""
                      }`}
                      onClick={() => {
                        setOrder("DESC");
                        setFilter("city");
                      }}
                    >
                      <FaCaretDown />
                    </span>
                  </span>
                </p>
              </th>
              <th className="  bg-gray-400 py-2 px-4">
                <p className="flex items-center space-x-2">
                  <span>State</span>

                  <span>
                    <span
                      className={`cursor-pointer text-sm hover:text-gray-600 ${
                        order === "ASC" && filter === "state"
                          ? "text-zinc-500"
                          : ""
                      }`}
                      onClick={() => {
                        setOrder("ASC");
                        setFilter("state");
                      }}
                    >
                      <FaCaretUp />
                    </span>

                    <span
                      className={`cursor-pointer text-sm hover:text-gray-600 ${
                        order === "DESC" && filter === "state"
                          ? "text-zinc-500"
                          : ""
                      }`}
                      onClick={() => {
                        setOrder("DESC");
                        setFilter("state");
                      }}
                    >
                      <FaCaretDown />
                    </span>
                  </span>
                </p>
              </th>
              <th className="  bg-gray-400 py-2 px-4">
                <p className="flex items-center space-x-2">
                  <span>Country</span>

                  <span>
                    <span
                      className={`cursor-pointer text-sm hover:text-gray-600 ${
                        order === "ASC" && filter === "country"
                          ? "text-zinc-500"
                          : ""
                      }`}
                      onClick={() => {
                        setOrder("ASC");
                        setFilter("country");
                      }}
                    >
                      <FaCaretUp />
                    </span>

                    <span
                      className={`cursor-pointer text-sm hover:text-gray-600 ${
                        order === "DESC" && filter === "country"
                          ? "text-zinc-500"
                          : ""
                      }`}
                      onClick={() => {
                        setOrder("DESC");
                        setFilter("country");
                      }}
                    >
                      <FaCaretDown />
                    </span>
                  </span>
                </p>
              </th>
              <th className=" bg-gray-400 py-2 px-4 ">
                <p className="flex items-center space-x-2">
                  <span>Country Description</span>

                  <span>
                    <span
                      className={`cursor-pointer text-sm hover:text-gray-600 ${
                        order === "ASC" && filter === "country_description"
                          ? "text-zinc-500"
                          : ""
                      }`}
                      onClick={() => {
                        setOrder("ASC");
                        setFilter("country_description");
                      }}
                    >
                      <FaCaretUp />
                    </span>

                    <span
                      className={`cursor-pointer text-sm hover:text-gray-600 ${
                        order === "DESC" && filter === "country_description"
                          ? "text-zinc-500"
                          : ""
                      }`}
                      onClick={() => {
                        setOrder("DESC");
                        setFilter("country_description");
                      }}
                    >
                      <FaCaretDown />
                    </span>
                  </span>
                </p>
              </th>

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
          <div className="flex border py-1 px-1 space-x-3">
            <button
              className="px-2 py-1 bg-gray-500 text-white rounded-md disabled:bg-gray-300"
              onClick={handlePrev}
              disabled={pageNumber < 2}
            >
              Prev
            </button>
            <p className="py-1">
              Page{" "}
              <input
                value={pageValue}
                ref={pageRef}
                onChange={(e) => setPageValue(e.target.value)}
                onBlur={handleBlur}
                className="w-6 border rounded-sm text-center"
              />{" "}
              of {`${range.length}`}
            </p>
            <button
              className="px-2 py-1 bg-gray-500 text-white rounded-md disabled:bg-gray-300"
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
