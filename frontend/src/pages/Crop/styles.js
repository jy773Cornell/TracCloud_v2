import {styled} from "@mui/system";
import {Button, Card, Grid} from "@mui/material";
import {orange} from '@mui/material/colors';
import {pink} from '@mui/material/colors';

export const AddButton = styled(Button)(({theme}) => ({
    margin: "15px 15px",
    backgroundColor: orange[500],
    '&:hover': {
        backgroundColor: orange[700],
    },
}));