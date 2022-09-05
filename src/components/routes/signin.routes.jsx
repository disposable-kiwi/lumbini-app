import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import RegisterBox from './registerbox';
import SignInBox from './signinbox';

const theme = createTheme();

export default function SignInSide() {

  const [showRegister, setShowRegister] = useState(false);

  const handleClick = () => {
    setShowRegister(!showRegister);
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://i.imgur.com/wttShT7.png)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#A5F1E9',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} sx={{
          backgroundColor: '#E1FFEE'
        }} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {showRegister ? <RegisterBox handleClick={handleClick}/> :
              <SignInBox handleClick={handleClick}/>}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}