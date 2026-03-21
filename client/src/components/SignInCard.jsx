import * as React from 'react';
import {
  Box,
  Button,
  Card as MuiCard,
  Typography,
  TextField,
  Divider,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { supabase } from './../libs/supabase';
import { GoogleIcon, GithubIcon } from './CustomIcons';
import Logo from './../assets/favicon.png';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  margin: 'auto',
  width: '100%',
  maxWidth: 420,
  padding: theme.spacing(4),
  gap: theme.spacing(3),
  borderRadius: theme.spacing(2),
}));

export default function SignInCard() {
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [claims, setClaims] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [message, setMessage] = React.useState('');

  // Handle session + magic link
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token_hash = params.get('token_hash');
    const type = params.get('type');

    if (token_hash) {
      supabase.auth
        .verifyOtp({ token_hash, type: type || 'email' })
        .then(({ error }) => {
          if (error) setError(error.message);
          else {
            setMessage('✅ Login successful!');
            window.history.replaceState({}, document.title, '/');
          }
        });
    }

    // Get session
    supabase.auth.getClaims().then(({ data: { claims } }) => {
      setClaims(claims);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      supabase.auth.getClaims().then(({ data: { claims } }) => {
        setClaims(claims);
      });
    });

    return () => subscription.unsubscribe();
  }, []);

  // Email login
  const handleEmailLogin = async () => {
    setLoading(true);
    setError(null);
    setMessage('');

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) setError(error.message);
    else setMessage('📩 Check your email for the login link');

    setLoading(false);
  };

  // OAuth
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  };

  const signInWithGithub = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'github' });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setClaims(null);
  };

  // Logged in state
  if (claims) {
    return (
      <Card>
        <Typography variant="h5">Welcome 🎉</Typography>
        <Typography>{claims.email}</Typography>
        <Button variant="contained" onClick={handleLogout}>
          Sign Out
        </Button>
      </Card>
    );
  }

  return (
    <Card>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <img src={Logo} width={40} />
        <Typography variant="h5" fontWeight="bold">
          Movie
        </Typography>
      </Box>

      <Box>
        <Typography variant="h6" fontWeight="bold">
          Sign in
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Use your email or a provider
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />

        <Button
          variant="contained"
          onClick={handleEmailLogin}
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} /> : 'Continue with Email'}
        </Button>
      </Box>

      {message && (
        <Typography color="success.main">{message}</Typography>
      )}
      {error && (
        <Typography color="error">{error}</Typography>
      )}

      <Divider>or</Divider>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<GoogleIcon />}
          onClick={signInWithGoogle}
        >
          Continue with Google
        </Button>

        <Button
          variant="outlined"
          startIcon={<GithubIcon />}
          onClick={signInWithGithub}
          sx={{ borderColor: 'black', color: 'black' }}
        >
          Continue with Github
        </Button>
      </Box>
    </Card>
  );
}