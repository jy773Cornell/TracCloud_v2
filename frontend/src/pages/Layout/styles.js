import {styled} from "@mui/system";
import {AppBar, Card, CardContent, Drawer, Toolbar} from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';

export const drawerWidth = 200;

export const StyledAppBar = styled(AppBar)({
    width: `calc(100% - ${drawerWidth}px)`,
    backgroundColor: "#f5f5f5",
    display: 'flex',
    zIndex: 1,
});

export const StyledDrawer = styled(Drawer)({
    width: drawerWidth,
    color: '#9ad9bd',
    display: 'flex',
    flexShrink: 0,
    zIndex: 1,
});

export const StyledCard = styled(Card)({
    backgroundColor: '#9ad9bd',
    color: '#ffffff',
    textAlign: "center",
})

export const StyledCardContent = styled(CardContent)({
    textAlign: 'center',
    fontSize: '30px',
})

export const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'flex-end',
})

export const StyledNotificationsIcon = styled(NotificationsIcon)({
    paddingRight: 10,
    fontSize: 30,
    color: 'gray',
})