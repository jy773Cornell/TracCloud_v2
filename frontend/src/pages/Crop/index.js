import * as React from 'react';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {Autocomplete, Button, Card, CardContent, Grid, Modal, TextField} from "@mui/material";
import {AddButton} from "./styles";
import OperationSnackbars from "../../components/Snackbars";
import {
    DataGrid,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector, GridToolbarExport,
    GridToolbarFilterButton
} from "@mui/x-data-grid";

const columnWidth = 200;
const options = ["s", "s"]
const columns = [
    {field: 'id', headerName: 'ID', width: columnWidth},
    {
        field: 'crop', headerName: 'Crop', width: columnWidth,
        editable: true,
        renderCell: (params) => (
            <Autocomplete
                options={options}
                value={params.value}
                onChange={(event, newValue) => {
                    params.setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} sx={{width: columnWidth}}/>}
            />),
    },
    {field: 'variety', headerName: 'Variety', width: columnWidth},
    {field: 'crop_code', headerName: 'Crop Code', width: columnWidth,},
    {field: 'category', headerName: 'Category', width: columnWidth,},
    {field: 'growth_stage', headerName: 'Growth Stage', width: columnWidth,},
    {field: 'update_time', headerName: 'Update Time', width: columnWidth,},
];

const field_names = ["crop_id", "variety_id", "crop_code", "category", "growth_stage_id"]

function createRowData(record) {
    return {
        "id": record.cid,
        "crop": record.crop,
        "variety": record.variety,
        "crop_code": record.crop_code,
        "category": record.category,
        "growth_stage": record.growth_stage,
        "update_time": record.update_time
    };
}

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton/>
            <GridToolbarFilterButton/>
            <GridToolbarDensitySelector/>
            <GridToolbarExport/>
        </GridToolbarContainer>
    );
}

