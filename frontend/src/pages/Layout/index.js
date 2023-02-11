import React, {useEffect, useState} from 'react'
import {Outlet, useNavigate, useLocation} from "react-router-dom";
import {
    Badge,
    Button, Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    Typography
} from "@mui/material";
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
import HomeIcon from '@mui/icons-material/Home';

function Layout(props) {
    const [username, setUsername] = useState("")
    const [userType, setUserType] = useState("")
    const navigate = useNavigate();
    const location = useLocation();

    const handleMenuButtonPressed = (url) => {
        navigate(url);
    }

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
                <ListItemButton onClick={() => handleMenuButtonPressed('/home')}
                                selected={location.pathname === "/home"}>
                    <ListItemIcon>
                        <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Home"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => handleMenuButtonPressed('/profile')}
                                selected={location.pathname === "/profile"}>
                    <ListItemIcon>
                        <AccountBoxIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Profile"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => handleMenuButtonPressed('/network')}
                                selected={location.pathname === "/network"}>
                    <ListItemIcon>
                        <PeopleIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Network"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => handleMenuButtonPressed('/crop')}
                                selected={location.pathname === "/crop"}>
                    <ListItemIcon>
                        <GrassIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Crops"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => handleMenuButtonPressed('/site')}
                                selected={location.pathname === "/site"}>
                    <ListItemIcon>
                        <HolidayVillageIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Sites"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => handleMenuButtonPressed('/chemical')}
                                selected={location.pathname === "/chemical"}>
                    <ListItemIcon>
                        <ScienceIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Chemicals"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => handleMenuButtonPressed('/record')}
                                selected={location.pathname === "/record"}>
                    <ListItemIcon>
                        <PostAddIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Records"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => handleMenuButtonPressed('/report')}
                                selected={location.pathname === "/report"}>
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
                <ListItemButton onClick={() => handleMenuButtonPressed('/home')}
                                selected={location.pathname === "/home"}>
                    <ListItemIcon>
                        <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Home"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => handleMenuButtonPressed('/profile')}
                                selected={location.pathname === "/profile"}>
                    <ListItemIcon>
                        <AccountBoxIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Profile"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => handleMenuButtonPressed('/network')}
                                selected={location.pathname === "/network"}>
                    <ListItemIcon>
                        <PeopleIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Network"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => handleMenuButtonPressed('/equipment')}
                                selected={location.pathname === "/equipment"}>
                    <ListItemIcon>
                        <ConstructionIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Equipment"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => handleMenuButtonPressed('/record')}
                                selected={location.pathname === "/record"}>
                    <ListItemIcon>
                        <PostAddIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Records"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => handleMenuButtonPressed('/report')}
                                selected={location.pathname === "/report"}>
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
                <ListItemButton onClick={() => handleMenuButtonPressed('/home')}
                                selected={location.pathname === "/home"}>
                    <ListItemIcon>
                        <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Home"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => handleMenuButtonPressed('/profile')}
                                selected={location.pathname === "/profile"}>
                    <ListItemIcon>
                        <AccountBoxIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Profile"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => handleMenuButtonPressed('/network')}
                                selected={location.pathname === "/network"}>
                    <ListItemIcon>
                        <PeopleIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Network"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => handleMenuButtonPressed('/record')}
                                selected={location.pathname === "/record"}>
                    <ListItemIcon>
                        <PostAddIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Records"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => handleMenuButtonPressed('/report')}
                                selected={location.pathname === "/report"}>
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
                <ListItemButton onClick={() => handleMenuButtonPressed('/home')}
                                selected={location.pathname === "/home"}>
                    <ListItemIcon>
                        <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Home"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => handleMenuButtonPressed('/profile')}
                                selected={location.pathname === "/profile"}>
                    <ListItemIcon>
                        <AccountBoxIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Profile"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => handleMenuButtonPressed('/network')}
                                selected={location.pathname === "/network"}>
                    <ListItemIcon>
                        <PeopleIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Network"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => handleMenuButtonPressed('/record')}
                                selected={location.pathname === "/record"}>
                    <ListItemIcon>
                        <PostAddIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Records"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => handleMenuButtonPressed('/report')}
                                selected={location.pathname === "/report"}>
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
                <ListItemButton onClick={() => handleMenuButtonPressed('/home')}
                                selected={location.pathname === "/home"}>
                    <ListItemIcon>
                        <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Home"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => handleMenuButtonPressed('/profile')}
                                selected={location.pathname === "/profile"}>
                    <ListItemIcon>
                        <AccountBoxIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Profile"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => handleMenuButtonPressed('/network')}
                                selected={location.pathname === "/network"}>
                    <ListItemIcon>
                        <PeopleIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Network"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => handleMenuButtonPressed('/record')}
                                selected={location.pathname === "/record"}>
                    <ListItemIcon>
                        <PostAddIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Records"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => handleMenuButtonPressed('/report')}
                                selected={location.pathname === "/report"}>
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

    return (
        <div className="layout">
            <StyledAppBar position="fixed">
                <StyledToolbar>
                    <Typography variant="h7" color="black" padding="10px">
                        Hello, {username}
                    </Typography>
                    <Badge badgeContent={17} color="error">
                        <StyledNotificationsIcon/>
                    </Badge>
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
            <div className="content">
                <Outlet/>
            </div>
        </div>)
}

export default Layout