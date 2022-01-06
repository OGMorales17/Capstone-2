import React, { useState, useEffect } from "react";
import { BrowserRouter } from 'react-router-dom';
// import Navigation from './nav-bar/Navigation';
import UserContext from "./auth/UserContext";
import Loading from "./utilities/Loading"
import useLocalStorage from "./hooks/useLocalStorage";
// import NavRoutes from "./nav-bar/NavRoutes";
import CryptoHubApi from './api'
import jwt from "jsonwebtoken";
import './App.css';

export const TOKEN_STORAGE_ID = "cryptohub-token";


function App() {
    const [infoLoaded, setInfoLoaded] = useState(false);
    // const [applicationIds, setApplicationIds] = useState(new Set([]));
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

    useEffect(function loadUserInfo() {
        console.debug("App useEffect loadUserInfo", "token=", token);

        async function getCurrentUser() {
            if (token) {
                try {
                    let { username } = jwt.decode(token);
                    // put the token on the Api class so it can use it to call the API.
                    CryptoHubApi.token = token;
                    let currentUser = await CryptoHubApi.getCurrentUser(username);
                    setCurrentUser(currentUser);
                } catch (err) {
                    console.error("App loadUserInfo: problem loading", err);
                    setCurrentUser(null);
                }
            }
            setInfoLoaded(true);
        }

        // set infoLoaded to false while async getCurrentUser runs; once the
        // data is fetched (or even if an error happens!), this will be set back
        // to false to control the spinner.
        setInfoLoaded(false);
        getCurrentUser();
    }, [token]);

    /** Handles site-wide logout. */
    function logout() {
        setCurrentUser(null);
        setToken(null);
    }

    async function signup(signupData) {
        try {
            let token = await CryptoHubApi.signup(signupData);
            setToken(token);
            return { success: true };
        } catch (err) {
            console.error("signup failed", err);
            return { success: false, err };
        }
    }

    /** Handles site-wide login.
     *
     * Make sure you await this function and check its return value!
     */
    async function login(loginData) {
        try {
            let token = await CryptoHubApi.login(loginData);
            setToken(token);
            return { success: true };
        } catch (err) {
            console.error("login failed", err);
            return { success: false, err };
        }
    }


    if (!infoLoaded) return <Loading />;

    return (
        <BrowserRouter>
            <UserContext.Provider
                value={{ currentUser, setCurrentUser }}>
                <div className="App">

                    {/* <Navigation logout={logout} />
          <NavRoutes login={login} signup={signup} /> */}
                </div>
            </UserContext.Provider>
        </BrowserRouter>
    );
}

export default App;


/**
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Hello World

      </header>
    </div>
  );
}

export default App;
 */