import React, {useState} from 'react'
import {Grid, Button, Typography, Link, TextField, Checkbox, FormControlLabel, Popover} from '@mui/material'
import {StyledCard, StyledGrid, StyledTypography} from "./styles";
import {setToken, getCookie} from "../../utils";
import {useNavigate} from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [remember, setRemember] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const [errors, setErrors] = useState({
        "status": [false, false], "message": ["", ""],
    })

    const navigate = useNavigate();

    const QRCodes = () => {
        return (
            <>
                <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={() => setAnchorEl(null)}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Grid container>
                        <Grid item xs={6} container direction="column" alignItems="center" justify="center">
                            <img
                                src="../../static/frontend/img/ios_QR.png"
                                style={{width: '100px', height: '100px', margin: '8px', marginBottom: '0px'}}
                                alt="iOS QR Code"/>
                            <div style={{textAlign: 'center', marginBottom: '8px'}}>iOS</div>
                        </Grid>
                        <Grid item xs={6} container direction="column" alignItems="center" justify="center">
                            <img
                                src="../../static/frontend/img/android_QR.png"
                                style={{width: '100px', height: '100px', margin: '8px', marginBottom: '0px'}}
                                alt="Android QR Code"/>
                            <div style={{textAlign: 'center', marginBottom: '8px'}}>Android</div>
                        </Grid>
                    </Grid>
                </Popover>
            </>
        );
    }

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleRememberChange(event) {
        setRemember(event.target.checked);
    }

    async function SignInBtnPressed(event) {
        event.preventDefault();

        setErrors({
            "status": [false, false], "message": ["", ""],
        })

        if (username === "" && password === "") {
            setErrors({
                "status": [true, true], "message": ["This field is required.", "This field is required."],
            })
        } else if (username === "") {
            setErrors({
                "status": [true, false], "message": ["This field is required.", ""],
            })
        } else if (password === "") {
            setErrors({
                "status": [false, true], "message": ["", "This field is required."],
            })
        } else {
            const csrftoken = getCookie('csrftoken');
            const requestOptions = {
                method: "POST", headers: {
                    "Content-Type": "application/json", 'X-CSRFToken': csrftoken,
                }, body: JSON.stringify({
                    username: username, password: password, remember: remember,
                }),
            };
            await fetch("/api/login/", requestOptions)
                .then((response) => {
                    if (response.ok) {
                        response.json().then((data) => {
                            if (data.token) {
                                setToken(data.token);
                                navigate("/home");
                            }
                        })
                    } else {
                        if (response.statusText === "Not Found") {
                            setErrors({
                                "status": [true, false], "message": ["Input username doesn't exist.", ""],
                            })
                        } else if (response.statusText === "Forbidden") {
                            setErrors({
                                "status": [false, true], "message": ["", "Please input correct password."],
                            })
                        }
                    }
                })
        }
    }

    return (
        <StyledGrid container>
            <StyledCard elevation={10}>
                <form onSubmit={(event) => SignInBtnPressed(event)}>
                    <Grid align='center'>
                        <img
                            src="../../static/frontend/img/logo.png"
                            style={{width: '80px', height: '80px'}}
                            alt="Log"
                        />
                        <h1 style={{margin: "0"}}>Trac Cloud</h1>
                    </Grid>
                    <TextField label='Username' placeholder='Enter username'
                               variant="standard" fullWidth required
                               error={errors.status[0]}
                               helperText={errors.message[0]}
                               onChange={handleUsernameChange}/>
                    <TextField label='Password' placeholder='Enter password'
                               variant="standard" type='password' fullWidth required
                               error={errors.status[1]}
                               helperText={errors.message[1]}
                               onChange={handlePasswordChange}/>
                    <FormControlLabel
                        control={<Checkbox name="remember" color="primary" onChange={handleRememberChange}/>}
                        label="Remember me"
                    />
                    <Button
                        type='submit'
                        color='primary'
                        variant="contained"
                        fullWidth>
                        Sign in
                    </Button>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        textAlign="center"
                    >
                        <Grid item xs={12}>
                            <Button sx={{marginTop: "8px"}} onClick={(event) => setAnchorEl(event.currentTarget)}>
                                Obtain the Trac Cloud mobile App
                            </Button>
                            {QRCodes()}
                            <Typography>
                                <Link href="/workflow/registration" target="_blank" rel="noopener noreferrer">
                                    Don't have an account? Sign Up</Link>
                            </Typography>
                            <StyledTypography>
                                <Link href="/workflow/password_reset" target="_blank" rel="noopener noreferrer">
                                    Forgot password?
                                </Link>
                            </StyledTypography>
                        </Grid>
                    </Grid>
                </form>
            </StyledCard>
        </StyledGrid>
    )
}