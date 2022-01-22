import React, { useState, useEffect } from "react";
import { BrowserRouter } from 'react-router-dom';
// import Navigation from './nav-bar/Navigation';
import UserContext from "../auth/UserContext";
import Loading from "../utilities/Loading"
import useLocalStorage from "../hooks/useLocalStorage";
// import NavRoutes from "./nav-bar/NavRoutes";
import CryptoHubApi from '../api'
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













import React, { useState, useEffect } from "react";
import CryptoHubApi from "../api";
import Loading from "../utilities/Loading";
import { makeStyles } from '@material-ui/core/styles'
import Container from "@material-ui/core/Container";
import Box from '@mui/material/Box';
import { TechnicalAnalysis } from "react-ts-tradingview-widgets";
import { SymbolOverview } from "react-ts-tradingview-widgets";

// import Banner from "./Banner";


import {
    Grid,
    Card,
    CardContent,
    CardActionArea,
    Typography,
} from '@mui/material'

const symbols = [
    [
        "Bitcoin",
        "COINBASE:BTCUSD|12M"
    ],
    [
        "Ehereum",
        "COINBASE:ETHUSD|12M"
    ],
    [
        "Cardano",
        "COINBASE:ADAUSD|12M"
    ]
]



const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(),
    },
    seeMore: {
        marginTop: theme.spacing(3)
    },
    chart: {
        autosize: true,
        colorTheme: "dark",
        chartOnly: false,
        width: 1400,
        height: 400,
        locale: "en",
        gridLineColor: "rgba(42 ,46, 57, 0)",
        fontColor: "#787B86",
        isTransparent: false,
        showFloatingTooltip: true,
        showVolume: false,
        scalePosition: "no",
        scaleMode: "Normal",
        fontFamily: "Trebuchet MS, sans-serif",
        noTimeScale: false,
        chartType: "area",
        lineColor: "#2962FF",
        bottomColor: "rgba(41, 98, 255, 0)",
        topColor: "rgba(41, 98, 255, 0.3)",
        // container_id: "tradingview_bd51c"
    }
}))

export default function Education() {
    const [education, setEducation] = useState(null);
    const classes = useStyles()

    useEffect(function getEducationOnMount() {
        console.debug("Education useEffect getNewsOnMount");
        search();
    }, []);

    async function search() {
        let education = await CryptoHubApi.getEducation();
        setEducation(education);
    }

    if (!education) return <Loading />;

    return (
        <div >
            {/* <Box sx={{ width: '100%', textAlign: 'center', py: 8, }}> */}
            {/* <Banner /> */}
            {/* <SymbolOverview className={classes.chart} symbols={symbols} /> */}

            <SymbolOverview colorTheme="dark"
                autosize
                chartType="area"
                downColor="#800080"
                borderDownColor="#800080"
                wickDownColor="#800080" />
            {/* <Container maxWidth="md">
                    <div className={classes.root}>
                        <Typography variant="h2" gutterBottom>
                            CryptoHub
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            style={{
                                color: "darkgrey",
                                textTransform: "capitalize",
                            }}
                        >
                            Get all the Info regarding your favorite Crypto Currency
                        </Typography>
                    </div>
                </Container> */}
            {/* </Box> */}
            <Box sx={{ pt: 8 }}>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid
                        container
                        spacing={8}
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                    >
                        {education.map(n => (
                            <Grid item xs={12} sm={12} md={6} key={education.indexOf(n)}>
                                <CardActionArea>

                                    <Card style={{ background: 'transparent' }}>
                                        <div
                                            className="video"
                                            style={{
                                                position: "relative",
                                                paddingBottom: "56.25%" /* 16:9 */,
                                                paddingTop: 25,
                                                height: 0
                                            }}
                                        >
                                            <iframe
                                                style={{
                                                    position: "absolute",
                                                    top: 0,
                                                    left: 0,
                                                    width: "100%",
                                                    height: "100%"
                                                }}
                                                src={`https://www.youtube.com/embed/${n.id}`}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                title="Embedded youtube"
                                            />
                                        </div>
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>
                                                {n.title}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </CardActionArea>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </div>

    )
}


/** Creadits To
 * 
 * https://kevinsimper.medium.com/full-width-youtube-embed-with-react-js-responsive-embed-509de7e7c3bf
 * 
 * https://dev.to/bravemaster619/simplest-way-to-embed-a-youtube-video-in-your-react-app-3bk2
 * 
 * To add more content, I could scrap some information out of this site
 * https://changelly.com/blog/most-profitable-coins-to-mine/amp/
 * https://stackoverflow.com/questions/23343191/copying-html-code-in-google-chromes-inspect-element/44705304
 */