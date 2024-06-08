import './App.css';
import { Home, LandingPage, Login, SecretCodeEntry, Success } from './components';
import { Route, Routes } from 'react-router-dom';

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
      <p>
        Hello world (this is mui)
      </p>
    </div>
  );
}

export default App;
