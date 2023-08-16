import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import {Badge, Menu, MenuItem, Typography} from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {lazy, useState} from "react";

const NotificationList = lazy(() => import('../NotificationList'))
const SettingList = lazy(() => import('../SettingList'))

export default function LayoutAppBar(props) {
    const [settingAnchorEl, setSettingAnchorEl] = React.useState(null);
    const [notificationAnchorEl, setNotificationAnchorEl] = React.useState(null);
    const [notificationItems, setNotificationItems] = useState([]);

    const notificationProps = {
        ...props,
        notificationAnchorEl,
        setNotificationAnchorEl,
        notificationItems,
        setNotificationItems

    }

    const settingProps = {
        ...props,
        settingAnchorEl,
        setSettingAnchorEl,
    }

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{mr: 2}}
                        onClick={props.toggleMenuOpen}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Box sx={{flexGrow: 1}}/>
                    <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                        <Typography sx={{display: 'flex', alignItems: "center", padding: 1.5}}>
                            Hello, {props.username}
                        </Typography>
                        <IconButton
                            size="large"
                            color="inherit"
                            aria-label="new notifications"
                            aria-haspopup="true"
                            onClick={(event) => setNotificationAnchorEl(event.currentTarget)}
                        >
                            <Badge badgeContent={notificationItems.length} color="error">
                                <NotificationsIcon/>
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            color="inherit"
                            aria-controls="setting-menu"
                            aria-haspopup="true"
                            onClick={(event) => setSettingAnchorEl(event.currentTarget)}
                        >
                            <SettingsIcon/>
                        </IconButton>
                        <IconButton size="large" aria-label="logout" color="inherit"
                                    onClick={props.handleLogout}>
                            <LogoutIcon/>
                        </IconButton>
                        <NotificationList {...notificationProps}/>
                        <SettingList {...settingProps}/>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}