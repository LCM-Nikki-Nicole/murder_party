import { styled } from '@mui/system';
import { useLocation } from 'react-router-dom';

const DefaultBackground = styled('div')({
  backgroundColor: '#242424', // greyBlack
  minHeight: '100vh'
});

const HomeBackground = styled('div')({
  backgroundColor: '#C24949', // red
  minHeight: '100vh'
});

const useBackground = () => {
  const location = useLocation();

  // TODO: Add Condition where this only works if user is logged in
  return location.pathname === '/' ? HomeBackground : DefaultBackground;
};

export default useBackground;
