import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { IoMdArrowRoundBack } from "react-icons/io";
const UpdateLocation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    branch_id,
    branch_is_closed,
    address,
    address2,
    city,
    state,
    zip_code,
    lat,
    lon,
    country,
    country_description,
  } = location.state;

  const [locationData, setLocationData] = useState({
    branch_id,
    branch_is_closed,
    address,
    address2,
    city,
    state,
    zip_code,
    lat,
    lon,
    country,
    country_description,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !locationData.address ||
      !locationData.address2 ||
      !locationData.branch_id ||
      !locationData.city ||
      !locationData.state ||
      !locationData.zip_code ||
      !locationData.country ||
      !locationData.country_description
    ) {
      return;
    }
    const response = await axios.put(
      "http://localhost:8000/update-location",
      locationData
    );
    if (response.data.status === 200) {
      toast.success(response.data.message);
      setLocationData({
        branchId: "",
        branchClosed: false,
        address: "",
        address2: "",
        city: "",
        state: "",
        zip_code: "",
        lat: "",
        lon: "",
        country: "",
        country_description: "",
      });
      navigate("/");
    } else {
      toast.error(response.data.message);
    }
  };
  return (
    <div className="w-full">
      <div className="flex justify-start space-x-3 items-center">
        <Link to="/" className="text-xl">
          <IoMdArrowRoundBack />
        </Link>
        <p className="font-bold text-xl my-3">Update Location</p>
      </div>
      <form className="w-full " onSubmit={handleSubmit}>
        <div className="flex flex-wrap mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="branch_id"
            >
              Branch Id
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="branch_id"
              type="text"
              readOnly
              placeholder="123"
              value={locationData.branch_id}
            />
          </div>
        </div>
        <div className="flex flex-wrap  mb-6">
          <div className="w-full  md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="address"
              type="text"
              required
              onChange={(e) =>
                setLocationData((prev) => ({
                  ...prev,
                  address: e.target.value,
                }))
              }
              value={locationData.address}
              placeholder="Street Address"
            />
          </div>
          <div className="w-full  md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="address2"
            >
              Address2
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="address2"
              required
              onChange={(e) =>
                setLocationData((prev) => ({
                  ...prev,
                  address2: e.target.value,
                }))
              }
              value={locationData.address2}
              type="text"
              placeholder="Building/House name"
            />
          </div>
        </div>
        <div className="flex flex-wrap  mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="city"
            >
              City
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="city"
              required
              type="text"
              placeholder="Brentwood"
              onChange={(e) =>
                setLocationData((prev) => ({
                  ...prev,
                  city: e.target.value,
                }))
              }
              value={locationData.city}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="state"
            >
              State
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="state"
              required
              type="text"
              placeholder="CA"
              onChange={(e) =>
                setLocationData((prev) => ({
                  ...prev,
                  state: e.target.value,
                }))
              }
              value={locationData.state}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="zip"
            >
              Zip
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="zip"
              type="text"
              required
              placeholder="94513-7188"
              onChange={(e) =>
                setLocationData((prev) => ({
                  ...prev,
                  zip_code: e.target.value,
                }))
              }
              value={locationData.zip_code}
            />
          </div>
        </div>
        <div className="flex flex-wrap  mb-6">
          <div className="w-full  md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="country"
            >
              Country
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="country"
              type="text"
              required
              onChange={(e) =>
                setLocationData((prev) => ({
                  ...prev,
                  country: e.target.value,
                }))
              }
              value={locationData.country}
              placeholder="US"
            />
          </div>
          <div className="w-full  md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="country_description"
            >
              Country Description
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="country_description"
              type="text"
              required
              onChange={(e) =>
                setLocationData((prev) => ({
                  ...prev,
                  country_description: e.target.value,
                }))
              }
              value={locationData.country_description}
              placeholder="United States"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="border px-4 py-2 rounded-md bg-blue-600 text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default UpdateLocation;
