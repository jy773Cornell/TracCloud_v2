import {styled} from "@mui/system";
import {DataGrid} from "@mui/x-data-grid";
import {grey} from "@mui/material/colors";

export const StyledDataGrid = styled(DataGrid)(() => ({
    '& .highlight': {
        backgroundColor: grey[300],
        '&:hover': {
            backgroundColor: grey[400],
        },
    },
}));