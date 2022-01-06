import { FaSpinner } from 'react-icons/fa';
import React from "react";
import "./Loading.css";

/** Loading message used by components that fetch API data. */

function Loading() {
    return (
        <div className="Loading">
            <FaSpinner size={70} />
        </div>
    );
}

export default Loading;