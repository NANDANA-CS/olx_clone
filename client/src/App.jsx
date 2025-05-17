import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/home/Home'
import Postadd from './pages/postadd/Postadd'
import Login from './pages/login/Login'
import Car from './pages/postadd/subpages/Car'
import Bike from './pages/postadd/subpages/Bike'
import Mobile from './pages/postadd/subpages/Mobile'
import Laptop from './pages/postadd/subpages/Laptop'
import Preview from './pages/preview/Preview'
import Wishlist from './pages/wishlist/Wishlist'
import Edit from './pages/edit/Edit'
import Categories from './pages/categories/Categories'
import Viewprofile from './pages/viewprofile/Viewprofile'
import Myads from './pages/myads/Myads'


const App = () => {
  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/login' Component={Login} />
          <Route path='/postadd' Component={Postadd} />
          <Route path='/addcar' Component={Car} />
          <Route path='/bike' Component={Bike} />
          <Route path='/mobile' Component={Mobile} />
          <Route path='/lap' Component={Laptop} />
          <Route path='/laptop' Component={Laptop} />
          <Route path='/preview/:productId' Component={Preview} />
          <Route path='/wishlist' Component={Wishlist} />
          <Route path='/edit' Component={Edit} />
          <Route path="/category/:categoryName" element={<Categories />} />
          <Route path='/viewprofile' Component={Viewprofile} />

          <Route path='/myads' Component={Myads} />



        </Routes>
      </BrowserRouter>

      {/* <LoginButton/>
      <Profile/>
      <LogoutButton/> */}


    </>
  )
}

export default App
