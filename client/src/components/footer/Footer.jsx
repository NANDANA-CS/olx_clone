import React from 'react'

const Footer = () => {
    return (
        <>
            <div className='relative w-full'>
                <div className='bg-[rgb(246,247,247)] py-6'>
                    <div className='mx-4 sm:mx-8 lg:mx-40'>
                        <div className='flex flex-col sm:flex-row justify-between gap-6 sm:gap-0 pt-5 pb-9'>
                            <div>
                                <h4 className='text-sm sm:text-md font-black mb-2'>POPULAR LOCATIONS</h4>
                                <p className='text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer'>Kolkata</p>
                                <p className='text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer'>Mumbai</p>
                                <p className='text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer'>Chennai</p>
                                <p className='text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer'>Pune</p>
                            </div>
                            <div>
                                <h4 className='text-sm sm:text-md font-black mb-2'>TRENDING LOCATIONS</h4>
                                <p className='text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer'>Bhubaneshwar</p>
                                <p className='text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer'>Hyderabad</p>
                                <p className='text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer'>Chandigarh</p>
                                <p className='text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer'>Nashik</p>
                            </div>
                            <div>
                                <h4 className='text-sm sm:text-md font-black mb-2'>ABOUT US</h4>
                                <p className='text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer'>Tech@OLX</p>
                                <p className='text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer'>Careers</p>
                            </div>
                            <div>
                                <h4 className='text-sm sm:text-md font-black mb-2'>OLX</h4>
                                <p className='text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer'>Blog</p>
                                <p className='text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer'>Help</p>
                                <p className='text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer'>Sitemap</p>
                                <p className='text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer'>Legal & Privacy information</p>
                                <p className='text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer'>Vulnerability Disclosure Program</p>
                            </div>
                            <div>
                                <h4 className='text-sm sm:text-md font-black mb-2'>FOLLOW US</h4>
                                <div className='flex gap-3 mb-2'>
                                    <img src="/images/3eacf1e9-22af-4972-a266-0b449120be27.svg" alt="Facebook" className='h-6 sm:h-7' />
                                    <img src="/images/59ffa9c2-25f3-439b-9e5b-33ce37f47caa.svg" alt="Instagram" className='h-6 sm:h-7' />
                                    <img src="/images/f1b7adbc-0c14-4cd8-88b2-d0caf6ccd3cd.svg" alt="Twitter" className='h-6 sm:h-7' />
                                    <img src="/images/8c323b35-66b5-46a2-a3a6-a6cc68b344a4.svg" alt="YouTube" className='h-6 sm:h-7' />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <img src="https://statics.olx.in/external/base/img/playstore.png" alt="Play Store" className='h-8 sm:h-10 w-auto' />
                                    <img src="https://statics.olx.in/external/base/img/appstore.png" alt="App Store" className='h-8 sm:h-10 w-auto' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
            </div>
        </>
    )
}

export default Footer