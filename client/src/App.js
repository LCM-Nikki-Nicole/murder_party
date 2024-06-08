import './App.css';
import { Home, LandingPage, Login, SecretCodeEntry, Success } from './components';
import { Route, Routes } from 'react-router-dom';
import { Typography } from '@mui/material';

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path='' element={<Home/>}></Route>
      <Route path='/LandingPage' element={<LandingPage/>}></Route>
      <Route path='/Login' element={<Login/>}></Route>
      <Route path='/SecretCodeEntry' element={<SecretCodeEntry/>}></Route>
      <Route path='/Success' element={<Success/>}></Route>
    </Routes>
    <Typography variant="h2">
        Hello world (this is mui)
      </Typography>
    </div>
  );
}

export default App;
