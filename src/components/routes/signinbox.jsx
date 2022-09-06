import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import Copyright from '../Copyright';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { UserContext } from '../context/user.context';

export default function SignInBox({handleClick}){

    let navigate = useNavigate();

    const {isAuth, setAuth} = useContext(AuthContext);
    const {userEmail, setUserEmail} = useContext(UserContext);

    const goToNewAffirmHandler = ()=>{
      navigate('/newaffirm');
    }

    const handleLogin = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const logInUser = {
          email: data.get('email'),
          password: data.get('password'),
        };
    
        fetch("http://localhost:2218/login", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(logInUser)
        }).then(res => res.json())
          .then((status) => {
            if (status === "You're logged in!") {
              console.log(isAuth);
              setAuth(true);
              console.log(isAuth);
              debugger;
              console.log(userEmail);
              setUserEmail(data.get('email'));
              console.log(userEmail);
              goToNewAffirmHandler();
            } else if (status === "Username and Password do not match.") {
              alert("This is not a valid login.");
            }
          });
    
          data.reset();
      };

    return(
        <Fragment>
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Enter Lumbini with an Existing Account
              </Typography>
              <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In to the Lumbini Community
                </Button>
                <Grid container>
                  <Grid item xs>
                    {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                  </Grid>
                  <Grid item>
                    <Link onClick={handleClick} href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Fragment>
    )
}
