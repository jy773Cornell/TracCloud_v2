import React, {useState} from 'react';
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
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import WaterfallChartIcon from '@mui/icons-material/WaterfallChart';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import {Box} from "@mui/system";
import {useLocation, useNavigate} from "react-router-dom";
import Collapse from "@mui/material/Collapse";
import {grey} from "@mui/material/colors";
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';

export default function LayoutDrawer(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const width = isMobile ? '100%' : drawerWidth;
    const [recordOpen, setRecordOpen] = useState(false);

    const handleMenuButtonPressed = (url) => {
        navigate(url);
        if (isMobile) {
            props.setMenuOpen(false);
        }
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
                <ListItemButton onClick={() => setRecordOpen(!recordOpen)}>
                    <ListItemIcon>
                        <PostAddIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Records"/>
                    {recordOpen ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>
            </ListItem>
            <Collapse in={recordOpen} timeout="auto" unmountOnExit>
                <ListItem disablePadding>
                    <ListItemButton
                        sx={{
                            pl: 4,
                            backgroundColor: grey[100],
                            '&:hover': {backgroundColor: grey[100],},
                        }}
                        onClick={() => handleMenuButtonPressed('/record/spray')}
                        selected={location.pathname === "/record/spray"}>
                        <ListItemIcon>
                            <WaterfallChartIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Spray"/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton
                        sx={{
                            pl: 4,
                            backgroundColor: grey[100],
                            '&:hover': {backgroundColor: grey[100],},
                        }}
                        onClick={() => handleMenuButtonPressed('/record/harvest')}
                        selected={location.pathname === "/record/harvest"}>
                        <ListItemIcon>
                            <EmojiNatureIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Harvest"/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton
                        sx={{
                            pl: 4,
                            backgroundColor: grey[100],
                            '&:hover': {backgroundColor: grey[100],},
                        }}
                        onClick={() => handleMenuButtonPressed('/record/purchase')}
                        selected={location.pathname === "/record/purchase"}>
                        <ListItemIcon>
                            <ShoppingCartIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Purchase"/>
                    </ListItemButton>
                </ListItem>
            </Collapse>
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
            {GrowerList()}
        </Box>
    );

    return (
        <StyledDrawer variant="permanent" anchor="left"
                      PaperProps={{
                          style: {
                              width: width,
                          }
                      }}>
            {MenuList()}
        </StyledDrawer>
    )
}
