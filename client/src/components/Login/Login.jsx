import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Typography, TextField, Button, Box, MenuItem } from '@mui/material';
import useBackground from '../../hooks/useBackgroundStyles';
import { useNavigate } from 'react-router-dom';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  padding: '2em',
}));

const Card = styled(Box)(({ theme }) => ({
  padding: '2em',
  textAlign: 'center',
  color: theme.palette.secondary.main,
  maxWidth: '25em',
  width: '100%',
  backgroundColor: theme.palette.custom.greyBlack,
  borderRadius: '10px',
}));

const Title = styled(Typography)(({ theme }) => ({
  ...theme.typography.h4,
  color: theme.palette.custom.gold,
  marginBottom: '1em',
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  marginBottom: '1em',
  color: theme.palette.secondary.main,
}));

const InputField = styled(TextField)(({ theme }) => ({
  marginBottom: '1em',
  backgroundColor: theme.palette.custom.darkGray,
  width: '100%',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.custom.gold,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.custom.gold,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.custom.gold,
    },
    '& input': {
      color: theme.palette.secondary.main,
      textAlign: 'center',
    },
    '& .MuiSelect-select': {
      color: theme.palette.secondary.main,
      textAlign: 'center',
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.secondary.main,
  },
}));

const LoginButton = styled(Button)(({ theme }) => ({
  margin: '1em 0',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.custom.gold,
  '&:hover': {
    backgroundColor: theme.palette.custom.darkGray,
    color: theme.palette.secondary.main,
  },
}));

function Login() {
  const Background = useBackground();
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState('');
  const [password, setPassword] = useState('');
  const [names, setNames] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchNames = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/get-names/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setNames(data.names);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    fetchNames();
  }, []);

  const handleLogin = async () => {
    console.log('Login attempted with:', { firstname, password });
    try {
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstname, password }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          navigate('/');
        } else {
          setError(true);
        }
      } else {
        setError(true);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(true);
    }
  };

  return (
    <Background>
      <Container>
        <Card>
          <Title>WELCOME BACK, VIP SLEUTH</Title>
          <Subtitle>Access your invite info and character files here.</Subtitle>
          <InputField
            select
            label="FIRSTNAME"
            variant="outlined"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name} style={{ textAlign: 'center' }}>
                {name}
              </MenuItem>
            ))}
          </InputField>
          <InputField
            label="PASSWORD"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Subtitle variant="body1" style={{ color: '#C24949' }}>
              Incorrect first name or password. Please try again.
            </Subtitle>
          )}
          <LoginButton variant="contained" onClick={handleLogin}>
            LOGIN
          </LoginButton>
        </Card>
      </Container>
    </Background>
  );
}

export default Login;
