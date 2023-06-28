import {styled} from "@mui/system";

export const drawerWidth = 200;

export const StyledRoot = styled("div")({
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    display: 'flex',
    flexDirection: 'row',

})

export const StyledContainer = styled("div")({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    width: '100%',
    overflowX: 'hidden'
})