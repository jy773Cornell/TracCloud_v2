import React, {useState} from 'react'
import {Grid, Avatar, Button, Typography, Link, TextField, Checkbox, FormControlLabel} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {StyledCard, StyledGrid, StyledTypography} from "./styles";
import {setToken} from "../../utils";
import {useNavigate} from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [remember, setRemember] = useState(false)
    const [errors, setErrors] = useState({
        "status": [false, false], "message": ["", ""],
    })

    const navigate = useNavigate();

    function handleUsernameChange(e) {
        setUsername(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleRememberChange(e) {
        setRemember(e.target.checked);
    }

    async function SignInBtnPressed() {
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
            const requestOptions = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    username: username,
                    password: password,
                    remember: remember,
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
                <Grid align='center'>
                    <Avatar sx={{backgroundColor: '#1bbd7e'}}> < LockOutlinedIcon/> < /Avatar>
                    <Typography variant="h4" component="h4">Sign In</Typography>
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
                <Button type='submit' color='primary' variant="contained" fullWidth onClick={SignInBtnPressed}>Sign
                    in</Button>
                <StyledTypography>
                    <Link href="#">Forgot password?</Link>
                </StyledTypography>
                <Typography> Do you have an account?
                    <Link href="#"> Sign Up </Link>
                </Typography>
            </StyledCard>
        </StyledGrid>
    )
}