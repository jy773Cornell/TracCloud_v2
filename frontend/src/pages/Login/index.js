import React from 'react'
import {Grid, Avatar, TextField, Button, Typography, Link, Card} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import './index.scss'

function Login() {
    return (
        <Grid container className="center">
            <Card elevation={10} className="card">
                <Grid align='center'>
                    <Avatar><LockOutlinedIcon/></Avatar>
                    <Typography variant="h5" component="h5">Sign In</Typography>
                </Grid>
                <TextField label='Username' placeholder='Enter username'  fullWidth required/>
                <TextField label='Password' placeholder='Enter password' type='password'  fullWidth
                           required/>
                <FormControlLabel
                    control={<Checkbox name="remember" color="primary"/>}
                    label="Remember me"
                />
                <Button type='submit' color='primary' variant="contained" fullWidth>Sign in</Button>
                <Typography>
                    <Link href="#">Forgot password ?</Link>
                </Typography>
                <Typography> Do you have an account ?
                    <Link href="#">Sign Up</Link>
                </Typography>
            </Card>
        </Grid>
    )
}

export default Login