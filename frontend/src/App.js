import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddLocation from "./pages/AddLocation";
import Layout from "./Layout";
import DetailsPage from "./pages/DetailsPage";
import UpdateLocation from "./pages/UpateLocation";
import Home from "./pages/Home";
import RecentlyDeleted from "./pages/RecentlyDeleted";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/add-location" element={<AddLocation />} />
          <Route path="/location-details" element={<DetailsPage />} />
          <Route path="/recently-deleted" element={<RecentlyDeleted />} />
          <Route path="/edit-location" element={<UpdateLocation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
