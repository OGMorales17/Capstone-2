import { Container, makeStyles, Typography } from "@material-ui/core";
import { TechnicalAnalysis } from "react-ts-tradingview-widgets";
import { SymbolOverview } from "react-ts-tradingview-widgets";

import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    banner: {
    },
    bannerContent: {
        height: 200,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around",

    },
    tagline: {
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
    },
}));

function Banner() {
    const classes = useStyles();

    return (
        <div >
            {/* <Container className={classes.bannerContent}> */}
            {/* <div className={classes.tagline}> */}
            <Box>
                <TechnicalAnalysis colorTheme="dark" width="350" height='400' symbol="BINANCE:BTCUSDT">
                </TechnicalAnalysis>
            </Box>

            {/* </div> */}
            {/* </Container>  */}
        </div>
    );
}

export default Banner;