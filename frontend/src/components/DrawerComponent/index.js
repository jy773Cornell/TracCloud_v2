import React from 'react';
import {DrawerHeader, drawerWidth, StyledDrawer} from "./styles";
import {Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PeopleIcon from "@mui/icons-material/People";
import GrassIcon from "@mui/icons-material/Grass";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import ScienceIcon from "@mui/icons-material/Science";
import PostAddIcon from "@mui/icons-material/PostAdd";
import SummarizeIcon from "@mui/icons-material/Summarize";
import ConstructionIcon from "@mui/icons-material/Construction";
import {Box} from "@mui/system";
import {useLocation, useNavigate} from "react-router-dom";

export default function LayoutDrawer(props) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleMenuButtonPressed = (url) => {
        navigate(url);
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

    const MenuList = () => (
        <Box sx={{width: 'auto'}} role="presentation">
            <DrawerHeader>
                Trac Cloud
            </DrawerHeader>
            <Divider/>
            {props.userType === "Grower" ? GrowerList() : null}
            {props.userType === "Applicator" ? ApplicatorList() : null}
            {props.userType === "Food Processor" ? FoodProcessorList() : null}
            {props.userType === "Food Distributor" ? FoodDistributorList() : null}
            {props.userType === "Food Retailer" ? FoodRetailerList() : null}
        </Box>
    );

    return (
        <StyledDrawer variant="permanent" anchor="left"
                      PaperProps={{
                          style: {
                              width: drawerWidth,
                          }
                      }}>
            {MenuList()}
        </StyledDrawer>
    )
}
