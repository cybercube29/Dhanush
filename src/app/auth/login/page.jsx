"use client";

import PageContainer from '@/app/components/shared/PageContainer';
import CustomFormLabel from '@/app/components/forms/CustomFormLabel';
import CustomTextField from '@/app/components/forms/CustomTextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    toast.dismiss();
    if (!email || !password) {
      toast.error('Email and Password cannot be blank');
      return;
    }
    setLoading(true);
    try {
      console.log({ email, password })
    } catch (err) {
      toast.error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer title="Login Page" description="this is Sample page">
      <Grid container spacing={0} sx={{ justifyContent: "center", height: '100vh' }}>
        <Grid sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }} item lg={7}>
          <Box sx={{ position: "relative" }}>
            <Box sx={{ px: 3 }}>
              <Logo />
            </Box>
            <Box sx={{ alignItems: "center", justifyContent: "center", height: 'calc(100vh - 75px)', display: { xs: 'none', lg: 'flex' } }}>
              <Image src={"/images/backgrounds/login-bg.svg"} alt="bg" width={500} height={500} style={{ width: '100%', maxWidth: '500px', maxHeight: '500px' }} />
            </Box>
          </Box>
        </Grid>
        <Grid item lg={5} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Box p={2} width={'90%'}>
            <Typography variant="h3" sx={{ fontWeight: "700", mb: 1 }}>Welcome to Modernize</Typography>
            <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 1 }}>Your Admin Dashboard</Typography>
            <Stack>
              <Box>
                <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
                <CustomTextField id="email" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
              </Box>
              <Box>
                <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
                <CustomTextField id="password" type="password" variant="outlined" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
              </Box>
            </Stack>
            <Box mt={2}>
              <Button color="primary" variant="contained" size="large" fullWidth onClick={handleLogin} disabled={loading}>
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
}