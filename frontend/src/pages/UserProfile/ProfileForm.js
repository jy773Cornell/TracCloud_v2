import * as React from 'react';
import {Button, Card, CardContent, Grid, TextField} from "@mui/material";
import {EditButton} from "./styles";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import Paper from "@mui/material/Paper";

const userType = {"Grower": "Grower", "Applicator": "Applicator",};

export default function ProfileForm({
                                        field_names,
                                        profile,
                                        fieldValues,
                                        isEdit,
                                        setIsEdit,
                                        inputError,
                                        onEditClicked,
                                        handleInputChange,
                                        handleSaveButtonPressed,
                                    }) {


    return (
        <Paper sx={{width: 800, border: '1px solid #c8c8c8'}}>
            <CardContent>
                <Grid container justifyContent="center" spacing={2}>
                    <Grid item xs={12} sx={{textAlign: 'center'}}>
                        <h1>{profile.username}</h1>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Type"
                            variant="outlined"
                            value={profile[field_names[0]]}
                            InputProps={{readOnly: true}}
                            sx={{width: '100%'}}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        {isEdit ? <TextField
                            label="First Name"
                            variant="outlined"
                            required={true}
                            value={fieldValues[field_names[1]]}
                            error={inputError[field_names[1]]}
                            autoComplete="given-name"
                            onChange={(event) => {
                                handleInputChange(event, event.target.value, field_names[1]);
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{width: '100%'}}
                        /> : <TextField
                            label="First Name"
                            variant="outlined"
                            value={profile[field_names[1]]}
                            InputProps={{readOnly: true}}
                            sx={{width: '100%'}}
                        />}
                    </Grid>
                    <Grid item xs={4}>
                        {isEdit ? <TextField
                            label="Last Name"
                            variant="outlined"
                            required={true}
                            value={fieldValues[field_names[2]]}
                            error={inputError[field_names[2]]}
                            autoComplete="family-name"
                            onChange={(event) => {
                                handleInputChange(event, event.target.value, field_names[2]);
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{width: '100%'}}
                        /> : <TextField
                            label="Last Name"
                            variant="outlined"
                            value={profile[field_names[2]]}
                            InputProps={{readOnly: true}}
                            sx={{width: '100%'}}
                        />}
                    </Grid>
                    {profile[field_names[0]] === userType["Applicator"] &&
                        <>
                            <Grid item xs={6}>
                                {isEdit ? <TextField
                                    label="Pesticide Certification I.D. Number"
                                    variant="outlined"
                                    required={true}
                                    value={fieldValues[field_names[3]]}
                                    onChange={(event) => {
                                        handleInputChange(event, event.target.value, field_names[3]);
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    sx={{width: '100%'}}
                                /> : <TextField
                                    label="Pesticide Certification I.D. Number"
                                    variant="outlined"
                                    value={profile[field_names[3]]}
                                    InputProps={{readOnly: true}}
                                    sx={{width: '100%'}}
                                />}
                            </Grid>
                            <Grid item xs={6}>
                                {isEdit ? <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Pesticide Certification Expire Date"
                                        variant="outlined"
                                        required={true}
                                        value={dayjs(fieldValues[field_names[4]])}
                                        onChange={(event) => {
                                            handleInputChange(event, dayjs(event).format('YYYY-MM-DD'), field_names[4]);
                                        }}
                                        sx={{width: '100%'}}
                                    />
                                </LocalizationProvider> : <TextField
                                    label="Pesticide Certification Expire Date"
                                    variant="outlined"
                                    value={profile[field_names[4]]}
                                    InputProps={{readOnly: true,}}
                                    sx={{width: '100%'}}
                                />}
                            </Grid>
                        </>}
                    {profile[field_names[0]] === userType["Grower"] &&
                        <>
                            <Grid item xs={12}>
                                {isEdit ? <TextField
                                    label="Business Name"
                                    variant="outlined"
                                    value={fieldValues[field_names[5]]}
                                    onChange={(event) => {
                                        handleInputChange(event, event.target.value, field_names[5]);
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    sx={{width: '100%'}}
                                /> : <TextField
                                    label="Business Name"
                                    variant="outlined"
                                    value={profile[field_names[5]]}
                                    InputProps={{readOnly: true}}
                                    sx={{width: '100%'}}
                                />}
                            </Grid>
                            <Grid item xs={12}>
                                {isEdit ? <TextField
                                    label="Address Line1"
                                    variant="outlined"
                                    required={true}
                                    autoComplete="address-line1"
                                    value={fieldValues[field_names[6]]}
                                    onChange={(event) => {
                                        handleInputChange(event, event.target.value, field_names[6]);
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    sx={{width: '100%'}}
                                /> : <TextField
                                    label="Address Line1"
                                    variant="outlined"
                                    value={profile[field_names[6]]}
                                    InputProps={{readOnly: true,}}
                                    sx={{width: '100%'}}
                                />}
                            </Grid>
                            <Grid item xs={12}>
                                {isEdit ? <TextField
                                    label="Address Line2"
                                    variant="outlined"
                                    required={true}
                                    autoComplete="address-line2"
                                    value={fieldValues[field_names[7]]}
                                    onChange={(event) => {
                                        handleInputChange(event, event.target.value, field_names[7]);
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    sx={{width: '100%'}}
                                /> : <TextField
                                    label="Address Line2"
                                    variant="outlined"
                                    value={profile[field_names[7]]}
                                    InputProps={{readOnly: true,}}
                                    sx={{width: '100%'}}
                                />}
                            </Grid>
                            <Grid item xs={2.4}>
                                {isEdit ? <TextField
                                    label="City"
                                    variant="outlined"
                                    value={fieldValues[field_names[8]]}
                                    autoComplete="address-level2"
                                    onChange={(event) => {
                                        handleInputChange(event, event.target.value, field_names[8]);
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    sx={{width: '100%'}}
                                /> : <TextField
                                    label="City"
                                    variant="outlined"
                                    value={profile[field_names[8]]}
                                    InputProps={{readOnly: true}}
                                    sx={{width: '100%'}}
                                />}
                            </Grid>
                            <Grid item xs={2.4}>
                                {isEdit ? <TextField
                                    label="State"
                                    variant="outlined"
                                    value={fieldValues[field_names[9]]}
                                    autoComplete="address-level1"
                                    onChange={(event) => {
                                        handleInputChange(event, event.target.value, field_names[9]);
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    sx={{width: '100%'}}
                                /> : <TextField
                                    label="State"
                                    variant="outlined"
                                    value={profile[field_names[9]]}
                                    InputProps={{readOnly: true}}
                                    sx={{width: '100%'}}
                                />}
                            </Grid>
                            <Grid item xs={2.4}>
                                {isEdit ? <TextField
                                    label="Zip Code"
                                    variant="outlined"
                                    value={fieldValues[field_names[10]]}
                                    autoComplete="postal-code"
                                    onChange={(event) => {
                                        handleInputChange(event, event.target.value, field_names[10]);
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    sx={{width: '100%'}}
                                /> : <TextField
                                    label="Zip Code"
                                    variant="outlined"
                                    value={profile[field_names[10]]}
                                    InputProps={{readOnly: true}}
                                    sx={{width: '100%'}}
                                />}
                            </Grid>
                            <Grid item xs={2.4}>
                                {isEdit ? <TextField
                                    label="County"
                                    variant="outlined"
                                    value={fieldValues[field_names[11]]}
                                    autoComplete="address-level3"
                                    onChange={(event) => {
                                        handleInputChange(event, event.target.value, field_names[11]);
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    sx={{width: '100%'}}
                                /> : <TextField
                                    label="County"
                                    variant="outlined"
                                    value={profile[field_names[11]]}
                                    InputProps={{readOnly: true}}
                                    sx={{width: '100%'}}
                                />}
                            </Grid>
                            <Grid item xs={2.4}>
                                {isEdit ? <TextField
                                    label="Country"
                                    variant="outlined"
                                    value={fieldValues[field_names[12]]}
                                    autoComplete="country"
                                    onChange={(event) => {
                                        handleInputChange(event, event.target.value, field_names[12]);
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    sx={{width: '100%'}}
                                /> : <TextField
                                    label="Country"
                                    variant="outlined"
                                    value={profile[field_names[12]]}
                                    InputProps={{readOnly: true}}
                                    sx={{width: '100%'}}
                                />}
                            </Grid>
                        </>}
                    <Grid item xs={6}>
                        {isEdit ? <TextField
                            label="Cell Phone"
                            variant="outlined"
                            value={fieldValues[field_names[13]]}
                            autoComplete="tel"
                            onChange={(event) => {
                                handleInputChange(event, event.target.value, field_names[13]);
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{width: '100%'}}
                        /> : <TextField
                            label="Cell Phones"
                            variant="outlined"
                            value={profile[field_names[13]]}
                            InputProps={{readOnly: true}}
                            sx={{width: '100%'}}
                        />}
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            value={profile[field_names[14]]}
                            InputProps={{readOnly: true}}
                            sx={{width: '100%'}}
                        />
                    </Grid>
                    {isEdit ? <>
                        <Grid item xs={6} sx={{justifyContent: 'center', textAlign: 'center'}}>
                            <Button variant="contained" color="secondary" onClick={() => setIsEdit(false)}>
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item xs={6} sx={{justifyContent: 'center', textAlign: 'center'}}>
                            <Button variant="contained" color="success" onClick={() => handleSaveButtonPressed()}>
                                Save
                            </Button>
                        </Grid>
                    </> : <Grid item xs={12} sx={{justifyContent: 'center', textAlign: 'center'}}>
                        <EditButton variant="contained" color="secondary" onClick={() => onEditClicked()}>
                            Edit
                        </EditButton>
                    </Grid>}
                </Grid>
            </CardContent>
        </Paper>
    );
}
