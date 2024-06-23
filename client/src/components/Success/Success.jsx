import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Typography, TextField, Button, Box, Link, MenuItem } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
import useBackground from '../../hooks/useBackgroundStyles';
import { useNavigate } from 'react-router-dom';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: theme.palette.custom.greyBlack,
  padding: '2em',
}));

const Card = styled(Box)(({ theme }) => ({
  padding: '2em',
  textAlign: 'center',
  color: theme.palette.secondary.main,
  maxWidth: '25em',
  width: '100%',
}));

const Title = styled(Typography)(({ theme }) => ({
  ...theme.typography.h4,
  color: theme.palette.custom.gold,
  marginBottom: '1em',
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  marginBottom: '1em',
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

const menuprops = {
  PaperProps: {
    style: {
      backgroundColor: '#393939',
    },
  },
  MenuListProps: {
    sx: {
      color: 'white',
    },
  },
};

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: '1em 0',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.secondary,
  '&:hover': {
    backgroundColor: theme.palette.custom.darkGray,
    color: theme.palette.secondary.main,
  },
  '&:focus': {
    backgroundColor: theme.palette.custom.gold,
    color: theme.palette.primary.main,
  },
  '&:active': {
    backgroundColor: theme.palette.custom.gold,
    color: theme.palette.primary.main,
  },
}));

const CustomLink = styled(Link)(({ theme }) => ({
  color: theme.palette.custom.gold,
  margin: '1em 0',
  textDecoration: 'none',
}));

function Success() {
  // const theme = useTheme();
  const Background = useBackground();
  const navigate = useNavigate();
  const [names, setNames] = useState([]);
  const [selectedName, setSelectedName] = useState('');
  const [nameExists, setNameExists] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [formError, setFormError] = useState(false);

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

  useEffect(() => {
    const checkUsername = async () => {
      if (selectedName) {
        try {
          const response = await fetch('http://localhost:8000/accounts/check-username/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: selectedName }),
          });
          const result = await response.json();
          setNameExists(result.exists);
        } catch (error) {
          console.error('Fetch error:', error);
        }
      }
    };
    checkUsername();
  }, [selectedName]);

  const handleSubmit = async () => {
    let error = false;

    if (!selectedName || !password || !confirmPassword) {
      setFormError(true);
      error = true;
    } else {
      setFormError(false);
    }

    if (password !== confirmPassword) {
      setPasswordError(true);
      error = true;
    } else {
      setPasswordError(false);
    }

    if (!nameExists && !error) {
      try {
        const response = await fetch('http://localhost:8000/accounts/create-account/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: selectedName, password: password, player_name: selectedName }),
        });

        if (response.ok) {
          const loginResponse = await fetch('http://localhost:8000/api/login/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: selectedName, password }),
            credentials: 'include',
          });

          if (loginResponse.ok) {
            navigate('/');
          } else {
            console.error('Login after account creation failed');
          }
        } else {
          console.error('Account creation failed');
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }
  };

  return (
    <Background>
      <Container>
        <Card>
          <Title>SUCCESS!</Title>
          <Subtitle variant="body1" sx={{ m: 2, pb: 3 }}>
            You're on your way to becoming a renowned sleuth! <br />
            Time to create an account to access your VIP Oscars After Party invite!
          </Subtitle>
          <InputField
            select
            label="FIRST NAME"
            value={selectedName}
            onChange={(e) => setSelectedName(e.target.value)}
            variant="outlined"
            menuprops={menuprops}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name} style={{ textAlign: 'center' }}>
                {name}
              </MenuItem>
            ))}
          </InputField>
          {nameExists && (
            <Subtitle variant="body1" style={{ color: '#C24949' }}>
              Account already exists
            </Subtitle>
          )}
          <InputField
            label="PASSWORD"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            inputProps={{ style: { textAlign: 'center' } }}
          />
          <InputField
            label="CONFIRM PASSWORD"
            type="password"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            inputProps={{ style: { textAlign: 'center' } }}
          />
          {!formError && passwordError && (
            <Subtitle variant="body1" style={{ color: '#C24949' }}>
              Passwords do not match
            </Subtitle>
          )}
          {formError && (
            <Subtitle variant="body1" style={{ color: '#C24949' }}>
              Please fill out all fields
            </Subtitle>
          )}
          <SubmitButton variant="contained" onClick={handleSubmit} disabled={nameExists}>
            {nameExists ? '👀' : 'CREATE ACCOUNT'}
          </SubmitButton>
          <Subtitle variant="body1">
            Already a VIP? <CustomLink href="/Login"><strong>Login</strong></CustomLink>
          </Subtitle>
        </Card>
      </Container>
    </Background>
  );
}

export default Success;
