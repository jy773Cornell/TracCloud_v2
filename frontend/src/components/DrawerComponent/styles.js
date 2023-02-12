import {styled} from "@mui/system";
import {Card, CardContent, Drawer, List} from "@mui/material";

export const drawerWidth = 180;

export const StyledDrawer = styled(Drawer)({
    width: drawerWidth,
    color: '#9ad9bd',
    display: 'flex',
    flexShrink: 0,
});


export const DrawerHeader = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
});