import React, {useState} from 'react'
import {Grid, Avatar, Button, Typography, Link, Card, TextField, Checkbox, FormControlLabel} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './index.scss'
import {setToken} from "../../utils";

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [remember, setRemember] = useState(false)
    const [errors, setErrors] = useState({
        "status": [false, false], "message": ["", ""],
    })


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
                method: "POST", headers: {"Content-Type": "application/json"},
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
                                window.location.href = "/profile";
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

    return (<div className="login">
        <Grid container className="center">
            <Card elevation={10} className="card">
                <Grid align='center'>
                    <Avatar><LockOutlinedIcon/></Avatar>
                    <Typography variant="h4" component="h4">Sign In</Typography>
                </Grid>
                <div>
                    <TextField label='Username' placeholder='Enter username'
                               variant="standard" fullWidth required
                               error={errors.status[0]}
                               helperText={errors.message[0]}
                               onChange={handleUsernameChange}/>
                </div>
                <div className="textField">
                    <TextField label='Password' placeholder='Enter password'
                               variant="standard" type='password' fullWidth required
                               error={errors.status[1]}
                               helperText={errors.message[1]}
                               onChange={handlePasswordChange}/>
                </div>
                <FormControlLabel
                    control={<Checkbox name="remember" color="primary" onChange={handleRememberChange}/>}
                    label="Remember me"
                />
                <Button type='submit' color='primary' variant="contained" fullWidth onClick={SignInBtnPressed}>Sign
                    in</Button>
                <div className="info">
                    <Typography>
                        <Link href="#">Forgot password?</Link>
                    </Typography>
                    <Typography> Do you have an account?
                        <Link href="#"> Sign Up </Link>
                    </Typography>
                </div>
            </Card>
        </Grid>
    </div>)
}

export default Login