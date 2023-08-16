import * as React from 'react';
import {Menu, MenuItem} from "@mui/material";

export default function SettingList(props) {
    return (
        <Menu
            id="setting-menu"
            anchorEl={props.settingAnchorEl}
            keepMounted
            open={Boolean(props.settingAnchorEl)}
            onClose={() => props.setSettingAnchorEl(null)}
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
    );
}