function AddCropRecord({uid, showAddModal, setShowAddModal, setIsSave}) {
    const [formData, setFormData] = useState({});
    const [fieldValues, setFieldValues] = useState({});
    const [cropCategory, setCropCategory] = useState([]);
    const [cropVariety, setCropVariety] = useState([]);
    const [cropGrowthStage, setCropGrowthStage] = useState([]);
    const [CropCategoryOptions, setCropCategoryOptions] = useState([]);
    const [cropVarietyOptions, setCropVarietyOptions] = useState([]);
    const [CropGrowthStageOptions, setCropGrowthStageOptions] = useState([]);

    async function CropCategoryGet() {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/api/crop/category/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setCropCategory(data.data);
                    })
                }
            })
    }

    async function CropVarietyGet() {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/api/crop/variety/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setCropVariety(data.data);
                    })
                }
            })
    }

    async function CropGrowthStageGet() {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/api/crop/growthstage/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setCropGrowthStage(data.data);
                    })
                }
            })
    }

    async function CropRecordSave() {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData),
        };
        await fetch("/api/crop/create/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    setIsSave(true);
                    setShowAddModal(false);
                }
            })
    }

    const CropCategoryOptionsFresh = () => {
        setCropCategoryOptions(cropCategory.map(item => ({
            label: item.name,
            id: item.ccid,
            crop_code: item.crop_code,
            category: item.category,
        })));
    };

    const CropVarietyOptionsFresh = (crop_id) => {
        setCropVarietyOptions(cropVariety.filter(item => item.crop === crop_id).map(item => ({
            label: item.name,
            id: item.cvid
        })))
    };

    const CropGrowthStageOptionsFresh = (crop_id) => {
        setCropGrowthStageOptions(cropGrowthStage.filter(item => item.crop === crop_id).map(item => ({
            label: item.name,
            id: item.cgsid
        })))
    };

    const handleInputChange = (event, value, field) => {
        console.log(value)
        if (field === field_names[0]) {
            setFieldValues({
                ...fieldValues,
                [field]: value.label,
                [field_names[1]]: "",
                [field_names[2]]: value.crop_code,
                [field_names[3]]: value.category,
                [field_names[4]]: "",
            });
            setFormData({
                    ...formData,
                    [field]: value.id,
                    [field_names[1]]: null,
                    [field_names[4]]: null
                }
            );
            CropVarietyOptionsFresh(value.id);
            CropGrowthStageOptionsFresh(value.id);
        } else {
            setFieldValues({...fieldValues, [field]: value.label})
            setFormData({...formData, [field]: value.id});
        }
    };

    const handleSaveButtonPressed = () => {
        console.log(formData)
        CropRecordSave();
    };

    useEffect(() => {
        CropCategoryGet();
        CropVarietyGet();
        CropGrowthStageGet();
        setFormData({"user_id": uid});
        setFieldValues(Object.fromEntries(field_names.map(item => [item, ""])));
    }, []);

    useEffect(() => {
        CropCategoryOptionsFresh();
    }, [cropCategory]);

    return (
        <Modal
            open={showAddModal}
            onClose={() => setShowAddModal(false)}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Card sx={{width: 400}}>
                <CardContent>
                    <Grid container justifyContent="center" spacing={2}>
                        <Grid item xs={12} sx={{textAlign: 'center'}}>
                            <h1>Add Crop Record</h1>
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                options={CropCategoryOptions}
                                renderInput={(params) => (
                                    <TextField {...params} variant="outlined" label={columns[1].headerName}/>
                                )}
                                onChange={(event, value) => {
                                    handleInputChange(event, value, field_names[0])
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                options={cropVarietyOptions}
                                renderInput={(params) => (
                                    <TextField {...params} variant="outlined" label={columns[2].headerName}/>
                                )}
                                onChange={(event, value) => {
                                    handleInputChange(event, value, field_names[1])
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                disabled
                                value={fieldValues[field_names[2]]}
                                variant="outlined"
                                label={columns[3].headerName}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                disabled
                                value={fieldValues[field_names[3]]}
                                variant="outlined"
                                label={columns[4].headerName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                options={CropGrowthStageOptions}
                                renderInput={(params) => (
                                    <TextField {...params} variant="outlined" label={columns[5].headerName}/>
                                )}
                                onChange={(event, value) => {
                                    handleInputChange(event, value, field_names[4])
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{justifyContent: 'center', textAlign: 'center'}}>
                            <Button variant="contained" color="success" onClick={() => handleSaveButtonPressed()}>
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Modal>
    );
}

export default function Crop(props) {
    const [rows, setRows] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isSave, setIsSave] = useState(false);

    async function CropListGet(props) {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/api/crop/list/get/" + "?uid=" + props.uid, requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        const record_list = data.data;
                        const record_row = record_list.map((record) => createRowData(record))
                        setRows(record_row);
                    })
                }
            })
    }

    const onEditClicked = () => {
        setIsEdit(true);
    };

    const uid = props.uid;
    const addProps = {uid, showAddModal, setShowAddModal, setIsSave};

    const msg = "Crop record is uploaded successfully!"
    const saveProps = {isSave, setIsSave, msg};

    columns.push({
        field: 'operations',
        headerName: 'Operations',
        sortable: false,
        width: columnWidth,
        disableClickEventBubbling: true,
        renderCell: (params) => {

            return (
                <>
                    {
                        isEdit ?
                            (
                                <IconButton>
                                    <DeleteIcon/>
                                </IconButton>
                            ) :
                            (
                                <>
                                    <IconButton onClick={onEditClicked}>
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton>
                                        <DeleteIcon/>
                                    </IconButton>
                                </>
                            )
                    }
                </>
            );
        },
    })

    useEffect(() => {
        CropListGet(props);
    }, [showAddModal]);

    return (
        <div>
            <AddButton
                variant="contained"
                startIcon={<AddIcon/>}
                onClick={() => setShowAddModal(true)}>
                Add Crop
            </AddButton>
            <Paper style={{height: 900, margin: '0px 15px'}}>
                <DataGrid
                    columns={columns}
                    rows={rows}
                    disableRowSelectionOnClick={true}
                    rowSelection={false}
                    slots={{
                        toolbar: CustomToolbar,
                    }}
                />
            </Paper>
            <AddCropRecord {...addProps}/>
            <OperationSnackbars  {...saveProps}/>
        </div>
    );
}