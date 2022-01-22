import React, { useState, useEffect } from "react";
import CryptoHubApi from "../api";
import Loading from "../utilities/Loading";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddTaskIcon from '@mui/icons-material/AddTask';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { TechnicalAnalysis } from "react-ts-tradingview-widgets";
import CointDetails from "./CoinDetails";
import { useNavigate } from "react-router";


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(),
    },
    seeMore: {
        marginTop: theme.spacing(3)
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


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
    {
        id: 'rank',
        numeric: false,
        disablePadding: true,
        label: '#',
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
        // label: ` \u3000#\u3000\u3000\u3000\u3000Coins`,
    },
    {
        id: 'price',
        numeric: true,
        disablePadding: false,
        label: 'Price',
    },
    {
        id: 'price_change_percentage_24h',
        numeric: true,
        disablePadding: false,
        label: '24h Change',
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

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        icon={<StarOutlineIcon />}
                        checkedIcon={<StarIcon />}
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} Token selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    CryptoHub
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Add">
                    <IconButton>
                        <AddTaskIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function Market() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('price');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [market, setMarket] = useState(null);
    const navigate = useNavigate()
    const classes = useStyles()

    useEffect(function getNewsOnMount() {
        search();
    }, []);

    async function search() {
        let market = await CryptoHubApi.getMarket();
        setMarket(market);
    }

    function numberWithCommas(num) {
        const numSplit = num.toString().split('.')
        const formated = numSplit[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        if (numSplit[1])
            return [formated, numSplit[1]].join('.')
        return formated
    }


    if (!market) return <Loading />;

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = market.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - market.length) : 0;

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
            <Container maxWidth="lg" className={classes.container}>
                <Box sx={{ width: '100%' }}>
                    <div className={classes.appBarSpacer} />
                    <EnhancedTableToolbar numSelected={selected.length} />
                    <TableContainer >
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={market.length}
                            />
                            <TableBody>
                                {market.slice().sort(getComparator(orderBy)) // If add order, will change the order in tha the coins are being render
                                    // {market.slice().sort(getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const profit = row.price_change_24h > 0;
                                        const isItemSelected = isSelected(row.name);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                onClick={(event) => navigate(`/market/details/${row.id}`)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.name}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        onClick={(event) => handleClick(event, row.id)}
                                                        icon={<StarOutlineIcon />}
                                                        checkedIcon={<StarIcon />}
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                >
                                                    {row.rank}
                                                    {/* &nbsp;&nbsp;{row.name} */}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <img
                                                        src={row?.image}
                                                        alt={row.name}
                                                        height="25"
                                                        style={{ marginBottom: 5 }}
                                                    />
                                                </TableCell>
                                                <TableCell align="left"
                                                    scope="row"
                                                    style={{
                                                        display: "row",
                                                        gap: 15,
                                                    }}
                                                >
                                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                                        {row.symbol}
                                                        <span style={{ color: "darkgrey" }}>
                                                            {row.name}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell align="right">{numberWithCommas(row.price)}</TableCell>
                                                <TableCell align="right"
                                                    style={{
                                                        color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {numberWithCommas(row.price_change_24h)}
                                                </TableCell>
                                                <TableCell align="right">{numberWithCommas(row.total_volume)}</TableCell>
                                                <TableCell align="right">{numberWithCommas(row.market_cap)}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (dense ? 33 : 53) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50]}
                        component="div"
                        count={market.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Box>
            </Container>

        </div >
    );
}


// https://stackoverflow.com/questions/65074277/how-to-use-invisible-character-to-split-a-text-and-how-to-get-its-js-representa
// https://www.tradingview.com/tradingview-for-the-web/
// https://jorrinkievit.github.io/react-ts-tradingview-widgets/docs/components/FundamentalData
// https://etherscan.io/gastracker
// https://docs.etherscan.io/getting-started/viewing-api-usage-statistics
// https://docs.ethgas.watch/
// To create the Coingecko table
// https://mui.com/components/tables/
// https://www.coingecko.com/en/widgets/coin_price_marquee_widget
// https://www.coingecko.com/en/coins/bitcoin
// https://github.com/miscavage/CoinGecko-API
// https://www.chartjs.org/docs/latest/getting-started/usage.html
// https://automatedwebtools.com/usd-eth-gas-fee/
// https://docs.ethgasstation.info/














































// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// https://www.tradingview.com/tradingview-for-the-web/
// https://jorrinkievit.github.io/react-ts-tradingview-widgets/docs/components/FundamentalData
// https://etherscan.io/gastracker
// https://docs.etherscan.io/getting-started/viewing-api-usage-statistics
// https://docs.ethgas.watch/
// To create the Coingecko table
// https://mui.com/components/tables/
// https://www.coingecko.com/en/widgets/coin_price_marquee_widget
// https://www.coingecko.com/en/coins/bitcoin
// https://github.com/miscavage/CoinGecko-API
// https://www.chartjs.org/docs/latest/getting-started/usage.html
// https://automatedwebtools.com/usd-eth-gas-fee/
// https://docs.ethgasstation.info/


// import React, { useState, useEffect } from "react";
// import CryptoHubApi from "../api";
// import Loading from "../utilities/Loading";
// import PropTypes from 'prop-types';
// import { alpha } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import TableSortLabel from '@mui/material/TableSortLabel';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Checkbox from '@mui/material/Checkbox';
// import StarOutlineIcon from '@mui/icons-material/StarOutline';
// import StarIcon from '@mui/icons-material/Star';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import AddTaskIcon from '@mui/icons-material/AddTask';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import { visuallyHidden } from '@mui/utils';
// import { makeStyles } from "@material-ui/core/styles";
// import Container from "@material-ui/core/Container";
// import { TechnicalAnalysis } from "react-ts-tradingview-widgets";


// const useStyles = makeStyles(theme => ({
//     root: {
//         flexGrow: 1,
//         padding: theme.spacing(),
//     },
//     seeMore: {
//         marginTop: theme.spacing(3)
//     },
//     appBarSpacer: theme.mixins.toolbar,
//     content: {
//         flexGrow: 1,
//         height: "100vh",
//         overflow: "auto"
//     },
//     container: {
//         paddingTop: theme.spacing(4),
//         paddingBottom: theme.spacing(4)
//     },
// }));


// function createData(name, price, price_change_percentage_24h, total_volume, market_cap) {
//     return {
//         name,
//         price,
//         price_change_percentage_24h,
//         total_volume,
//         market_cap,
//     };
// }

// // const rows = [
// //     createData('Cupcake', 305, 3.7, 67, 4.3),
// //     createData('Donut', 452, 25.0, 51, 4.9),
// //     createData('Eclair', 262, 16.0, 24, 6.0),
// //     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
// //     createData('Gingerbread', 356, 16.0, 49, 3.9),
// //     createData('Honeycomb', 408, 3.2, 87, 6.5),
// //     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
// //     createData('Jelly Bean', 375, 0.0, 94, 0.0),
// //     createData('KitKat', 518, 26.0, 65, 7.0),
// //     createData('Lollipop', 392, 0.2, 98, 0.0),
// //     createData('Marshmallow', 318, 0, 81, 2.0),
// //     createData('Nougat', 360, 19.0, 9, 37.0),
// //     createData('Oreo', 437, 18.0, 63, 4.0),
// // ];

// function descendingComparator(a, b, orderBy) {
//     if (b[orderBy] < a[orderBy]) {
//         return -1;
//     }
//     if (b[orderBy] > a[orderBy]) {
//         return 1;
//     }
//     return 0;
// }

// function getComparator(order, orderBy) {
//     return order === 'desc'
//         ? (a, b) => descendingComparator(a, b, orderBy)
//         : (a, b) => -descendingComparator(a, b, orderBy);
// }

// // This method is created for cross-browser compatibility, if you don't
// // need to support IE11, you can use Array.prototype.sort() directly
// // https://stackoverflow.com/questions/65074277/how-to-use-invisible-character-to-split-a-text-and-how-to-get-its-js-representa
// function stableSort(array, comparator) {
//     const stabilizedThis = array.map((el, index) => [el, index]);
//     stabilizedThis.sort((a, b) => {
//         const order = comparator(a[0], b[0]);
//         if (order !== 0) {
//             return order;
//         }
//         return a[1] - b[1];
//     });
//     return stabilizedThis.map((el) => el[0]);
// }

// const headCells = [
//     {
//         id: 'name',
//         numeric: false,
//         disablePadding: true,
//         label: ` \u3000#\u3000\u3000\u3000\u3000Coins`,
//     },
//     {
//         id: 'price',
//         numeric: true,
//         disablePadding: false,
//         label: 'Price',
//     },
//     {
//         id: 'price_change_percentage_24h',
//         numeric: true,
//         disablePadding: false,
//         label: '24h Change',
//     },
//     {
//         id: 'total_volume',
//         numeric: true,
//         disablePadding: false,
//         label: '24h Volume',
//     },
//     {
//         id: 'market_cap',
//         numeric: true,
//         disablePadding: false,
//         label: 'Mkt Cap',
//     },
// ];

// function EnhancedTableHead(props) {
//     const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
//         props;
//     const createSortHandler = (property) => (event) => {
//         onRequestSort(event, property);
//     };

//     return (
//         <TableHead>
//             <TableRow>
//                 <TableCell padding="checkbox">
//                     <Checkbox
//                         icon={<StarOutlineIcon />}
//                         checkedIcon={<StarIcon />}
//                         color="primary"
//                         indeterminate={numSelected > 0 && numSelected < rowCount}
//                         checked={rowCount > 0 && numSelected === rowCount}
//                         onChange={onSelectAllClick}
//                         inputProps={{
//                             'aria-label': 'select all desserts',
//                         }}
//                     />
//                 </TableCell>
//                 {headCells.map((headCell) => (
//                     <TableCell
//                         key={headCell.id}
//                         align={headCell.numeric ? 'right' : 'left'}
//                         padding={headCell.disablePadding ? 'none' : 'normal'}
//                         sortDirection={orderBy === headCell.id ? order : false}
//                     >
//                         <TableSortLabel
//                             active={orderBy === headCell.id}
//                             direction={orderBy === headCell.id ? order : 'asc'}
//                             onClick={createSortHandler(headCell.id)}
//                         >
//                             {headCell.label}
//                             {orderBy === headCell.id ? (
//                                 <Box component="span" sx={visuallyHidden}>
//                                     {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                                 </Box>
//                             ) : null}
//                         </TableSortLabel>
//                     </TableCell>
//                 ))}
//             </TableRow>
//         </TableHead>
//     );
// }

// EnhancedTableHead.propTypes = {
//     numSelected: PropTypes.number.isRequired,
//     onRequestSort: PropTypes.func.isRequired,
//     onSelectAllClick: PropTypes.func.isRequired,
//     order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//     orderBy: PropTypes.string.isRequired,
//     rowCount: PropTypes.number.isRequired,
// };

// const EnhancedTableToolbar = (props) => {
//     const { numSelected } = props;

//     return (
//         <Toolbar
//             sx={{
//                 pl: { sm: 2 },
//                 pr: { xs: 1, sm: 1 },
//                 ...(numSelected > 0 && {
//                     bgcolor: (theme) =>
//                         alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
//                 }),
//             }}
//         >
//             {numSelected > 0 ? (
//                 <Typography
//                     sx={{ flex: '1 1 100%' }}
//                     color="inherit"
//                     variant="subtitle1"
//                     component="div"
//                 >
//                     {numSelected} Token selected
//                 </Typography>
//             ) : (
//                 <Typography
//                     sx={{ flex: '1 1 100%' }}
//                     variant="h6"
//                     id="tableTitle"
//                     component="div"
//                 >
//                     CryptoHub
//                 </Typography>
//             )}

//             {numSelected > 0 ? (
//                 <Tooltip title="Delete">
//                     <IconButton>
//                         <AddTaskIcon />
//                     </IconButton>
//                 </Tooltip>
//             ) : (
//                 <Tooltip title="Filter list">
//                     <IconButton>
//                         <FilterListIcon />
//                     </IconButton>
//                 </Tooltip>
//             )}
//         </Toolbar>
//     );
// };

// EnhancedTableToolbar.propTypes = {
//     numSelected: PropTypes.number.isRequired,
// };

// export default function Market() {
//     const [order, setOrder] = React.useState('asc');
//     const [orderBy, setOrderBy] = React.useState('price');
//     const [selected, setSelected] = React.useState([]);
//     const [page, setPage] = React.useState(0);
//     const [dense, setDense] = React.useState(false);
//     const [rowsPerPage, setRowsPerPage] = React.useState(25);
//     const [market, setMarket] = useState(null);
//     const classes = useStyles()

//     useEffect(function getNewsOnMount() {
//         console.debug("NewsList useEffect getNewsOnMount");

//         search();
//     }, []);

//     async function search() {
//         let market = await CryptoHubApi.getMarket();
//         setMarket(market);
//     }


//     if (!market) return <Loading />;
//     console.log(market.name)

//     const handleRequestSort = (event, property) => {
//         const isAsc = orderBy === property && order === 'asc';
//         setOrder(isAsc ? 'desc' : 'asc');
//         setOrderBy(property);
//     };

//     const handleSelectAllClick = (event) => {
//         if (event.target.checked) {
//             const newSelecteds = market.map((n) => n.name);
//             setSelected(newSelecteds);
//             return;
//         }
//         setSelected([]);
//     };

//     const handleClick = (event, name) => {
//         const selectedIndex = selected.indexOf(name);
//         let newSelected = [];

//         if (selectedIndex === -1) {
//             newSelected = newSelected.concat(selected, name);
//         } else if (selectedIndex === 0) {
//             newSelected = newSelected.concat(selected.slice(1));
//         } else if (selectedIndex === selected.length - 1) {
//             newSelected = newSelected.concat(selected.slice(0, -1));
//         } else if (selectedIndex > 0) {
//             newSelected = newSelected.concat(
//                 selected.slice(0, selectedIndex),
//                 selected.slice(selectedIndex + 1),
//             );
//         }

//         setSelected(newSelected);
//     };

//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     // const handleChangeDense = (event) => {
//     //     setDense(event.target.checked);
//     // };

//     const isSelected = (name) => selected.indexOf(name) !== -1;

//     // Avoid a layout jump when reaching the last page with empty rows.
//     const emptyRows =
//         page > 0 ? Math.max(0, (1 + page) * rowsPerPage - market.length) : 0;

//     return (
//         <div className={classes.root}>
//             {/* <div className={classes.appBarSpacer} /> */}
//             <Box sx={{ width: '100%', textAlign: 'center' }}>
//                 <Container maxWidth="md">
//                     <div className={classes.root}>
//                         <Typography variant="h2" gutterBottom>
//                             CryptoHub
//                         </Typography>
//                         <Typography
//                             variant="subtitle2"
//                             style={{
//                                 color: "darkgrey",
//                                 textTransform: "capitalize",
//                             }}
//                         >
//                             Get all the Info regarding your favorite Crypto Currency
//                         </Typography>
//                     </div>
//                 </Container>
//             </Box>
//             <Container maxWidth="lg" className={classes.container}>
//                 <Box sx={{ width: '100%' }}>
//                     <div className={classes.appBarSpacer} />
//                     <EnhancedTableToolbar numSelected={selected.length} />
//                     <TableContainer >
//                         <Table
//                             sx={{ minWidth: 750 }}
//                             aria-labelledby="tableTitle"
//                             size={dense ? 'small' : 'medium'}
//                         >
//                             <EnhancedTableHead
//                                 numSelected={selected.length}
//                                 order={order}
//                                 orderBy={orderBy}
//                                 onSelectAllClick={handleSelectAllClick}
//                                 onRequestSort={handleRequestSort}
//                                 rowCount={market.length}
//                             />
//                             <TableBody>
//                                 {/* if you don't need to support IE11, you can replace the `stableSort` call with:
//                  rows.slice().sort(getComparator(order, orderBy)) */}
//                                 {stableSort(market, getComparator(order, orderBy))
//                                     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                                     .map((row, index) => {
//                                         console.log('row', row)
//                                         const isItemSelected = isSelected(row.name);
//                                         const labelId = `enhanced-table-checkbox-${index}`;

//                                         return (
//                                             <TableRow
//                                                 hover
//                                                 onClick={(event) => handleClick(event, row.name)}
//                                                 role="checkbox"
//                                                 aria-checked={isItemSelected}
//                                                 tabIndex={-1}
//                                                 key={row.name}
//                                                 selected={isItemSelected}
//                                             >
//                                                 <TableCell padding="checkbox">
//                                                     <Checkbox
//                                                         icon={<StarOutlineIcon />}
//                                                         checkedIcon={<StarIcon />}
//                                                         color="primary"
//                                                         checked={isItemSelected}
//                                                         inputProps={{
//                                                             'aria-labelledby': labelId,
//                                                         }}
//                                                     />
//                                                 </TableCell>
//                                                 <TableCell
//                                                     component="th"
//                                                     id={labelId}
//                                                     scope="row"
//                                                     padding="none"
//                                                 >
//                                                     {row.name}
//                                                 </TableCell>
//                                                 <TableCell align="right">{row.price}</TableCell>
//                                                 <TableCell align="right">{row.price_change_percentage_24h}</TableCell>
//                                                 <TableCell align="right">{row.total_volume}</TableCell>
//                                                 <TableCell align="right">{row.market_cap}</TableCell>
//                                             </TableRow>
//                                         );
//                                     })}
//                                 {emptyRows > 0 && (
//                                     <TableRow
//                                         style={{
//                                             height: (dense ? 33 : 53) * emptyRows,
//                                         }}
//                                     >
//                                         <TableCell colSpan={6} />
//                                     </TableRow>
//                                 )}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                     <TablePagination
//                         rowsPerPageOptions={[10, 25, 50]}
//                         component="div"
//                         count={market.length}
//                         rowsPerPage={rowsPerPage}
//                         page={page}
//                         onPageChange={handleChangePage}
//                         onRowsPerPageChange={handleChangeRowsPerPage}
//                     />
//                     {/* <FormControlLabel
//                 control={<Switch checked={dense} onChange={handleChangeDense} />}
//                 label="Dense padding"
//             /> */}
//                 </Box>
//             </Container>
//             {/* <Box>
//                 <TechnicalAnalysis colorTheme="dark" width="350" height='350' symbol="BINANCE:BTCUSDT">
//                 </TechnicalAnalysis>
//             </Box> */}
//         </div >
//     );
// }
