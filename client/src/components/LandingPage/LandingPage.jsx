import React from 'react'
import useBackground from '../../hooks/useBackgroundStyles';
import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';

function LandingPage() {
  const theme = useTheme();
  const Background = useBackground();

  return (
    <Background>
      <Typography variant="body1" style={{ color: theme.palette.custom.darkRed }}>
        Landing Page
      </Typography>
    </Background>
  )
}

export default LandingPage
