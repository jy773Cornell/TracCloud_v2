import {styled} from "@mui/system";
import {Button} from "@mui/material";
import {green, orange, grey} from '@mui/material/colors';
import {DataGrid} from "@mui/x-data-grid";

export const AddButton = styled(Button)(() => ({
    margin: "15px",
    backgroundColor: orange[500],
    '&:hover': {
        backgroundColor: orange[700],
    },
}));

export const TreeButton = styled(Button)(() => ({
    margin: "15px 0px",
    backgroundColor: green[500],
    '&:hover': {
        backgroundColor: green[700],
    },
}));

export const StyledContainer = styled("div")({
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
});

export const StyledDataGrid = styled(DataGrid)(() => ({
    '& .site-type-level--1': {
        backgroundColor: grey[300],
        '&:hover': {
            backgroundColor: grey[400],
        },
    },
    '& .site-type-level--2': {
        backgroundColor: grey[200],
        '&:hover': {
            backgroundColor: grey[200],
        },
    },
    '& .site-type-level--3': {
        backgroundColor: grey[100],
        '&:hover': {
            backgroundColor: grey[100],
        },
    },
    '& .site-type-level--4': {
        backgroundColor: grey[50],
        '&:hover': {
            backgroundColor: grey[50],
        },
    },
}));
