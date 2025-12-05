'use client';
import React from 'react';
import {
  Box,
  Avatar,
  Typography,
  Card,
  CardContent,
  Divider,
  Stack,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import CloudConnection from '../cloud-connect';
import ServiceDataOverview from './ServiceDataOverview';
import ServiceErrorOverview from './ServiceErrorOverview';

// Three.js & Fiber
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import ContinentGlobe from './ContinentGlobe';

const WelcomeCard = () => {
  const { data: userDetails } = useSelector((state) => state.UserDetails);

  return (
    <>
      {/* Globe Background */}
      {/* <Box
        sx={{
          position: 'absolute',
          mt: 8,
          ml: 15,
          inset: 0,
          zIndex: 0,
          opacity: 0.3,
        }}
      >
        <Canvas camera={{ position: [0, 0, 7] }}>
          <Stars radius={100} depth={50} count={5000} factor={4} fade />
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <ContinentGlobe />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </Box> */}

      {/* Foreground Card */}
      <Card>
        <CardContent sx={{ py: 4, px: 2, position: 'relative', zIndex: 1 }}>
          <Grid container sx={{ justifyContent: 'space-between' }}>
            {/* Left Side */}
            <Grid sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
              <Box>
                <Box
                  sx={{
                    gap: '16px',
                    mb: 5,
                    display: { xs: 'block', sm: 'flex' },
                    alignItems: 'center',
                  }}
                >
                  <Avatar
                    src="/images/profile/user-1.jpg"
                    alt="img"
                    sx={{ width: 40, height: 40 }}
                  />
                  <Typography variant="h5" sx={{ whiteSpace: 'nowrap' }}>
                    Welcome {userDetails?.firstName || 'User'}{' '}
                    {userDetails?.lastName || ''}
                  </Typography>
                </Box>

                <Stack
                  spacing={2}
                  direction="row"
                  divider={<Divider orientation="vertical" flexItem />}
                  sx={{ mt: 8 }}
                >
                  <Box>
                    <Typography variant="h2" sx={{ whiteSpace: 'nowrap' }}>
                      Dhanush Guard
                    </Typography>
                    <Typography variant="subtitle1" sx={{ whiteSpace: 'nowrap' }}>
                      Your one stop for all cloud security tools
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        whiteSpace: 'normal',
                        fontWeight: 500,
                        lineHeight: 1.6,
                        color: 'text.secondary',
                      }}
                    >
                      Supercharged{' '}
                      <Typography
                        component="span"
                        sx={{ fontWeight: 700, color: 'primary.main' }}
                      >
                        Cloud Security
                      </Typography>{' '}
                      & Compliance Platform with{' '}
                      <Typography
                        component="span"
                        sx={{ fontWeight: 700, color: 'secondary.main' }}
                      >
                        30+ Frameworks
                      </Typography>
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Grid>

            {/* Right Side */}
            <Grid sm={6}>
              <Box>
                <Image
                  src="/images/backgrounds/welcome-bg3.png"
                  alt="img"
                  width={300}
                  height={200}
                  style={{
                    width: '280px',
                    height: '246px',
                    position: 'absolute',
                    right: '-6px',
                    marginTop: '10px',
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Other Cards */}
      <Card sx={{ mt: 2 }}>
        <CloudConnection />
      </Card>
      <Card sx={{ mt: 2 }}>
        <ServiceDataOverview />
      </Card>
      <Card sx={{ mt: 2 }}>
        <ServiceErrorOverview />
      </Card>
    </>
  );
};

export default WelcomeCard;
