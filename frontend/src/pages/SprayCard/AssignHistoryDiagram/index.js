import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import {useEffect, useState} from 'react';
import {Button} from "@mui/material";

export default function AssignHistoryDiagram({sprayCardSelected}) {
    const [basicData, setBasicData] = useState([]);
    const [detailedData, setDetailedData] = useState([]);
    const [showBasic, setShowBasic] = useState(true);

    async function AssignHistoryGet(scpid) {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/workflow/spraycard/assignment_history/get/" + "?scpid=" + scpid, requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        const assigment_history = data.data;
                        setBasicData(assigment_history.filter(item => item.is_active === true).sort((a, b) => a.order - b.order));
                        setDetailedData(assigment_history);
                    })
                }
            })
    }

    const basicTimelineRender = () => {
        return (
            <Timeline sx={{m: 0}}>
                {basicData.map((item) => (
                    <TimelineItem key={item?.scaid}>
                        <TimelineOppositeContent
                            sx={{m: 'auto 0'}}
                            align="right"
                            variant="body2"
                            color="text.secondary"
                        >
                            {item?.assign_time}
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            {item.order !== 1 ? <TimelineConnector/> : null}
                            <TimelineDot color={item.order === basicData.length ? 'primary' : 'inherit'}>
                                {item.order === 1 ? <NoteAddIcon/> : <AssignmentReturnedIcon/>}
                            </TimelineDot>
                            {item.order !== basicData.length ? <TimelineConnector/> : null}
                        </TimelineSeparator>
                        <TimelineContent
                            sx={{m: 'auto 0'}}
                            align="right"
                        >
                            {item?.assign_to}
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
        );
    }

    const detailedTimelineRender = () => {
        const sortedData = [...detailedData].sort((a, b) => new Date(a.assign_time) - new Date(b.assign_time));
        let lastActiveItem = null;

        return (
            <Timeline sx={{m: 0}}>
                {sortedData.map((item, index) => {
                    if (item.is_active) {
                        lastActiveItem = item;
                    }

                    return (
                        <div key={item?.scaid}>
                            <TimelineItem>
                                <TimelineOppositeContent
                                    sx={{m: 'auto 0'}}
                                    align="right"
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {item?.assign_time}
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    {index !== 0 ? <TimelineConnector/> : null}
                                    <TimelineDot color={'inherit'}>
                                        {item.order === 1 ? <NoteAddIcon/> : <AssignmentReturnedIcon/>}
                                    </TimelineDot>
                                    {index !== sortedData.length - 1 ? <TimelineConnector
                                        style={item.is_active ? {} : {backgroundColor: 'red'}}/> : null}
                                </TimelineSeparator>
                                <TimelineContent
                                    sx={{m: 'auto 0'}}
                                    align="right"
                                >
                                    {item?.assign_to}
                                </TimelineContent>
                            </TimelineItem>

                            {lastActiveItem && !item.is_active &&
                                <TimelineItem>
                                    <TimelineOppositeContent
                                        sx={{m: 'auto 0'}}
                                        align="right"
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {lastActiveItem?.assign_time}
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineConnector style={{backgroundColor: 'red'}}/>
                                        <TimelineDot color={'inherit'}>
                                            {item.order === 1 ? <NoteAddIcon/> : <AssignmentReturnedIcon/>}
                                        </TimelineDot>
                                        {index !== sortedData.length - 1 ? <TimelineConnector/> : null}
                                    </TimelineSeparator>
                                    <TimelineContent
                                        sx={{m: 'auto 0'}}
                                        align="right"
                                    >
                                        {lastActiveItem?.assign_to}
                                    </TimelineContent>
                                </TimelineItem>}
                        </div>
                    );
                })}
            </Timeline>
        );
    }


    useEffect(() => {
        sprayCardSelected?.scpid && AssignHistoryGet(sprayCardSelected?.scpid);
    }, [sprayCardSelected]);

    return (
        <>
            <Button
                onClick={() => setShowBasic(!showBasic)}>{showBasic ? "See Detailed Timeline" : "Back"}</Button>
            <div style={{display: showBasic ? 'block' : 'none'}}>
                {basicTimelineRender()}
            </div>
            <div style={{display: showBasic ? 'none' : 'block'}}>
                {basicTimelineRender()}
            </div>
        </>
    );
}