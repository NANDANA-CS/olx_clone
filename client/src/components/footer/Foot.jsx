import React from 'react'

const Foot = () => {
  return (
    <>
      <div className=' bg-[rgb(0,72,150)] '>
        <div className=' mx-40 '>
          <div className=' h-40 flex justify-between pt-5 pb-1 '>
            <div><img src="/images/cartrade_tech.svg" alt="" className=' size-full ' /></div>
            <div className=' flex '><hr className=' size-full border border-white ' /></div>
            <div className=' '><img src="/images/olx_2025.svg" alt="" className=' size-full ' /></div>
            <div className=' '><a href="https://www.carwale.com/" target='1'><img src="/images/carwale.svg" alt="" className=' size-full ' /></a></div>
            <div className=' '><a href="https://www.bikewale.com/" target='1'><img src="/images/bikewale.svg" alt="" className=' size-full ' /></a></div>
            <div className=' '><a href="https://www.cartrade.com/" target='1'><img src="/images/cartrade_tech.svg" alt="" className=' size-full ' /></a></div>
            <div className=' '><a href="https://www.mobilityoutlook.com/" target='1'><img src="/images/mobility.svg" alt="" className=' size-full ' /></a></div>
          </div>
          <div className=' flex justify-between text-white pb-5'>
            <div><p>Help - Sitemap</p></div>
            <div><p>All rights reserved © 2006-2025 OLX</p></div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Foot
