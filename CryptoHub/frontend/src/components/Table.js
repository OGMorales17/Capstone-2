import { useState } from "react";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router";
import useLocalStorage from "../hooks/useLocalStorage";


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


export default function TableComponent({ market, EnhancedTableToolbar, EnhancedTableHead }) {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('rank');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [favorite, setFavorite] = useLocalStorage("favorite", []);
    const [selected, setSelected] = useState([...favorite]);

    const navigate = useNavigate()
    const classes = useStyles()


    function numberWithCommas(num) {
        const numSplit = num.toString().split('.')
        const formated = numSplit[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        if (numSplit[1])
            return [formated, numSplit[1]].join('.')
        return formated
    }


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
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


    return (

        <Box sx={{ width: '100%' }}>
            <div className={classes.appBarSpacer} />
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer >
                <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                >
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={market.length}
                    />
                    <TableBody>
                        {market.slice().sort(getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                const profit = row.price_change_24h > 0;
                                const isItemSelected = isSelected(row.name);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.name)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.name}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                icon={<StarOutlineIcon />}
                                                checkedIcon={<StarIcon />}
                                                color="primary"
                                                checked={isItemSelected && favorite.includes(row.name)}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}

                                                onChange={(e) => {
                                                    !favorite.includes(row.name) ?
                                                        setFavorite(currVal => [...currVal, e.target.value]) :
                                                        setFavorite(currVal => currVal.filter(fav => fav !== e.target.value))
                                                }
                                                }
                                                value={row.name}
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
                                        <TableCell style={{ cursor: "pointer" }} align="right"
                                            onClick={() => navigate(`/market/details/${row.id}`)}
                                        >
                                            <img
                                                src={row?.image}
                                                alt={row.name}
                                                height="25"
                                                style={{ marginBottom: 5 }}
                                            />
                                        </TableCell>
                                        <TableCell align="left"
                                            onClick={() => navigate(`/market/details/${row.id}`)}
                                            scope="row"
                                            style={{
                                                display: "row",
                                                gap: 15,
                                                cursor: "pointer"
                                            }}
                                        >
                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                {row.symbol}
                                                <span style={{ color: "darkgrey" }}>
                                                    {row.name}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell align="right">${numberWithCommas(row.price)}</TableCell>
                                        <TableCell align="right"
                                            style={{
                                                color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                                fontWeight: 500,
                                            }}
                                        >
                                            {numberWithCommas(row.percentage_change_24h.toFixed(2))}%
                                        </TableCell>
                                        <TableCell align="right"
                                            style={{
                                                color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                                fontWeight: 500,
                                            }}
                                        >
                                            ${numberWithCommas(row.price_change_24h.toFixed(2))}
                                        </TableCell>
                                        <TableCell align="right">${numberWithCommas(row.total_volume)}</TableCell>
                                        <TableCell align="right">${numberWithCommas(row.market_cap)}</TableCell>
                                    </TableRow>
                                );
                            })}
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
    );
}
