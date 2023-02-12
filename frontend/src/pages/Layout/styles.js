import {styled} from "@mui/system";
import {AppBar, Card, CardContent, Drawer, Toolbar} from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';

export const drawerWidth = 200;

export const StyledAppBar = styled(AppBar)({
    width: `calc(100% - ${drawerWidth}px)`,
    backgroundColor: "#f5f5f5",
    display: 'flex',
});

export const StyledDrawer = styled(Drawer)({
    width: drawerWidth,
    color: '#9ad9bd',
    display: 'flex',
    flexShrink: 0,
});

export const StyledCard = styled(Card)({
    borderRadius: 0,
    boxShadow: 'none',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#9ad9bd',
    color: '#ffffff',
    alignItems: 'center',
    height: 74,
})

export const StyledCardContent = styled(CardContent)({
    width: drawerWidth,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: '30px',
    height: 30,
    paddingTop: 24,
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
})