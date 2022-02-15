import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles'
import Loading from "../utilities/Loading";
import CryptoHubApi from "../api";
import { useParams } from "react-router";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Grid, Typography } from '@mui/material'
import moment from "moment";
import Link from '@mui/material/Link';
import { SymbolOverview } from "react-ts-tradingview-widgets";
import Banner from "../components/Banner";
import Search from "../utilities/Search";
import Container from "@material-ui/core/Container";
import { useNavigate } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(),
    },
    seeMore: {
        marginTop: theme.spacing(3),
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto"
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
}));

function createData(name, data) {
    return { name, data };
}

function numberWithCommas(num) {
    const numSplit = num.toString().split('.')
    const formated = numSplit[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if (numSplit[1])
        return [formated, numSplit[1]].join('.')
    return formated
}



const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function CoinDetails() {
    const [coinDetails, setCoinDetails] = useState([]);
    const classes = useStyles()
    const params = useParams()
    const navigate = useNavigate();


    const symbols = [
        [
            `${coinDetails.id}USD|1D`
        ],
    ]

    let isoDateL = coinDetails.atl_date;
    let isoDateH = coinDetails.ath_date;

    let newDateL = moment.utc(isoDateL).format("MMM Do, YYYY");
    let newDateH = moment.utc(isoDateH).format("MMM Do, YYYY");

    const rows = [
        createData("Market Cap Rank", `${coinDetails.rank}`),
        createData("Market Cap", numberWithCommas(`$${coinDetails.market_cap}`)),
        createData("Trading Volume", numberWithCommas(`$${coinDetails.total_volume}`)),
        createData("24h Low / 24h High", `$${coinDetails.low_24h} / $${coinDetails.high_24h}`),
        createData("All-Time High", `$${coinDetails.ath} / ${newDateH}`),
        createData("All-Time Low", `$${coinDetails.atl} / ${newDateL}`),
        createData("Home page",
            <Link href={coinDetails.homepage} target="_blank" underline="hover">
                {coinDetails.homepage}
            </Link>),
        createData("Price Change 24h",
            `${coinDetails.price_change_percentage_24h} %`
        ),
        createData("Price Change 7d",
            `${coinDetails.price_change_percentage_7d} %`
        ),
        createData("Price Change 14d",
            `${coinDetails.price_change_percentage_14d} %`
        ),
        createData("Price Change 30d",
            `${coinDetails.price_change_percentage_30d} %`
        )
    ];


    useEffect(function getDetailsOnMount() {
        search(params.token.toLowerCase());
    }, [params]);

    async function search(coinName) {
        let coinDetails = await CryptoHubApi.getCoinDetails(coinName);
        setCoinDetails(coinDetails);
    }
    // const tickers = coinDetails.tickers
    // tickers.map(tk => tk.trade_url)

    // console.log('tickers map', tickers.map(tk => tk.market.name))

    if (!coinDetails) return <Loading />;

    return (
        <div className={classes.root}>

            <Banner text={'Get all the Info regarding your favorite Crypto Currency'} />

            <Container maxWidth="lg" className={classes.container}>

                <Search />
                <Box sx={{ width: '100%' }}>
                    <div className={classes.appBarSpacer} />

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={4}>
                            <TableContainer component={Paper}>
                                <div className={classes.root}>
                                    <Typography variant="h8">
                                        (&nbsp;{coinDetails.id}&nbsp;)&nbsp;&nbsp;Price and Market Stats By CoinGecko
                                    </Typography>
                                </div>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>{coinDetails.name}&nbsp;Price</TableCell>
                                            <TableCell align="right">{`$ ${coinDetails.price}`}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        {rows.map((row) => (
                                            <TableRow
                                                key={row.name}
                                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="right">{row.data}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item xs={8}>
                            <Box sx={{ pb: 2 }}>
                                <SymbolOverview colorTheme="dark" fontColor="rgba(230, 145, 56, 1)" autosize symbols={symbols} />
                                <Item variant="h6">
                                    <Typography variant="h8" gutterBottom>
                                        <Link href='https://www.tradingview.com/' target="_blank" underline="hover">
                                            Click here for an advance TradingView chart
                                        </Link>
                                    </Typography>
                                </Item>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 5 }}>
                            <Item variant="h6">
                                <Typography variant="h8" gutterBottom>
                                    {coinDetails.description}
                                </Typography>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </div>
    )

}


























