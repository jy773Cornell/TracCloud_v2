import {styled} from "@mui/system";
import {Button} from "@mui/material";
import {orange} from '@mui/material/colors';
import {pink} from '@mui/material/colors';

export const AddButton = styled(Button)(() => ({
    margin: "15px 15px",
    marginLeft : "0px",
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