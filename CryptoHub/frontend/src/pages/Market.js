import { useState, useEffect } from "react";
import TableComponent from "../components/Table";
import EnhancedTableHead from "../components/TableHead";
import EnhancedTableToolbar from "../components/TableToolbar";
import CryptoHubApi from "../api";
import Container from "@material-ui/core/Container";
import Banner from "../components/Banner";
import { Box } from "@mui/system";
import Search from "../utilities/Search";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgressWithLabel from "../utilities/Loading";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(),
    },
    seeMore: {
        marginTop: theme.spacing(3)
    },
}));


const headCells = [
    {
        id: 'rank',
        numeric: false,
        disablePadding: true,
        label: 'Rank',
    },
    {
        id: 'image',
        numeric: false,
        disablePadding: true,
        label: `\u3000`, //Just an empty space
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Coins',
    },
    {
        id: 'price',
        numeric: true,
        disablePadding: false,
        label: 'Price',
    },
    {
        id: 'percentage_change_24h',
        numeric: true,
        disablePadding: false,
        label: '24h',
    },
    {
        id: 'price_change_24h',
        numeric: true,
        disablePadding: false,
        label: '24h',
    },
    {
        id: 'total_volume',
        numeric: true,
        disablePadding: false,
        label: '24h Volume',
    },
    {
        id: 'market_cap',
        numeric: true,
        disablePadding: false,
        label: 'Mkt Cap',
    },
];

function childCallBack(props) {
    return (
        <EnhancedTableHead data={headCells} {...props} />
    )
}

export default function Market() {
    const [market, setMarket] = useState(null);
    const classes = useStyles()

    useEffect(function getMarketOnMount() {
        search();
    }, []);

    async function search() {
        let market = await CryptoHubApi.getMarket();
        setMarket(market);
    }

    if (!market) return <CircularProgressWithLabel />;

    return (
        <div className={classes.root}>
            <Banner text={'Get all the Info regarding your favorite Crypto Currency'} />
            <Box sx={{ pt: 8 }}>
                <Container maxWidth="lg" className={classes.container}>
                    <Search />
                    <TableComponent
                        market={market}
                        EnhancedTableToolbar={EnhancedTableToolbar}
                        EnhancedTableHead={childCallBack}
                    />
                </Container>
            </Box>
        </div>

    )
}



