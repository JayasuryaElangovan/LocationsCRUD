import axios from "axios";

export const fetchTotal = async (searchText) => {
  let getTotalRequests = "";
  if (searchText.trim().length > 0) {
    getTotalRequests = `${process.env.REACT_APP_BACKEND_URL}/total-locations?searchText=${searchText}`;
  } else {
    getTotalRequests = `${process.env.REACT_APP_BACKEND_URL}/total-locations`;
  }
  const response = await axios.get(getTotalRequests);
  return response.data;
};

export const fetchLocations = async (searchText, pageNumber) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/get-locations?from=${
      (pageNumber - 1) * 6 + 1
    }&to=${pageNumber * 6}&searchText=${searchText}`
  );
  return response.data;
};

export async function deleteLocation(branch_id) {
  const response = await axios.delete(
    `http://localhost:8000/delete-location/${branch_id}`
  );
  return response;
}
