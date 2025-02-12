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

export const fetchLocations = async (searchText, pageNumber, filter, order) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/get-locations?from=${
      (pageNumber - 1) * 6 + 1
    }&to=${
      pageNumber * 6
    }&searchText=${searchText}&sortBy=${filter}&order=${order}`
  );
  return response.data;
};

export async function deleteLocation(branch_id) {
  const response = await axios.delete(
    `http://localhost:8000/delete-location/${branch_id}`
  );
  return response;
}
export const restoreLocation = async (locationData) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/handle-restore`,
    locationData
  );
  return response;
};

export const deleteAllLocation = async () => {
  const response = await axios.delete(
    `${process.env.REACT_APP_BACKEND_URL}/delete-all`
  );
  return response;
};

export const fetchRecentlyDeleted = async () => {
  const fetchData = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/recently-deleted`
  );
  return fetchData.data;
};

export const restoreAllLocations = async () => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/restore-all`
  );
  return response;
};
export const permanentlyDelete = async (branch_id, id) => {
  const resposne = await axios.delete(
    `${process.env.REACT_APP_BACKEND_URL}/deleteFromRecentlyDeleted/${branch_id}/${id}`
  );
  return resposne;
};
