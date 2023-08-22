import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import DescriptionIcon from '@mui/icons-material/Description';
import ListIcon from '@mui/icons-material/List';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Paper from "@mui/material/Paper";
import {DrawerHeader} from "./styles";
import {Badge, Divider, ListItem} from "@mui/material";
import {useContext, useEffect} from "react";
import {getCookie} from "../../../../utils";
import DownloadIcon from "@mui/icons-material/Download";
import IconButton from "@mui/material/IconButton";
import {NotificationFetchContext} from '../../../../components/NotificationList/NotificationFetchContext';

export default function SharingHistoryList(props) {
    const {notificationFetch, toggleNotificationFetch} = useContext(NotificationFetchContext);

    const [reportsHistoryList, setReportsHistoryList] = React.useState([]);
    const [reportUserName, setReportUserName] = React.useState("");
    const [openIndexes, setOpenIndexes] = React.useState([]);

    async function ReportMessageGet(author_id, recipient_id) {
        const requestOptions = {
            method: "GET",
            headers: {"Content-Type": "application/json",},
        };
        await fetch("/message/report/list/get" + "?author_id=" + author_id + "&recipient_id=" + recipient_id, requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setReportsHistoryList(data.report_messages);

                        setReportUserName(
                            props.relationType === "Client" ?
                                data.users.author
                                : data.users.recipient
                        )
                    })
                }
            })
    }

    async function ReportDownload(user_id, rid) {
        const apiData = {user_id, rid};
        const csrftoken = getCookie('csrftoken');
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json", 'X-CSRFToken': csrftoken,},
            body: JSON.stringify(apiData),
        };

        try {
            const response = await fetch("/media/report/download/", requestOptions);

            if (!response.ok) {
                throw new Error("Server response was not ok.");
            }

            const contentDisposition = response.headers.get('Content-Disposition');
            let filename = 'downloaded_file';
            if (contentDisposition) {
                const filenameMatch = contentDisposition.match(/filename="([^"]+)"/);
                if (filenameMatch && filenameMatch[1]) {
                    filename = filenameMatch[1];
                }
            }

            const reportFile = await response.arrayBuffer();
            const blob = new Blob([reportFile]);
            const downloadUrl = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.error("Error downloading the file:", error);
        }
    }

    async function ReadMessage(mid) {
        const apiData = {mid};
        console.log(apiData);
        const csrftoken = getCookie('csrftoken');
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(apiData),
        };
        await fetch("/message/read", requestOptions)
            .then((response) => {
                if (response.ok) {
                    markAsRead(mid);
                }
            })
    }

    const markAsRead = (mid) => {
        const updatedData = reportsHistoryList.map(item =>
            item.mid === mid ? {...item, is_read: true} : item
        );

        setReportsHistoryList(updatedData);
    }

    const handleDownload = (user_id, rid) => {
        ReportDownload(user_id, rid);
    }

    const handleToggle = (mid) => {
        const isOpen = openIndexes.includes(mid);
        setOpenIndexes(isOpen ? openIndexes.filter(id => id !== mid) : [...openIndexes, mid]);
    };

    const handleRead = async (message) => {
        if (!message.is_read && props.relationType === "Client") {
            await ReadMessage(message.mid);
            toggleNotificationFetch();
        }
    };

    const ReportsListItem = () => {
        return (
            <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                {reportsHistoryList.map((item) => (
                    <React.Fragment key={item.mid}>
                        <ListItemButton
                            onClick={() => {
                                handleToggle(item.mid);
                                handleRead(item);
                            }}
                        >
                            <ListItemIcon>
                                <Badge
                                    color="error"
                                    variant="dot"
                                    invisible={
                                        props.relationType === "Client" ?
                                            item.is_read : true
                                    }>
                                    <ListIcon/>
                                </Badge>
                            </ListItemIcon>
                            <ListItemText
                                primary={item.subject}
                                secondary={item.create_time}
                                sx={{
                                    overflowWrap: 'break-word',
                                    wordWrap: 'break-word'
                                }}
                            />
                            {openIndexes.includes(item.mid) ? <ExpandLess/> : <ExpandMore/>}
                        </ListItemButton>
                        <Collapse in={openIndexes.includes(item.mid)} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {item.reports.map((report) => (
                                    <ListItem key={report.rid} sx={{pl: 4, display: 'flex', alignItems: 'center'}}>
                                        <ListItemIcon>
                                            <DescriptionIcon/>
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={report.name}
                                        />
                                        <IconButton onClick={() => handleDownload(report.user_id, report.rid)}>
                                            <DownloadIcon/>
                                        </IconButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                        <Divider/>
                    </React.Fragment>
                ))}
            </List>

        );
    }

    useEffect(() => {
        if (props.selectedUser) {
            props.relationType === "Client" ?
                ReportMessageGet(props.selectedUser, props.employerID)
                : ReportMessageGet(props.employerID, props.selectedUser)
        }
    }, [props.selectedUser, props.refreshRecord]);

    useEffect(() => {
        if (reportsHistoryList.length > 0) {
            props.relationType === "Client" ?
                setReportUserName(reportsHistoryList[0].author)
                : setReportUserName(reportsHistoryList[0].recipient)
        }
    }, [reportsHistoryList]);

    return (
        <Paper
            style={{
                height: 'calc(3/4 * 5/6 * 100vh)',
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
                Reports History with {reportUserName}
            </DrawerHeader>
            <Divider/>
            {ReportsListItem()}
        </Paper>
    );
}