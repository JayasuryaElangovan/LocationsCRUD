import React from "react";
import { Link, Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div className="w-full">
      <p className="text-3xl font-bold text-center text-white  bg-cyan-700 py-2">
        <Link to="/">Job Update Portal</Link>
      </p>
      <div className="px-2 py-3">
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
