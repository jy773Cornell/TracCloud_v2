import React from 'react'
import {Grid, Avatar, Button, Typography, Link, Card, TextField, Checkbox, FormControlLabel} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './index.scss'
import {useStore} from '../../store/index'

function Login() {
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
                                   variant="standard" fullWidth required/>
                    </div>
                    <div className="textField">
                        <TextField label='Password' placeholder='Enter password'
                                   variant="standard" type='password' fullWidth required/>
                    </div>
                    <FormControlLabel
                        control={<Checkbox name="remember" color="primary"/>}
                        label="Remember me"
                    />
                    <Button type='submit' color='primary' variant="contained" fullWidth>Sign in</Button>
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