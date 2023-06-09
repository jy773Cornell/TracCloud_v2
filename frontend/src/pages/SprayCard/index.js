import * as React from 'react';
import {Grid} from "@mui/material";
import {AddButton} from "./styles";
import AddIcon from "@mui/icons-material/Add";
import {lazy, useEffect, useState} from "react";
import {observer} from 'mobx-react-lite'
import {useStore} from '../../store'

const SprayCardInit = lazy(() => import('./SprayCardInit'))
const SprayCardDataGrid = lazy(() => import('./SprayCardDataGrid'))
const SprayCardDetails = lazy(() => import('./SprayCardDetails'))

function SprayCard(props) {
    const uid = props.uid
    const {sprayCardStore} = useStore()

    const [sprayData, setSprayData] = React.useState({});
    const [sprayOptions, setSprayOption] = React.useState({});
    const [addSprayCard, setAddSprayCard] = React.useState(false);
    const [sprayCardSelected, setSprayCardSelected] = React.useState(null);
    const [refreshRecord, setRefreshRecord] = useState(false);

    const addSprayCardProps = {
        uid,
        addSprayCard,
        setAddSprayCard,
        sprayData,
        sprayOptions,
        refreshRecord,
        setRefreshRecord
    };

    const dataGridProps = {
        uid,
        refreshRecord,
        sprayCardSelected,
        setSprayCardSelected
    };

    const detailsProps = {
        uid,
        sprayCardSelected,
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await sprayCardStore.getSprayData(uid);
            setSprayData(data["record_data"]);
            setSprayOption(data["option_data"]);
        };

        fetchData();
    }, []);

    return (
        <div>
            <AddButton
                variant="contained"
                startIcon={<AddIcon/>}
                onClick={() => setAddSprayCard(true)}
            >
                Add Spray Card Process
            </AddButton>
            <div style={{margin: '0px 15px'}}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <SprayCardDataGrid {...dataGridProps}/>
                    </Grid>
                    <Grid item xs={6}>
                        <SprayCardDetails {...detailsProps}/>
                    </Grid>
                </Grid>
            </div>
            <SprayCardInit {...addSprayCardProps}/>
        </div>
    );
}

export default observer(SprayCard);