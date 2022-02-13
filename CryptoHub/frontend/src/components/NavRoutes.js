import * as React from "react";
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from "../pages/Homepage";
import NotFound from "../utilities/NotFound";
import News from "../pages/News"
import Learn from "../pages/Learn";
import Market from "../pages/Market";
import CoinDetails from "../pages/CoinDetails";


const NavRoutes = () => {

  return (
    <div className="pt-5">
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/news" element={<News />} />
        <Route path="/education/:token" element={<Learn />} />
        <Route path="/market" element={<Market />} />
        <Route path="/market/details/:token" element={<CoinDetails />} />
        {/* <Route path="/" /> */}
      </Routes>
    </div>
  );
}

export default NavRoutes;
