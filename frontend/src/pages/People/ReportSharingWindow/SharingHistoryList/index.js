import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Paper from "@mui/material/Paper";
import {DrawerHeader} from "./styles";
import {Divider} from "@mui/material";

export default function SharingHistoryList(props) {

    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <Paper
            style={{
                height: 'calc(3/4 * 9/10 * 100vh)',
                marginRight: '16px',
                marginLeft: props.relationType === "Client" ? '16px' : '0px',
                marginTop: '16px',
                overflow: 'auto',
            }}
            sx={{
                border: '1px solid',
                borderColor: 'divider',
            }}
        >
            <DrawerHeader>
                Reports History
            </DrawerHeader>
            <Divider/>
            <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                <ListItemButton>
                    <ListItemIcon>
                        <SendIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Sent mail"/>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <DraftsIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Drafts"/>
                </ListItemButton>
                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <InboxIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Inbox"/>
                    {open ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{pl: 4}}>
                            <ListItemIcon>
                                <StarBorder/>
                            </ListItemIcon>
                            <ListItemText primary="Starred"/>
                        </ListItemButton>
                    </List>
                </Collapse>
            </List>
        </Paper>
    );
}