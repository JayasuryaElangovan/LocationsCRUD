import { useEffect, useState } from "react";

const useTable = ({ len, rowsPerPage }) => {
  const [range, setRange] = useState([]);

  useEffect(() => {
    const noOfPages = Math.ceil(len / rowsPerPage);
    const pages = [];
    for (let i = 1; i <= noOfPages; i++) {
      pages.push(i);
    }
    setRange([...pages]);
  }, [len, rowsPerPage]);

  return { range };
};
export default useTable;
