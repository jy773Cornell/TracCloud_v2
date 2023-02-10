import React, {useEffect, useState} from 'react'
import {Outlet} from "react-router-dom";
import {Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import './index.scss'
import {
    StyledAppBar,
    StyledDrawer,
    drawerWidth,
    StyledCard,
    StyledCardContent,
    StyledToolbar,
    StyledNotificationsIcon
} from './styles'
import {Box} from "@mui/system";
import {removeToken} from "../../utils";
import PeopleIcon from '@mui/icons-material/People';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import GrassIcon from '@mui/icons-material/Grass';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import ScienceIcon from '@mui/icons-material/Science';
import PostAddIcon from '@mui/icons-material/PostAdd';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ConstructionIcon from '@mui/icons-material/Construction';

function Layout(props) {

    const [username, setUsername] = useState("")
    const [userType, setUserType] = useState("")

    async function UserInfoGet(props) {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/api/user/get/info" + "?uid=" + props.uid, requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setUsername(data.data.username);
                        setUserType(data.data.type);
                    })
                }
            })
    }

    useEffect(() => {
        UserInfoGet(props);
    }, [])

    async function handleLogout() {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/api/logout/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    removeToken();
                    window.location.href = "/login";
                }
            })
    }

    const GrowerList = () => (
        <List>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <AccountBoxIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Profile"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <PeopleIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Network"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <GrassIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Crops"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <HolidayVillageIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Sites"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <ScienceIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Chemicals"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <PostAddIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Records"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <SummarizeIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Reports"/>
                </ListItemButton>
            </ListItem>
        </List>
    )
    const ApplicatorList = () => (
        <List>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <AccountBoxIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Profile"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <PeopleIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Network"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <ConstructionIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Equipment"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <PostAddIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Records"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <SummarizeIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Reports"/>
                </ListItemButton>
            </ListItem>
        </List>
    )
    const FoodProcessorList = () => (
        <List>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <AccountBoxIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Profile"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <PeopleIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Network"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <PostAddIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Records"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <SummarizeIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Reports"/>
                </ListItemButton>
            </ListItem>
        </List>
    )
    const FoodDistributorList = () => (
        <List>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <AccountBoxIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Profile"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <PeopleIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Network"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <PostAddIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Records"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <SummarizeIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Reports"/>
                </ListItemButton>
            </ListItem>
        </List>
    )
    const FoodRetailerList = () => (
        <List>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <AccountBoxIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Profile"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <PeopleIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Network"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <PostAddIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Records"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <SummarizeIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Reports"/>
                </ListItemButton>
            </ListItem>
        </List>
    )

    const MenuList = () => (<Box sx={{width: 'auto'}} role="presentation">
        <StyledCard>
            <StyledCardContent>
                Trac Cloud
            </StyledCardContent>
        </StyledCard>
        {userType === "Grower" ? GrowerList() : null}
        {userType === "Applicator" ? ApplicatorList() : null}
        {userType === "Food Processor" ? FoodProcessorList() : null}
        {userType === "Food Distributor" ? FoodDistributorList() : null}
        {userType === "Food Retailer" ? FoodRetailerList() : null}
    </Box>);

    return (<div className="layout">
        <StyledAppBar position="fixed">
            <StyledToolbar>
                <Typography variant="h6" color="black" padding="10px">
                    Hello, {username}
                </Typography>
                <StyledNotificationsIcon/>
                <Button
                    onClick={handleLogout}
                    variant="outlined"
                    color="error"
                    underline="hover"
                    padding="5px"
                >
                    Logout
                </Button>
            </StyledToolbar>
        </StyledAppBar>
        <StyledDrawer variant="permanent" anchor="left" PaperProps={{style: {width: drawerWidth}}}>
            {MenuList()}
        </StyledDrawer>
        <Outlet/>
    </div>)
}

export default Layout