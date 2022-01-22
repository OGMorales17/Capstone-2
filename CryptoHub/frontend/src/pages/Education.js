import React, { useState, useEffect } from "react";
import CryptoHubApi from "../api";
import Loading from "../utilities/Loading";
import { makeStyles } from '@material-ui/core/styles'
import Container from "@material-ui/core/Container";
import Box from '@mui/material/Box';
import { TechnicalAnalysis } from "react-ts-tradingview-widgets";
import { SymbolOverview } from "react-ts-tradingview-widgets";

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
        "BINANCE:BTCUSDT|12M"
    ],
    [
        "Ehereum",
        "BINANCE:ETHUSDT|12M"
    ],
    [
        "Cardano",
        "BINANCE:ADAUSDT|12M"
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
        <div className={classes.root}>
            <Box sx={{ width: '100%', textAlign: 'center' }}>
                <Container maxWidth="md">
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
                </Container>
            </Box>
            <Box sx={{ pt: 8 }}>
                <Box sx={{ pb: 2 }}>
                    <SymbolOverview colorTheme="dark" width="100%" height="300" symbols={symbols} />
                </Box>
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