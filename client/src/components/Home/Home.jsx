import React from 'react';
import { Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useBackground from '../../hooks/useBackgroundStyles';

function Home() {
  const theme = useTheme();
  const Background = useBackground();

  return (
    <Background>
      <Typography variant="body1" style={{ color: theme.palette.custom.gold }}>
        Home
      </Typography>
      <Typography variant="h1" style={{ color: theme.palette.custom.darkRed }}>
        Header in Dark Red
      </Typography>
      <Typography variant="body1" style={{ color: theme.palette.custom.darkGray }}>
        Paragraph in Dark Gray
      </Typography>
      <Button variant="contained">
      SUBMIT
      </Button>
    </Background>
  );
};

export default Home;
