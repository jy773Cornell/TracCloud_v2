import React, {useState} from 'react'
import {Outlet} from "react-router-dom";
import {
    Button,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography
} from "@mui/material";
import AdbIcon from '@mui/icons-material/Adb';
import './index.scss'
import {StyledAppBar, StyledDrawer, drawerWidth, StyledCard, StyledCardContent, StyledToolbar} from './styles'
import {Box} from "@mui/system";
import {removeToken} from "../../utils";

function Layout(props) {

    const [username, setUsername] = useState("")

    async function UserInfoFetch() {
        const requestOptions = {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        };
        await fetch("/api/logout/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    removeToken();
                    window.location.href = "/login";
                }
            })
    }

    async function handleLogout() {
        const requestOptions = {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        };
        await fetch("/api/logout/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    removeToken();
                    window.location.href = "/login";
                }
            })
    }


    const list = () => (
        <Box sx={{width: 'auto'}} role="presentation">
            <StyledCard>
                <StyledCardContent>
                    Trac Cloud
                </StyledCardContent>
            </StyledCard>
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <AdbIcon/> : <AdbIcon/>}
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div className="layout">
            <StyledAppBar position="fixed">
                <StyledToolbar>
                    <Typography variant="h6" color="black" padding="20px">
                        Hello, {props.uid}
                    </Typography>
                    <Button
                        onClick={handleLogout}
                        variant="outlined"
                        color="error"
                        underline="hover"
                        padding="10px">
                        Logout
                    </Button>
                </StyledToolbar>
            </StyledAppBar>
            <StyledDrawer variant="permanent" anchor="left"
                          PaperProps={{style: {width: drawerWidth}}}>
                {list()}

            </StyledDrawer>
            <Outlet/>
        </div>
    )
}

export default Layout