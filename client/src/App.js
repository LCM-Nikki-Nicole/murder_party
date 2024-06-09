import './App.css';
import { Home, LandingPage, Login, Success } from './components';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    // dont add anything outside of the routes as it will not display properly due to path vh being 100%
    // (login logic of course can be added later lol)

    <div className="App">
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/LandingPage' element={<LandingPage/>}></Route>
      <Route path='/Login' element={<Login/>}></Route>
      <Route path='/Success' element={<Success/>}></Route>
    </Routes>
    </div>
  );
}

export default App;
