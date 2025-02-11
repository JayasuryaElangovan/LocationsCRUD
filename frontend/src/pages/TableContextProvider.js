import { createContext, useState } from "react";
export const TableContext = createContext();

const TableContextProvider = ({ children }) => {
  const [searchText, setSearhText] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [searchResults, setSearchresults] = useState([]);
  return (
    <TableContext.Provider
      value={{
        searchText,
        setSearhText,
        pageNumber,
        setPageNumber,
        searchResults,
        setSearchresults,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
export default TableContextProvider;
