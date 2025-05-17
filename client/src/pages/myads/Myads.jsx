import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'

const Myads = () => {
  const [ads, setAds] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const userId = localStorage.getItem('id')

  useEffect(() => {
    const adjustContentPadding = () => {
      const navbar = document.querySelector('nav')
      const myadsContainer = document.querySelector('.myads')
      if (navbar && myadsContainer) {
        const navbarHeight = navbar.offsetHeight
        myadsContainer.style.paddingTop = `${navbarHeight + 16}px`
      }
    }

    adjustContentPadding()
    window.addEventListener('resize', adjustContentPadding)
    return () => window.removeEventListener('resize', adjustContentPadding)
  }, [])

  useEffect(() => {
    const fetchUserAds = async () => {
      if (!userId) {
        setError('Please log in to view your ads')
        setLoading(false)
        return
      }

      try {
        const response = await axios.get(`http://localhost:3000/api/user/${userId}/ads`)
        setAds(response.data)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch your ads')
        setLoading(false)
        console.error('Error fetching user ads:', err)
      }
    }

    fetchUserAds()
  }, [userId])

  const handleAdClick = (adId) => {
    if (!adId) return
    navigate(`/preview/${adId}`)
  }

  if (loading || error) {
    return (
      <div className="myads min-h-screen">
        <Navbar />
        <div className="mx-6 pt-[120px] pb-8 text-center">
          {error ? <p className="text-red-500">{error}</p> : <p>Loading...</p>}
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="myads min-h-screen bg-gray-50">
      <Navbar />
      <div className="mx-auto max-w-7xl pt-[140px] pb-10 px-6">
        <p className='text-4xl'>My Ads</p><br /><br />
        {ads.length === 0 ? (
          <p>No ads found. Start selling by posting an ad!</p>
        ) : (
          ads.map((ad, index) => (
            <div
              key={index}
              className="bg-white border border-gray-300 rounded-md mb-6 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:shadow-md transition"
            >     
              <div className="flex items-start gap-4 cursor-pointer" onClick={() => handleAdClick(ad._id)}>
                <img
                  src={`http://localhost:3000/images/${ad.pic[0] || 'default.jpg'}`}
                  alt={ad.adtitle}
                  className="w-32 h-24 sm:w-40 sm:h-28 object-cover rounded"
                  onError={(e) => (e.target.src = '/images/fallback.jpg')}
                />
                <div>
                 
                  <h3 className="text-lg font-semibold mb-1">{ad.adtitle}</h3>
                  <p className="text-xl font-bold text-gray-800 mb-1">₹ {ad.price}</p>
                   <p className="text-gray-500 text-sm mb-1">From: May 10, 25 — To: Jun 9, 25</p>
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">ACTIVE</span>
                </div>
              </div>
              <div className="mt-4 sm:mt-0 text-sm text-gray-600 flex flex-col items-start sm:items-end gap-2">
                
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-white text-blue-900 rounded border border-2 hover:border-4">Mark as sold</button>
                  <button className="px-3 py-1 bg-white text-blue-900 rounded border border-2 hover:border-4">Sell faster now</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Myads
