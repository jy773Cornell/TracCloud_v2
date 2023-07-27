import {styled} from "@mui/system";
import {Button} from "@mui/material";
import {grey, orange} from '@mui/material/colors';
import {pink} from '@mui/material/colors';
import {DataGrid} from "@mui/x-data-grid";

export const AddButton = styled(Button)(() => ({
    margin: "15px 15px",
    backgroundColor: orange[500],
    '&:hover': {
        backgroundColor: orange[700],
    },
}));

export const CancelButton = styled(Button)(({theme}) => ({
    margin: "15px 15px",
    backgroundColor: pink[500],
    '&:hover': {
        backgroundColor: pink[700],
    },
}));

export const StyledDataGrid = styled(DataGrid)(() => ({
    '& .highlight': {
        backgroundColor: grey[300],
        '&:hover': {
            backgroundColor: grey[400],
        },
    },
}));