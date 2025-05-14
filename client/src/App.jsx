import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import Postadd from './pages/postadd/Postadd'
import Login from './pages/login/Login'
import Car from './pages/postadd/subpages/Car'
import Bike from './pages/postadd/subpages/Bike'
import Electronics from './pages/postadd/subpages/Electronics'

const App = () => {
  return (
    <>
      <BrowserRouter>
       
        <Routes>
            <Route path='/' Component={Home}/>
            <Route path='/login' Component={Login}/>
            <Route path='/postadd' Component={Postadd}/>
            <Route path='/addcar' Component={Car}/>
            <Route path='/bike' Component={Bike}/>
            <Route path='/add'Component={Electronics}/>
            
        </Routes>
      </BrowserRouter>

      {/* <LoginButton/>
      <Profile/>
      <LogoutButton/> */}


    </>
  )
}

export default App
