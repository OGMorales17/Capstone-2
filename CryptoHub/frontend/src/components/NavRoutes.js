import * as React from "react";
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from "../pages/LandingPage";
import NotFound from "../utilities/NotFound";
import Home from "../pages/Home"
import News from "../pages/News"
import Learn from "../pages/Learn";
import Market from "../pages/Market";
import CoinDetails from "../pages/CoinDetails";
import Tools from "../pages/Tools";


const NavRoutes = () => {

  return (
    <div className="pt-5">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/market" element={<Market />} />
        <Route path="/market/details/:token" element={<CoinDetails />} />
        <Route path="/education/:token" element={<Learn />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default NavRoutes;
