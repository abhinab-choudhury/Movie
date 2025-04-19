import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { GoogleIcon, GithubIcon } from './CustomIcons';
import Logo from './../assets/favicon.png';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px'
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px'
  })
}));

export default function SignInCard() {
  return (
    <Card variant="outlined">
      <Box sx={{ display: { xs: 'flex', gap: '10px' } }}>
        <img src={Logo} alt="Movie Logo" />
        <Typography component="h1" variant="h5" sx={{ width: '100%', fontWeight: 'bolder' }}>
          Movie
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            sm: 'row',
            xs: 'column'
          },
          gap: 2
        }}
      >
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert('Sign in with Google')}
          startIcon={<GoogleIcon />}
        >
          Google
        </Button>
        <Button
          sx={{ borderColor: 'black', color: 'black' }}
          fullWidth
          variant="outlined"
          onClick={() => alert('Sign in with Github')}
          startIcon={<GithubIcon />}
        >
          Github
        </Button>
      </Box>
    </Card>
  );
}
