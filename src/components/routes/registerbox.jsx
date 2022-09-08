import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import Copyright from '../Copyright';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

export default function RegisterBox({ handleClick }) {

  let navigate = useNavigate();

  const goToNewAffirmHandler = ()=>{
    navigate('/newaffirm');
  }

  const handleRegister = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newUser = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
    };

    fetch("http://localhost:2218/register", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(newUser)
    }).then(res => res.json())
      .then((status) => {
        if (status) {
          console.log(status);
          console.log(status.token);
        } else if (status === "Oops, something went wrong on our end!") {

        }
      });
  };

  return (
    <Fragment>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <AppRegistrationIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Join Lumbini Today
      </Typography>
      <Box component="form" noValidate onSubmit={handleRegister} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="firstName"
          label="First Name"
          name="firstName"
          autoComplete="firstName"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          autoComplete="lastName"
          autoFocus
        />
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
          label="Create Password"
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
          Welcome to Lumbini
        </Button>
        <Grid container>
          <Grid item xs>
            {/* <Link href="#" variant="body2">
                                    Forgot password?
                                </Link> */}
          </Grid>
          <Grid item>
            <Link onClick={handleClick} href="#" variant="body2">
              {"Have an account? Sign in"}
            </Link>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </Fragment>
  )
}
