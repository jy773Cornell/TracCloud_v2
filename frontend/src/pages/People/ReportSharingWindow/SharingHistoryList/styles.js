import {styled} from "@mui/system";
import {Drawer} from "@mui/material";

export const drawerWidth = 200;

export const StyledDrawer = styled(Drawer)({
    width: drawerWidth,
    color: '#9ad9bd',
    display: 'flex',
    flexShrink: 0,
});


export const DrawerHeader = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 64,
    fontSize: 25,
});