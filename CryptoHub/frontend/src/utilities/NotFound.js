import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";


/** This the the customr 404 section if the route couldnt find anything match*/
const NotFound = () => {
  return (
    <div className="Homepage">
      <div className="container text-center">
        <h1 className="mb-4 font-weight-bold">Hmmm. I can't seem to find what you want.</h1>
        <p className="lead">Try to sign up or log in.</p>
        <p>
          <Link className="btn btn-primary font-weight-bold m-2"
            to="/home">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
