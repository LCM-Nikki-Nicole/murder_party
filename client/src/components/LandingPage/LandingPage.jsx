import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography, TextField, Button, Box, Link } from '@mui/material';

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

const CodeInput = styled(TextField)(({ theme }) => ({
  width: '3.3em',
  height: '4.5em',
  '& .MuiOutlinedInput-root': {
    padding: 0,
    '&:hover fieldset': {
      borderColor: 'white', // Outline color on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white', // Outline color when focused
    },
    '& input': {
      textAlign: 'center',
      fontSize: '1.5em',
      color: 'white',
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
  },
}));

const CustomLink = styled(Link)(({ theme }) => ({
  color: theme.palette.custom.gold,
  margin: '1em 0',
  textDecoration: 'none',
}));

function LandingPage() {
  return (
    <Container>
      <Card>
        <Title>ARE YOU READY?</Title>
        <Subtitle variant="body1">
          Please enter the 5-Digit code found on the invite below.
        </Subtitle>
        <CustomLink variant="body1" href="#">Review Puzzle</CustomLink>
        <CodeContainer>
          {Array(5).fill().map((_, index) => (
            <CodeInput
              key={index}
              variant="outlined"
              inputProps={{ maxLength: 1, inputMode: 'numeric', pattern: '[0-9]*' }}
            />
          ))}
        </CodeContainer>
        <Subtitle variant="body1">
          Haven't solved the invite yet? <CustomLink href="#">Hint</CustomLink>
        </Subtitle>
        <SubmitButton variant="contained">
          SUBMIT
        </SubmitButton>
        <Subtitle variant="body1" style={{ margin: '1em' }}>
          Already a VIP? <CustomLink href="#">Login</CustomLink>
        </Subtitle>
      </Card>
    </Container>
  );
}

export default LandingPage;
