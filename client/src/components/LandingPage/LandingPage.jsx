import React from 'react'
import useBackground from '../../hooks/useBackgroundStyles';
import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';

function LandingPage() {
  const theme = useTheme();
  const Background = useBackground();

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

export default LandingPage
