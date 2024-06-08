
import './App.css';
import { Typography } from '@mui/material';
import { AccountCreation, HintScreen, LoggedInScreen, Login, SecretCodeEntry } from './components';


function App() {
  return (
    <div className="App">
      <Typography variant="h2">
        Hello world (this is mui)
      </Typography>

      <AccountCreation/>
      <HintScreen/>
      <LoggedInScreen/>
      <Login/>
      <SecretCodeEntry/>
    </div>
  );
}

export default App;
