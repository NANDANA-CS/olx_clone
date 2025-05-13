import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import Postadd from './pages/postadd/Postadd'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'

const App = () => {
  return (
    <>
      <BrowserRouter>
       
        <Routes>
            <Route path='/' Component={Home}/>
            <Route path='/login' Component={Login}/>
            <Route path='/postadd' Component={Postadd}/>
        </Routes>
      </BrowserRouter>

      {/* <LoginButton/>
      <Profile/>
      <LogoutButton/> */}


    </>
  )
}

export default App
