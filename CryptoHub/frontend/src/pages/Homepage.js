// import React, { useContext } from "react";
import { Link } from "react-router-dom";
// import "./Homepage.css";
// import UserContext from "../auth/UserContext";
import { makeStyles } from '@material-ui/core/styles'

/** Homepage of site.
 *
 * Shows welcome message or login/register buttons.
 *
 * Routed at /
 *
 * Routes -> Homepage
 */

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(8),
  }
}))

function Homepage() {
  // const { currentUser } = useContext(UserContext);
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className="container text-center">
        <h1 className="mb-4 font-weight-bold">Jobly</h1>
        <p className="lead">All the jobs in one, convenient place.</p>
        <p>
          <Link className="btn btn-primary font-weight-bold m-2"
            to="/login">
            Log in
          </Link>
          <Link className="btn btn-primary font-weight-bold m-2"
            to="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Homepage;
