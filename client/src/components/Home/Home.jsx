import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Box, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import useBackground from '../../hooks/useBackgroundStyles';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2em',
  flexDirection: 'column',
}));

const Card = styled(Paper)(({ theme }) => ({
  textAlign: 'center',
  color: theme.palette.secondary.main,
  maxWidth: '25em',
  width: '100%',
  backgroundColor: theme.palette.custom.red,
  boxShadow: 'none'
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  marginBottom: '1em',
  width: '28%',
  [theme.breakpoints.down('sm')]: {
    width: '100vw',
  },
}));

const Image = styled('img')({
  width: '100%',
  height: 'auto',
});

const EventDetails = styled(Box)(({ theme }) => ({
  textAlign: 'left',
  marginBottom: '1em',
  backgroundColor: theme.palette.custom.red,
  padding: '1em',
}));

const EventTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Palanquin Dark',
  width: '17em',
  position: 'absolute',
  bottom: '-1.1em',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: theme.palette.custom.darkRed,
  padding: '.75em',
  borderRadius: '.5em',
  color: theme.palette.secondary.main,
  textAlign: 'center'
}));

const CharacterSection = styled(Box)(({ theme }) => ({
  marginTop: '1em',
  textAlign: 'center',
  backgroundColor: theme.palette.custom.darkRed,
  padding: '1em',
  borderRadius: '.75em',
}));

const CharacterName = styled(Typography)(({ theme }) => ({
  ...theme.typography.h5,
  color: theme.palette.custom.gold,
}));

const CharacterProfession = styled(Typography)(({ theme }) => ({
  color: theme.palette.custom.gold,
  marginBottom: '1em',
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  marginTop: '1em',
}));

const CharacterFiles = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  wordWrap: 'break',
}));

const ActionButton = styled(Box)(({ theme }) => ({
  height: '5em',
  width: '5em',
  borderRadius: '.5em',
  color: theme.palette.custom.gold,
  backgroundColor: theme.palette.secondary.main,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  '&:hover': {
    backgroundColor: theme.palette.custom.darkGray,
  },
  '&:focus': {
    backgroundColor: theme.palette.custom.darkGray,
  },
  '&:active': {
    backgroundColor: theme.palette.custom.darkGray,
  },
}));

const ActionLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Palanquin Dark',
  color: theme.palette.secondary.main,
  marginTop: '0.5em',
}));

const Details = styled(Typography)(({ theme }) => ({
  fontFamily: 'Palanquin Dark',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5em', // Add some spacing between the icon and text (where has this been all my life)
}));

const StyledLink = styled('a')(({ theme }) => ({
  color: 'inherit',
  textDecoration: 'underline',
}));

function Home() {
  const theme = useTheme();
  const Background = useBackground();
  const [userData, setUserData] = useState({
    first_name: '',
    character_first_name: '',
    character_last_name: '',
    profession: '',
    image: '',
    pdf: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/user-data/', {
          method: 'GET',
          credentials: 'include',  // Include credentials for session management
        });

        console.log('Full response:', response);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Fetched user data:', data);  // Debugging
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);


  return (
    <Background>
      <Container>
        <ImageContainer>
          <Image src={`http://localhost:8000/static/images/${userData.character_first_name}-icon.png`} alt="Player Icon" />
          <EventTitle>Lights! Camera! Murder!</EventTitle>
          <Typography variant="h6" style={{ position: 'absolute', top: '10px', right: '10px', color: 'white' }}>
            {userData.first_name || 'PLAYER NAME'}
          </Typography>
        </ImageContainer>
        <Card>
          <EventDetails>
            <Details variant="body2">
              <LocationOnIcon />
              <StyledLink href='https://maps.app.goo.gl/xDgdk7da9fGHccpGA' target="_blank" rel="noopener noreferrer">
                470 シェアスペLuxury新宿
              </StyledLink>
            </Details>
            <Details variant="body2">
              <EventIcon /> Sat, July 6th <AccessTimeIcon /> 17:45
            </Details>
            <Typography variant="body2" style={{ marginTop: '0.5em' }}>
              NOTE: Event is BYOB. Please arrive in character and be no later than 18:00. Awards for best dressed, best actor and more will be given &lt;3
            </Typography>
          </EventDetails>
          <CharacterSection>
            <CharacterName style={{ color: theme.palette.secondary.main }}>{userData.character_first_name} {userData.character_last_name}</CharacterName>
            <CharacterProfession style={{ fontFamily: 'Palanquin Dark' }}>{userData.profession}</CharacterProfession>
            <ButtonContainer>
              <CharacterFiles>
                <a href="http://localhost:8000/static/pdfs/Story.pdf" target="_blank" rel="noopener noreferrer">
                  <ActionButton variant="contained">
                    <AutoStoriesIcon style={{ fontSize: '3em' }} />
                  </ActionButton>
                </a>
                <ActionLabel>Story</ActionLabel>
              </CharacterFiles>
              <CharacterFiles>
                <a href={`http://localhost:8000/static/pdfs/${userData.character_first_name}.pdf`} target="_blank" rel="noopener noreferrer">
                  <ActionButton variant="contained">
                    <PsychologyAltIcon style={{ fontSize: '2.5em', textAlign: 'center' }} />
                  </ActionButton>
                </a>
                <ActionLabel>Character <br /> Info</ActionLabel>
              </CharacterFiles>
              <CharacterFiles>
                <a href="https://www.flickr.com/photos/153604799@N04/albums/72157696597704875/with/52309763262" target="_blank" rel="noopener noreferrer">
                  <ActionButton variant="contained">
                    <CheckroomIcon style={{ fontSize: '2.5em', textAlign: 'center', color: theme.palette.custom.gold }} />
                  </ActionButton>
                </a>
                <ActionLabel>Costume <br /> Ideas</ActionLabel>
              </CharacterFiles>
            </ButtonContainer>
          </CharacterSection>
        </Card>
      </Container>
    </Background>
  );
}

export default Home;
