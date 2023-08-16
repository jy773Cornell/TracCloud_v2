import * as React from 'react';
import {useEffect, useState} from "react";
import {Menu, MenuItem, Typography} from "@mui/material";
import {Box} from "@mui/system";

export default function NotificationList(props) {
    const [notificationList, setNotificationList] = useState([]);

    async function NotificationListGet(recipient_id) {
        const requestOptions = {
            method: "GET",
            headers: {"Content-Type": "application/json",},
        };
        await fetch("/message/notification/unread/list/get" + "?recipient_id=" + recipient_id, requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setNotificationList(data.data);
                        props.setNotificationItems(createNotificationItems(data.data));
                    })
                }
            })
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();

        // Compare year, month, and day
        if (date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate()) {
            // If the date is today, return only the time
            return date.toTimeString().split(' ')[0];
        } else {
            // If the date is not today, return only the date
            return date.toISOString().split('T')[0];
        }
    };

    const createNotificationItems = (notificationData) => {
        return (
            notificationData.map(item => {
                return {
                    id: item.mid,
                    text: item.text,
                    time: formatDate(item.create_time),
                    type: item.type,
                    author: item.author,
                    recipient: item.recipient,
                    url: "",
                };
            })
        )
    };

    useEffect(() => {
        if (props.uid) {
            NotificationListGet(props.uid);
        }
    }, [props.notificationFetch]);

    return (
        <Menu
            id="setting-menu"
            anchorEl={props.notificationAnchorEl}
            keepMounted
            open={Boolean(props.notificationAnchorEl)}
            onClose={() => props.setNotificationAnchorEl(null)}
        >
            {props.notificationItems.length > 0 ?
                props.notificationItems.map(item => (
                    <MenuItem key={item.id}>
                        <a href={item.url}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="inherit" style={{fontSize: '0.9rem'}}>
                                    {item.text}
                                </Typography>
                                <Box mx={1}></Box>
                                <Typography variant="inherit" noWrap style={{fontSize: '0.9rem'}}>
                                    {item.time}
                                </Typography>
                            </Box>
                        </a>
                    </MenuItem>)) :
                (<MenuItem key="no-notification">
                    <Typography variant="inherit" style={{fontSize: '0.9rem'}}>
                        {"There is no new notification."}
                    </Typography>
                </MenuItem>)}
        </Menu>
    );

}
