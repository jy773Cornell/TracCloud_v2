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

export default function LayoutAppBar(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

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
                            aria-label="new notifications"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <Badge badgeContent={0} color="error">
                                <NotificationsIcon/>
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            color="inherit"
                            aria-controls="setting-menu"
                            aria-haspopup="true"
                            onClick={(event) => setAnchorEl(event.currentTarget)}
                        >
                            <SettingsIcon/>
                        </IconButton>
                        <Menu
                            id="setting-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={() => setAnchorEl(null)}
                        >
                            <MenuItem>
                                <a href="/workflow/username_change/" target="_blank"
                                   rel="noopener noreferrer">Username</a>
                            </MenuItem>
                            <MenuItem>
                                <a href="/workflow/password_change/" target="_blank"
                                   rel="noopener noreferrer">Password</a>
                            </MenuItem>
                        </Menu>
                        <IconButton size="large" aria-label="logout" color="inherit"
                                    onClick={props.handleLogout}>
                            <LogoutIcon/>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}