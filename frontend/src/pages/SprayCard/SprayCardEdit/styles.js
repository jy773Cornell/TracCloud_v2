import {styled} from "@mui/system";
import {blue} from "@mui/material/colors";

export const GroupHeader = styled('div')(({theme}) => ({
    position: 'sticky',
    top: '-8px',
    padding: '4px 10px',
    color: blue[200]
}));

export const GroupItems = styled('ul')({
    padding: 0,
});
