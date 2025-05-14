import React from 'react'

const Foot = () => {
  return (
    <>
      <div className='bg-[rgb(0,72,150)]'>
        <div className='mx-4 sm:mx-8 lg:mx-40'>
          <div className='flex flex-col sm:flex-row justify-between gap-4 sm:gap-0 pt-5 pb-1'>
            <div className='w-24 sm:w-32'>
              <img src="/images/cartrade_tech.svg" alt="Cartrade Tech" className='w-full h-auto' />
            </div>
            {/* <div className='hidden sm:block flex-1 mx-4'>
              <hr className='w-full border border-white' />
            </div> */}
            <div className='w-24 sm:w-32'>
              <img src="/images/olx_2025.svg" alt="OLX" className='w-full h-auto' />
            </div>
            <div className='w-24 sm:w-32'>
              <a href="https://www.carwale.com/" target='_blank'>
                <img src="/images/carwale.svg" alt="Carwale" className='w-full h-auto' />
              </a>
            </div>
            <div className='w-24 sm:w-32'>
              <a href="https://www.bikewale.com/" target='_blank'>
                <img src="/images/bikewale.svg" alt="Bikewale" className='w-full h-auto' />
              </a>
            </div>
            <div className='w-24 sm:w-32'>
              <a href="https://www.cartrade.com/" target='_blank'>
                <img src="/images/cartrade_tech.svg" alt="Cartrade" className='w-full h-auto' />
              </a>
            </div>
            <div className='w-24 sm:w-32'>
              <a href="https://www.mobilityoutlook.com/" target='_blank'>
                <img src="/images/mobility.svg" alt="Mobility Outlook" className='w-full h-auto' />
              </a>
            </div>
          </div>
          <div className='flex flex-col sm:flex-row justify-between text-white pb-5 text-sm'>
            <div><p>Help - Sitemap</p></div>
            <div><p>All rights reserved © 2006-2025 OLX</p></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Foot