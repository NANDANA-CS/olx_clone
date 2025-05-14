import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navpost = () => {
  const navigate = useNavigate()
  const goToHome = () => {
    confirm("Are you sure you want to leave? Your progress will not be saved")
    navigate('/postadd') 
  }
  return (
    <>
      <nav className='bg-gray-100 w-497 h-20'>
        <div onClick={goToHome} className='text-6xl font-bold text-gray-700 cursor-pointer hover:text-black transition ml-7'>←</div>
      </nav>
    </>
  )
}

export default Navpost
