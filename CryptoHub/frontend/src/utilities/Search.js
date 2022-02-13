import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createFilterOptions } from "@material-ui/lab";
import { useNavigate } from "react-router";
import CryptoHubApi from "../api";


const OPTIONS_LIMIT = 5;
const filterOptions = createFilterOptions({
    limit: OPTIONS_LIMIT
});


export default function Search() {
    const [market, setMarket] = useState(null);
    const navigate = useNavigate()

    useEffect(function getMarketOnMount() {
        search();
    }, []);

    async function search() {
        let market = await CryptoHubApi.getMarket();
        setMarket(market);
    }


    return (
        <Autocomplete
            id="disable-clearable"
            disableClearable
            filterOptions={filterOptions}
            sx={{ width: '100%' }}
            options={market || []}
            autoHighlight
            getOptionLabel={(option) => option.symbol || option.name}
            onChange={(e, value) => navigate(`/market/details/${value.id}`)}
            renderOption={(props, option) => (
                <Box component="li"
                    label="disableClearable"
                    sx={{ '& > img': { mr: 2, flexShrink: 1 } }} {...props}>
                    <img
                        loading="lazy"
                        width="flex"
                        src={option?.image}
                        alt={option.name}
                        height="30"
                    />
                    {option.name} ({option.symbol})
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    style={{ marginBottom: 10, width: "100%" }}
                    label="Search For a Crypto Currency.."
                />
            )}
        />

    );
}

