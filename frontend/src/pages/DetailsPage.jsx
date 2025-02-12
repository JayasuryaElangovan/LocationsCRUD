import { Link, useLocation } from "react-router-dom";
import { dateFormatter } from "../utils/utils";
import { IoMdArrowRoundBack } from "react-icons/io";

const DetailsPage = () => {
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
    date_created,
    date_updated,
    country_description,
  } = location.state;

  return (
    <div className="flex flex-col space-y-4 ">
      <div className="w-1/2 flex items-center space-x-3">
        <Link to="/" className="text-xl">
          <IoMdArrowRoundBack />
        </Link>
        <p className=" text-xl font-bold"> Branch Details :</p>
      </div>

      <div className="flex justify-between items-center space-x-4 mx-32">
        <div className="w-1/2 border self-stretch flex flex-col px-2 bg-gray-200 rounded-md py-1">
          <span className="font-bold text-lg">Branch Id: </span>
          <span>{branch_id}</span>
        </div>
        <div className="w-1/2 border flex flex-col  px-2 bg-gray-200 rounded-md py-1">
          <span className="font-bold text-lg">City: </span>
          <span>{city}</span>
        </div>
      </div>
      <div className="flex justify-center items-center space-x-4 mx-32">
        <div className="w-1/2 border self-stretch flex flex-col px-2 bg-gray-200 rounded-md py-1">
          <span className="font-bold text-lg">Date Created: </span>
          <span>{dateFormatter(date_created)}</span>
        </div>
        <div className="w-1/2 border flex flex-col px-2 bg-gray-200 rounded-md py-1">
          <span className="font-bold text-lg"> Date Updated:</span>
          <span>{date_updated ? dateFormatter(date_updated) : "-"}</span>
        </div>
      </div>
      <div className="flex justify-center items-center space-x-4 mx-32">
        <div className="w-1/2 border self-stretch flex flex-col px-2 bg-gray-200 rounded-md py-1">
          <span className="font-bold text-lg">Address: </span>
          <span>{address}</span>
        </div>
        <div className="w-1/2 border flex flex-col px-2 bg-gray-200 rounded-md py-1">
          <span className="font-bold text-lg"> Address2:</span>
          <span>{address2}</span>
        </div>
      </div>
      <div className="flex justify-center items-center space-x-4 mx-32">
        <div className="w-1/2 border self-stretch flex flex-col px-2 bg-gray-200 rounded-md py-1">
          <span className="font-bold text-lg">State :</span>
          <span>{state}</span>
        </div>
        <div className="w-1/2 border flex flex-col px-2 bg-gray-200 rounded-md py-1">
          <span className="font-bold text-lg"> Zip Code :</span>
          <span> {zip_code}</span>
        </div>
      </div>
      <div className="flex justify-center items-center space-x-4 mx-32">
        <div className="w-1/2 border self-stretch flex flex-col px-2 bg-gray-200 rounded-md py-1">
          <span className="font-bold text-lg">Latitude :</span>
          <span>{lat}</span>
        </div>
        <div className="w-1/2 border flex flex-col px-2 bg-gray-200 rounded-md py-1">
          <span className="font-bold text-lg">Longitude :</span>
          <span> {lon}</span>
        </div>
      </div>
      <div className="flex justify-center items-center space-x-4 mx-32">
        <div className="w-1/2 border self-stretch flex flex-col px-2 bg-gray-200 rounded-md py-1">
          <span className="font-bold text-lg">country</span>
          <span>{country}</span>
        </div>
        <div className="w-1/2 border flex flex-col px-2 bg-gray-200 rounded-md py-1">
          <span className="font-bold text-lg">Country Description :</span>
          <span> {country_description}</span>
        </div>
      </div>
    </div>
  );
};
export default DetailsPage;
