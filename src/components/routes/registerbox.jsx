import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import Copyright from '../Copyright';
import { AuthContext } from '../context/auth.context';
import { UserContext } from '../context/user.context';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { formFieldValidation } from '../../formFieldValidation';

export default function RegisterBox({ handleClick }) {

  const { setAuth } = React.useContext(AuthContext);
  const { setUser } = React.useContext(UserContext);

  let navigate = useNavigate();

  const goToNewAffirmHandler = () => {
    navigate('/new-log');
  }

  const handleRegister = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(formFieldValidation(data).validation===false){
      alert(formFieldValidation(data).msg);
    }else{
      if (data.get('password') !== data.get('confirmPassword')) {
        alert('The passwords do not match. Please confirm your password.');
      } else {
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
          .then((objRes) => {
            if (objRes['error']) {
              alert(objRes['error']);
            } else {
              setAuth(true);
              setUser({ ...objRes });
              localStorage.setItem("jwt", objRes.token);
              goToNewAffirmHandler();
            }
          });
      }
    }
  };

  return (
    <Fragment>
      <Avatar sx={{ m: 1, bgcolor: '#3CA088' }}>
        <AppRegistrationIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Start Journaling with Lumbini Today
      </Typography>
      <Box component="form" noValidate onSubmit={handleRegister} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required={true}
          fullWidth
          id="firstName"
          label="First Name"
          name="firstName"
          autoComplete="firstName"
          autoFocus
        />
        <TextField
          margin="normal"
          required={true}
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          autoComplete="lastName"
          autoFocus
        />
        <TextField
          margin="normal"
          required={true}
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required={true}
          fullWidth
          name="password"
          label="Create Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <TextField
          margin="normal"
          required={true}
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3, mb: 2, bgcolor: '#3CA088', '&:hover': {
              backgroundColor: '#205246'
            }
          }}
        >
          Welcome to Lumbini
        </Button>
        <Grid container>
          <Grid item xs>
            
          </Grid>
          <Grid item>
            <Link onClick={handleClick} href="#" variant="body2" sx={{color:"#3CA088", '&:hover': {
              color: '#205246'
            }}}>
              {"Have an account? Sign in"}
            </Link>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </Fragment>
  )
}
