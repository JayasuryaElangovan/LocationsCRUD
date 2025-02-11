import axios from "axios";
import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const AddLocation = () => {
  const [locationData, setLocationData] = useState({
    branch_id: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zip_code: 0,

    country: "",
    country_description: "",
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
    const response = await axios.post(
      "http://localhost:8000/add-location",
      locationData
    );
    if (response.data.status === 200) {
      toast.success(response.data.message);
      setLocationData({
        branch_id: "",
        branch_is_closed: false,
        address: "",
        address2: "",
        city: "",
        state: "",
        zip_code: 0,

        lat: "",
        lon: "",
        country: "",
        country_description: "",
      });
    } else {
      toast.error(response.data.message);
    }
  };
  return (
    <div className="w-full">
      <div className="flex items-center space-x-2">
        <Link to="/" className="text-xl">
          <IoMdArrowRoundBack />
        </Link>
        <p className="font-bold text-xl my-3">Add Location</p>
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
              required
              placeholder="123"
              onChange={(e) =>
                setLocationData((prev) => ({
                  ...prev,
                  branch_id: e.target.value,
                }))
              }
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
export default AddLocation;
