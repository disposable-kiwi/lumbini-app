import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
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

export default function SignInBox({ handleClick }) {

  let navigate = useNavigate();

  const { setAuth } = useContext(AuthContext);
  const { setUser } = useContext(UserContext);

  const goToNewAffirmHandler = () => {
    navigate('/new-log');
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
    }).then((res) => res.json())
      .then((objRes) => {
        if (objRes['alert']) {
          alert(objRes['alert']);
        } else {
          setAuth(true);
          setUser({ ...objRes });
          localStorage.setItem("jwt", objRes.token);
          goToNewAffirmHandler();
        }
      });
  };

  return (
    <Fragment>
      <Avatar sx={{ m: 1, bgcolor: '#3CA088' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Read Your Lumbini Journal
      </Typography>
      <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1 }}>
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
          label="Password"
          type="password"
          id="password"
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
          Sign In to the Lumbini Community
        </Button>
        <Grid container>
          <Grid item xs>
            
          </Grid>
          <Grid item>
            <Link onClick={handleClick} href="#" variant="body2" sx={{color:"#3CA088", '&:hover': {
              color: '#205246'
            }}}>
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </Fragment>
  )
}
