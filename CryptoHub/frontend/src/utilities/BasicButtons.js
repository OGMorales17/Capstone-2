import * as React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function BasicButtons() {
    const navigate = useNavigate();

    return (
        <Button variant="outlined" onClick={() => navigate(-1)} >
            Go back
        </Button>
    );
}