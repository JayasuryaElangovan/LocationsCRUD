import { Link, useLocation } from "react-router-dom";
import { dateFormatter } from "../utils/utils";

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
    <div className="flex flex-col">
      <p className="font-bold text-2xl text-center">Branch Details</p>
      <Link
        className="border px-2 py-1 w-14 bg-gray-500 text-white rounded-md"
        to="/"
      >
        Back
      </Link>
      <div>
        <p>
          <span className="font-bold text-lg">Id: </span>
          {branch_id}
        </p>
        <p>
          <span className="font-bold text-lg">Branch Closed: </span>
          {branch_is_closed ? "Yes" : "No"}
        </p>
      </div>
      <div>
        <p>
          <span className="font-bold text-lg">Date Created: </span>
          {dateFormatter(date_created)}
        </p>
      </div>
      <div>
        <p>
          <span className="font-bold text-lg">Date Updated: </span>
          {date_updated ? dateFormatter(date_updated) : "-"}
        </p>
      </div>
      <div>
        <p>
          <span className="font-bold text-lg">Address: </span>
          {address}
        </p>
      </div>
      <div>
        <p>
          <span className="font-bold text-lg">Address2: </span>
          {address2}
        </p>
      </div>
      <div>
        <p>
          <span className="font-bold text-lg">City :</span>
          {city}
        </p>
      </div>
      <div>
        <p>
          <span className="font-bold text-lg">State :</span>
          {state}
        </p>
      </div>
      <div>
        <p>
          <span className="font-bold text-lg">Zip Code :</span>
          {zip_code}
        </p>
      </div>
      <div>
        <p>
          <span className="font-bold text-lg">Latitude :</span>
          {lat}
        </p>
      </div>
      <div>
        <p>
          <span className="font-bold text-lg">Longitude :</span>
          {lon}
        </p>
      </div>
      <div>
        <p>
          <span className="font-bold text-lg">Country :</span>
          {country}
        </p>
      </div>
      <div>
        <p>
          <span className="font-bold text-lg">Country Description :</span>
          {country_description}
        </p>
      </div>
    </div>
  );
};
export default DetailsPage;
