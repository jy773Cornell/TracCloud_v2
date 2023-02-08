import React, {useState} from 'react'
import {Grid, Avatar, Button, Typography, Link, Card, TextField, Checkbox, FormControlLabel} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './index.scss'
import {setToken} from "../../utils";

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function handleUsernameChange(e) {
        setUsername(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    async function SignInBtnPressed() {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        };
        await fetch("/api/login/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        if (data.token) {
                            setToken(data.token);
                        }
                    })
                } else {
                    console.log(response.statusText);
                }
            })
    }

    return (
        <div className="login">
            <Grid container className="center">
                <Card elevation={10} className="card">
                    <Grid align='center'>
                        <Avatar><LockOutlinedIcon/></Avatar>
                        <Typography variant="h4" component="h4">Sign In</Typography>
                    </Grid>
                    <div>
                        <TextField label='Username' placeholder='Enter username'
                                   variant="standard" fullWidth required onChange={handleUsernameChange}/>
                    </div>
                    <div className="textField">
                        <TextField label='Password' placeholder='Enter password'
                                   variant="standard" type='password' fullWidth required
                                   onChange={handlePasswordChange}/>
                    </div>
                    <FormControlLabel
                        control={<Checkbox name="remember" color="primary"/>}
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
        </div>
    )
}

export default Login