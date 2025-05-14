import React from 'react'
import Foot from '../../../components/footer/Foot'
import Navpost from '../../../components/navbar/Navpost'

const Car = () => {
  return (
    <>
      <Navpost/>
      <div  >
        <div className="flex-grow">
        <h1 className="text-3xl font-bold text-center my-4">POST YOUR AD</h1>
      </div>
      </div>
      <Foot/>
    </>
  )
}

export default Car
