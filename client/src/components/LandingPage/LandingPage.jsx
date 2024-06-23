import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Typography, TextField, Button, Box, Link } from '@mui/material';
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

const CodeContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: '1em',
  marginBottom: '1.5em',
  marginTop: '1.5em',
}));

const CodeInput = styled(TextField)(({ theme, error }) => ({
  width: '3.3em',
  height: '4.5em',
  '& .MuiOutlinedInput-root': {
    padding: 0,
    '& fieldset': {
      borderColor: error ? theme.palette.custom.red : theme.palette.custom.gold, // Outline color on error
    },
    '&:hover fieldset': {
      borderColor: error ? theme.palette.custom.red : 'white', // Outline color on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: error ? theme.palette.custom.red : 'white', // Outline color when focused
    },
    '& input': {
      textAlign: 'center',
      fontSize: '1.5em',
      color: error ? theme.palette.custom.red : 'white',
      padding: '0.5em',
    },
  },
  backgroundColor: theme.palette.custom.darkGray,
  borderRadius: theme.shape.borderRadius,
  '& .MuiInputBase-root': {
    height: '100%',
    borderRadius: theme.shape.borderRadius,
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: '1em 0',
  backgroundColor: theme.palette.custom.gold,
  color: theme.palette.primary.main,
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

const ErrorLink = styled(Link)(({ theme }) => ({
  color: '#C24949',
  textDecoration: 'underline',
  cursor: 'pointer',
}));

function LandingPage() {
  const [code, setCode] = useState(['', '', '', '', '']);
  const [error, setError] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const newCode = [...code];
    newCode[index] = e.target.value;
    setCode(newCode);
    if (error) setError(false);
  };

  const handleSubmit = async () => {
    console.log("Submitted code:", code.join(''));
    const response = await fetch('http://localhost:8000/api/validate-code/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: code.join('') }),
    });
    const result = await response.json();
    console.log("Backend response:", result);
    if (result.valid) {
      navigate('/success');
    } else {
      setError(true);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleLoginClick = () => {
    navigate('/Login');
  };

  return (
    <Container>
      <Card>
        <Title>ARE YOU READY?</Title>
        <Subtitle variant="body1">
          Please enter the 5-Digit code found on the invite below.
        </Subtitle>
        <CustomLink variant="body1" href="/puzzle001.png" target="_blank"><strong>Review Puzzle</strong></CustomLink>
        <CodeContainer>
          {Array(5).fill().map((_, index) => (
            <CodeInput
              key={index}
              variant="outlined"
              inputProps={{ maxLength: 1, inputMode: 'numeric', pattern: '[0-9]*' }}
              value={code[index]}
              onChange={(e) => handleChange(e, index)}
              error={error}
            />
          ))}
        </CodeContainer>
        {error && (
          <Subtitle variant="body1" style={{ color: '#C24949' }}>
            CODE INCORRECT <ErrorLink onClick={handleRefresh}>TRY AGAIN</ErrorLink>
          </Subtitle>
        )}
        {showHint && (
          <Subtitle variant="body1" style={{ color: '#FFFFFF' }}>
            ARE YOU READY? THE KEY IS IN THE LETTERS THAT SPELL OUT A CERTAIN 5 LETTER WORD. MATCH THEM WITH THEIR NUMBERS TO UNLOCK THE CODE.
          </Subtitle>
        )}
        <Subtitle variant="body1">
          Haven't solved the invite yet? <CustomLink href="#" onClick={() => setShowHint(true)}><strong>Hint</strong></CustomLink>
        </Subtitle>
        <SubmitButton variant="contained" onClick={handleSubmit}>
          SUBMIT
        </SubmitButton>
        <Subtitle variant="body1" style={{ margin: '1em' }}>
          Already a VIP? <CustomLink href="#" onClick={handleLoginClick}><strong>Login</strong></CustomLink>
        </Subtitle>
      </Card>
    </Container>
  );
}

export default LandingPage;
