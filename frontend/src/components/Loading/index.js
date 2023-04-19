import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {StyledGrid} from "./styles";

export default function Loading() {
    return (
        <StyledGrid>
            <CircularProgress color="info"/>
        </StyledGrid>
    );
}