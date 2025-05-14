import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'

import Home from './pages/home/Home'
import Postadd from './pages/postadd/Postadd'
import Login from './pages/login/Login'
import Car from './pages/postadd/subpages/Car'
import Bike from './pages/postadd/subpages/Bike'
import Mobile from './pages/postadd/subpages/Mobile'
import Laptop from './pages/postadd/subpages/Laptop'
import Preview from './pages/preview/Preview'

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
            <Route path='/mobile'Component={Mobile}/>
            <Route path='/laptop' Component={Laptop}/>
            <Route path='/preview/:productId' Component={Preview}/>
        </Routes>
      </BrowserRouter>

      {/* <LoginButton/>
      <Profile/>
      <LogoutButton/> */}


    </>
  )
}

export default App
