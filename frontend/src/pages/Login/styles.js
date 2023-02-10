import {styled} from "@mui/system";
import {Card, Grid, TextField, Typography} from "@mui/material";

export const StyledGrid = styled(Grid)({
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

export const StyledCard = styled(Card)({
    padding: 20, width: 380, margin: 20,
});

export const StyledTypography = styled(Typography)({
    paddingTop: 10,
});