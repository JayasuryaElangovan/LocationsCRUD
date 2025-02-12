import { createContext, useState } from "react";
export const TableContext = createContext();

const TableContextProvider = ({ children }) => {
  const [searchText, setSearhText] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [filter, setFilter] = useState("branch_id");
  const [order, setOrder] = useState("ASC");

  return (
    <TableContext.Provider
      value={{
        searchText,
        setSearhText,
        pageNumber,
        setPageNumber,
        filter,
        setFilter,
        order,
        setOrder,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
export default TableContextProvider;
