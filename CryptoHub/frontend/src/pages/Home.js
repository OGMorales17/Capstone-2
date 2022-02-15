import { makeStyles } from '@material-ui/core/styles'
import Box from '@mui/material/Box';
import { TickerTape } from "react-ts-tradingview-widgets";
import Banner from "../components/Banner";
import { TechnicalAnalysis } from "react-ts-tradingview-widgets";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    CardActionArea,
    CardMedia,
} from '@mui/material';

const tickeTapeSymbols = [
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
    },
    {
        "description": "Solana",
        "proName": "BINANCEUS:SOLUSD"
    },
    {
        "description": "Terra",
        "proName": "BINANCE:LUNAUSD"
    },
    {
        "description": "Avalanche",
        "proName": "KUCOIN:AVAXUSDT"
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
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
}))

export default function Home() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Banner text={'Get all the Info regarding your favorite Crypto Currency'} />
            <Box sx={{ pt: 8 }}>
                <Box sx={{ pb: 6 }}>
                    <TickerTape colorTheme="dark" displayMode="regular" symbols={tickeTapeSymbols} ></TickerTape>
                </Box>
                <Grid cols={3} container spacing={1}>
                    <Grid item xs={12} md={12} lg={4}>
                        <CardActionArea sx={{ maxWidth: 425 }}>
                            <Card style={{ background: 'transparent' }}>
                                <CardMedia>
                                    <TechnicalAnalysis colorTheme="dark" width="425" symbol='BINANCE:BTCUSD'></TechnicalAnalysis>
                                </CardMedia>
                                <CardContent style={{ textDecoration: 'none' }}>
                                    <Typography color="text.secondary">
                                        Technical analysis gauges display real-time ratings for the selected timeframes.
                                        The summary for Bitcoin/USD Coin is based on the most popular technical indicators
                                    </Typography>
                                </CardContent>
                            </Card>
                        </CardActionArea>
                    </Grid>

                    <Grid item xs={12} md={12} lg={4}>
                        <CardActionArea sx={{ maxWidth: 425 }}>
                            <Card style={{ background: 'transparent' }}>
                                <CardMedia>
                                    <TechnicalAnalysis colorTheme="dark" width="425" symbol="COINBASE:ETHUSD"></TechnicalAnalysis>
                                </CardMedia>
                                <CardContent style={{ textDecoration: 'none' }}>
                                    <Typography color="text.secondary">
                                        Technical analysis gauges display real-time ratings for the selected timeframes.
                                        The summary for ETH/USD is based on the most popular technical indicators
                                    </Typography>
                                </CardContent>
                            </Card>
                        </CardActionArea>
                    </Grid>

                    <Grid item xs={12} md={8} lg={4} >
                        <CardActionArea sx={{ maxWidth: 425 }}>
                            <Card style={{ background: 'transparent' }}>
                                <CardMedia>
                                    <TechnicalAnalysis colorTheme="dark" width="425" symbol='CAPITALCOM:CIX'></TechnicalAnalysis>
                                </CardMedia>
                                <CardContent style={{ textDecoration: 'none' }}>
                                    <Typography color="text.secondary">
                                        The Crypto Index (CRY) consists of the 5 leading Cryptocurrency pairs in terms of Market Capitalization.
                                        The Index is weighted to make equal impact for all Crypto pairs and is considered as an important indicator of the sentiment towards Cryptocurrency pairs
                                    </Typography>
                                </CardContent>
                            </Card>
                        </CardActionArea>
                    </Grid>
                </Grid>
            </Box >
        </div >
    )
}

/**
 {/* <Grid
                        container
                        spacing={3}
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                    >
                        <Grid >

                            <CardActionArea sx={{ maxWidth: 400 }}>
                                <Card style={{ background: 'transparent' }}>
                                    <CardMedia>
                                        <TechnicalAnalysis colorTheme="dark" width="400" symbol='BINANCE:BTCUSD'></TechnicalAnalysis>
                                    </CardMedia>
                                    <CardContent style={{ textDecoration: 'none' }}>
                                        <Typography color="text.secondary">

                                        </Typography>
                                    </CardContent>
                                </Card>
                            </CardActionArea>
                            <CardActionArea sx={{ maxWidth: 400 }}>
                                <Card style={{ background: 'transparent' }}>
                                    <CardMedia>
                                        <TechnicalAnalysis colorTheme="dark" width="400" symbol="COINBASE:ETHUSD"></TechnicalAnalysis>
                                    </CardMedia>
                                    <CardContent style={{ textDecoration: 'none' }}>
                                        <Typography color="text.secondary">

                                        </Typography>
                                    </CardContent>
                                </Card>
                            </CardActionArea>
                            <CardActionArea sx={{ maxWidth: 400 }}>
                                <Card style={{ background: 'transparent' }}>
                                    <CardMedia>
                                        <TechnicalAnalysis colorTheme="dark" width="400" symbol='CAPITALCOM:CIX'></TechnicalAnalysis>
                                    </CardMedia>
                                    <CardContent style={{ textDecoration: 'none' }}>
                                        <Typography color="text.secondary">
                                            The Crypto Index (CRY) consists of the 5 leading Cryptocurrency pairs in terms of Market Capitalization.
                                            The Index is weighted to make equal impact for all Crypto pairs and is considered as an important indicator of the sentiment towards Cryptocurrency pairs
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </CardActionArea>
                        </Grid>
                    </Grid> 


 */