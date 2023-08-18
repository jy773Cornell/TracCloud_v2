import * as React from 'react';
import {useContext, useEffect, useState} from "react";
import {Menu, MenuItem, Typography} from "@mui/material";
import {Box} from "@mui/system";
import {NotificationFetchContext} from "./NotificationFetchContext";

export default function NotificationList(props) {
    const {notificationFetch, toggleNotificationFetch} = useContext(NotificationFetchContext);
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
        const subjectGenerator = (type, author) => {
            let subject;

            switch (type) {
                case "Connection":
                    subject = `New connection request from ${author}!`;
                    break;
                case "Reports":
                    subject = `New shared reports from ${author}!`;
                    break;
            }

            return subject;
        }

        const urlGenerator = (type, author, mid, connection) => {
            let url;

            switch (type) {
                case "Connection":
                    url = `people/connection/?mid=${mid}&cpid=${connection}`;
                    break;
                case "Reports":
                    url = `people/?mid=${mid}&reportHistory=${true}`;
                    break;
            }

            return url;
        }

        return (
            notificationData.map(item => {
                return {
                    id: item.mid,
                    subject: subjectGenerator(item.type, item.author),
                    time: formatDate(item.create_time),
                    type: item.type,
                    author: item.author,
                    recipient: item.recipient,
                    url: urlGenerator(item.type, item.author, item.mid, item.connection),
                };
            })
        )
    };

    useEffect(() => {
        if (props.uid) {
            NotificationListGet(props.uid);
        }
    }, [notificationFetch]);

    useEffect(() => {
        const interval = setInterval(() => {
            toggleNotificationFetch();
        }, 30000);

        // Cleanup on unmount
        return () => clearInterval(interval);
    }, []);

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
                                    {item.subject}
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
