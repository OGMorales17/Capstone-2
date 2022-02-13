import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import CryptoHubApi from "../api";
import CircularProgressWithLabel from "../utilities/Loading";
import { makeStyles } from '@material-ui/core/styles'
import Container from "@material-ui/core/Container";
import Box from '@mui/material/Box';
import Banner from "../components/Banner";
import {
    Grid,
    Card,
    CardContent,
    CardActionArea,
    Typography,
} from '@mui/material'
import LearnSearch from "../utilities/LearnSearch";
import { SymbolOverview } from "react-ts-tradingview-widgets";


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


export default function Learn() {
    const [educationById, setEducationById] = useState([]);
    const classes = useStyles()
    const params = useParams()

    useEffect(function getEducationByIdOnMount() {
        search(params.token);
    }, [params]);


    async function search(id) {
        let educationById = await CryptoHubApi.getEducationById(id);
        setEducationById(educationById);
    }


    if (!educationById) return <CircularProgressWithLabel />;

    return (
        <div className={classes.root}>
            <Banner text={'Get all the Info regarding your favorite Crypto Currency'} />
            <Box sx={{ pt: 8 }}>
                <Container maxWidth="lg" className={classes.container}>
                    <LearnSearch />
                    <Box sx={{ pb: 2 }}>
                        <SymbolOverview colorTheme="dark" width="100%" height="300" symbols={symbols} />
                    </Box>
                    <Grid
                        container
                        spacing={8}
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                    >
                        {educationById.map(n => (
                            <Grid item xs={12} sm={12} md={6} key={educationById.indexOf(n)}>
                                <CardActionArea>

                                    <Card style={{ background: 'transparent' }}>
                                        <div
                                            className="video"
                                            style={{
                                                position: "relative",
                                                paddingBottom: "56.25%",
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