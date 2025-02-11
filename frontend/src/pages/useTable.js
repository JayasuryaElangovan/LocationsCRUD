import { useEffect, useState } from "react";

const useTable = ({ len, rowsPerPage }) => {
  // const [slice, setSlice] = useState([]);
  const [range, setRange] = useState([]);

  useEffect(() => {
    // const slicedData = data.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    // setSlice(slicedData);
    const noOfPages = Math.ceil(len / rowsPerPage);
    const pages = [];
    for (let i = 1; i <= noOfPages; i++) {
      pages.push(i);
    }
    setRange([...pages]);
  }, [len]);

  return { range };
};
export default useTable;
