// https://www.tradingview.com/tradingview-for-the-web/

import { makeStyles } from '@material-ui/core/styles'
import Container from "@material-ui/core/Container";
import Box from '@mui/material/Box';
import { TickerTape } from "react-ts-tradingview-widgets";
import Banner from "../components/Banner";
import { Typography } from '@mui/material';


const tickeTapeSymbols = [
    {
        "proName": "FOREXCOM:SPXUSD",
        "title": "S&P 500"
    },
    {
        "proName": "FOREXCOM:NSXUSD",
        "title": "US 100"
    },
    {
        "proName": "FX_IDC:EURUSD",
        "title": "EUR/USD"
    },
    {
        "proName": "BITSTAMP:BTCUSD",
        "title": "Bitcoin"
    },
    {
        "proName": "BITSTAMP:ETHUSD",
        "title": "Ethereum"
    },
    {
        "description": "Cardano",
        "proName": "COINBASE:ADAUSD"
    }
]

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(),
    },
    seeMore: {
        marginTop: theme.spacing(3)
    },
}))

export default function Tools() {
    const classes = useStyles()


    return (
        <div className={classes.root}>
            <Banner text={'Get all the Info regarding your favorite Crypto Currency'} />
            <Box sx={{ pt: 8 }}>
                <Container maxWidth="lg" className={classes.container}>
                    <Box sx={{ pb: 2 }}>
                        <TickerTape colorTheme="dark" displayMode="regular" symbols={tickeTapeSymbols} ></TickerTape>
                    </Box>
                    <Typography variant="h5"
                        style={{ color: "#b71c1c" }}
                        sx={{ fontWeight: 'light', mt: 3 }}>
                        Hang tight, we are working hard to bring the information of the most used tool to be successful in the crypto market.
                    </Typography>

                </Container>
            </Box >
        </div>


    )
}