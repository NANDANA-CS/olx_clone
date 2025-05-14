import React from 'react'
import { useNavigate } from 'react-router-dom'

const Nav = () => {
  const navigate = useNavigate()
  const goToHome = () => {
    navigate('/')
  }
  return (
    <>
      <nav className='bg-gray-100 w-full h-12 md:h-16 lg:h-20 flex items-center'>
        <div 
          onClick={goToHome} 
          className='text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-700 cursor-pointer hover:text-black transition ml-2 sm:ml-4 md:ml-6 lg:ml-8'
          aria-label="Back to home"
        >
          ←
        </div>
      </nav>
    </>
  )
}

export default Nav