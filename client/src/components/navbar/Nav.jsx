import React from 'react'
import { useNavigate } from 'react-router-dom'

const Nav = () => {
  const navigate = useNavigate()
  const goToHome = () => {
    navigate('/') 
  }
  return (
    <>
      <nav className='bg-grey-400 w-60 h-20'>
        <div onClick={goToHome} className='text-6xl font-bold text-gray-700 cursor-pointer hover:text-black transition ml-7'>←</div>
      </nav>
    </>
  )
}

export default Nav
