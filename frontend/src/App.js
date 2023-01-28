import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import Error from './components/Error';
import { Routes, Route} from 'react-router-dom';
import {initialState, reducer} from './reducer/UseReducer';
import 'bootstrap/dist/css/bootstrap.css';
import { createContext, useReducer } from 'react';


// 1: context api
export const UserContext = createContext();

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
    <UserContext.Provider value={{state, dispatch}}>
      <Navbar />
      <Routes>
        <Route path='/' index element = {<Home />} />
        <Route path='/about' element = {<About />} />
        <Route path='/contact' element = {<Contact />} />
        <Route path='/login' element = {<Login />} />
        <Route path='/register' element = {<Register />} />
        <Route path='/logout' element = {<Logout />} />
        <Route path='*' element = {<Error />} />
      </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
