import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { RiDeleteBin2Line } from "react-icons/ri";
import { MdRestore } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
const RecentlyDeleted = () => {
  const [recentlyDeleted, setRecentlyDeleted] = useState([]);

  useEffect(() => {
    async function fetchRecentlyDeleted() {
      const fetchData = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/recently-deleted`
      );
      if (fetchData.data.status === 200) {
        setRecentlyDeleted(fetchData.data.data);
      } else {
        toast.error("Error Fetching");
      }
    }
    fetchRecentlyDeleted();
  }, []);

  const handleRestore = async (locationData) => {
    const restoreResponse = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/handle-restore`,
      locationData
    );
    if (restoreResponse.data.status === 200) {
      toast.success(restoreResponse.data.message);
      const fetchData = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/recently-deleted`
      );
      if (fetchData.data.status === 200) {
        setRecentlyDeleted(fetchData.data.data);
      }
    } else {
      toast.error(restoreResponse.data.message);
    }
  };

  const handleRestoreAll = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/restore-all`
    );
    if (response.data.status === 200) {
      toast.success(response.data.message);
      const fetchData = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/recently-deleted`
      );
      if (fetchData.data.status === 200) {
        setRecentlyDeleted(fetchData.data.data);
      }
    } else {
      toast.error(response.data.message);
    }
  };
  const handleDeleteAll = async () => {
    const response = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/delete-all`
    );
    if (response.data.status === 200) {
      toast.success(response.data.message);
      const fetchData = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/recently-deleted`
      );
      if (fetchData.data.status === 200) {
        setRecentlyDeleted(fetchData.data.data);
      }
    } else {
      toast.error(response.data.message);
    }
  };

  const handleDelete = async (branch_id) => {
    const resposne = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/deleteFromRecentlyDeleted/${branch_id}`
    );
    if (resposne.data.status === 200) {
      toast.success(resposne.data.message);
    } else {
      toast.error(resposne.data.message);
    }
  };

  return (
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
            onClick={handleRestoreAll}
          >
            Restore All
          </button>
          <button
            className="border font-semibold rounded-md bg-gray-500 hover:bg-gray-400 text-white hover:text-black px-3 py-2"
            onClick={handleDeleteAll}
          >
            Delete All
          </button>
        </div>
      </div>
      {recentlyDeleted.length > 0 ? (
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
                        handleRestore(location);
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
                        handleDelete(location.branch_id);
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
  );
};
export default RecentlyDeleted;
