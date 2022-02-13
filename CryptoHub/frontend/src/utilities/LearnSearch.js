import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from "react-router";
import CryptoHubApi from "../api";
import { useParams } from "react-router";

const videos = [
    { label: 'Mix', id: `PLmOv2_vzOoGcTirwpJoyhGrYRnv1CRyIa` },
    { label: 'TradingView', id: `PLqJjKuP8g79xYlQHDysJS8yHB1YE8Qqje` },
    { label: 'Candlesticks', id: `PLqJjKuP8g79x8C1Z-nEIaBjsBUKHh4nxW` },
    { label: 'TradingEducation', id: `PLqJjKuP8g79zEy55pbGPIGc8tMqeSrzFa` },
];


export default function LearnSearch() {
    const [educationById, setEducationById] = useState(videos);
    const params = useParams()
    const navigate = useNavigate()

    useEffect(function getEducationByIdOnMount() {
        search(params.token);
    }, [params]);


    async function search(id) {
        let educationById = await CryptoHubApi.getEducationById(id);
        setEducationById(educationById);
    }

    return (
        <Autocomplete
            id="disable-clearable"
            disableClearable
            sx={{ width: '100%' }}
            options={videos || educationById}
            autoHighlight
            getOptionLabel={(option) => option.label || option.id}
            onChange={(e, value) => navigate(`/education/${value.id}`)}
            renderOption={(props, option) => (

                <Box component="li"
                    label="disableClearable"
                    sx={{ '& > img': { mr: 2, flexShrink: 1 } }} {...props} >
                    {option.label}
                </Box>

            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    style={{ marginBottom: 10, width: "100%" }}
                    label="Search For a Crypto Currency Video.."
                />
            )}
        />
    );
}

