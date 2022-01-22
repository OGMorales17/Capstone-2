import * as React from "react";
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Homepage from "../pages/Homepage";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
// import PrivateRoute from "./PrivateRoute";
import NotFound from "../utilities/NotFound";
import News from "../pages/News"
import Education from "../pages/Education";
import Market from "../pages/Market";
import CoinDetails from "../pages/CoinDetails";


const NavRoutes = ({ login, signup }) => {

  return (
    <div className="pt-5">
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginForm login={login} />} />
        <Route path="/signup" element={<SignupForm signup={signup} />} />

        <Route path="/news" element={<News />} />
        <Route path="/education" element={<Education />} />
        <Route path="/market" element={<Market />} />
        <Route path="/market/details/:token" element={<CoinDetails />} />
        {/* <Route path="/jobs" element={<PrivateRoute><JobList /></PrivateRoute>} /> */}
        {/* <Route path="/companies/:handle" element={<PrivateRoute><CompanyDetail /></PrivateRoute>} /> */}

        <Route path="/" />

      </Routes>
    </div>
  );
}

export default NavRoutes;
