import {styled} from "@mui/system";
import {Button} from "@mui/material";
import {green, orange} from '@mui/material/colors';

export const AddButton = styled(Button)(() => ({
    margin: "15px 0px",
    backgroundColor: orange[500],
    '&:hover': {
        backgroundColor: orange[700],
    },
}));

export const TreeButton = styled(Button)(() => ({
    margin: "15px",
    backgroundColor: green[500],
    '&:hover': {
        backgroundColor: green[700],
    },
}));

export const StyledContainer = styled("div")({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
})