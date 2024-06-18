import React from 'react'
import useBackground from '../../hooks/useBackgroundStyles';
import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';

function Success() {
  const theme = useTheme();
  const Background = useBackground();

  return (
    <Background>
      <Typography variant="body1" style={{ color: theme.palette.custom.darkRed }}>
        Success
      </Typography>
    </Background>
  )
}

export default Success
