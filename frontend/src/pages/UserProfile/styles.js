import {styled} from "@mui/system";
import {Button} from "@mui/material";
import {orange} from '@mui/material/colors';

export const EditButton = styled(Button)(() => ({
    backgroundColor: orange[500],
    '&:hover': {
        backgroundColor: orange[700],
    },
}));