import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import {StyledInputBase, StyledSearch, StyledSearchIconWrapper} from "./styles";
import {Typography} from "@mui/material";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import {useNavigate} from "react-router-dom";

export default function LayoutAppBar(props) {
    const navigate = useNavigate();

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
                    <StyledSearch>
                        <StyledSearchIconWrapper>
                            <SearchIcon/>
                        </StyledSearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{'aria-label': 'search'}}
                        />
                    </StyledSearch>
                    <Box sx={{flexGrow: 1}}/>
                    <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                        <Typography sx={{display: 'flex', alignItems: "center", padding: 1.5}}>
                            Hello, {props.username}
                        </Typography>
                        {props.userType === "Admin" ? (
                            <IconButton size="large" aria-label="admin panel" color="inherit"
                                        onClick={() => navigate("/admin")}>
                                <AdminPanelSettingsIcon/>
                            </IconButton>
                        ) : null}
                        <IconButton size="large" aria-label="new notifications" color="inherit"
                                    onClick={props.handleLogout}>
                            <LogoutIcon/>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}