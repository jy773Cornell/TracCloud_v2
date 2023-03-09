import {styled} from "@mui/system";
import {Button} from "@mui/material";
import {purple} from '@mui/material/colors';


export const StyledButton = styled(Button)(({theme}) => ({
    margin: "15px 15px",
    backgroundColor: purple[500],
    '&:hover': {
        backgroundColor: purple[700],
    },
}));