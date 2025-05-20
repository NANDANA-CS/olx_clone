import React, { useState, useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'

const Viewprofile = () => {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    username: '',
    profilepicture: '',
    about: '',
    phone: '',
    email: '',
  });
  const [ads, setAds] = useState([])
  const [loadingAds, setLoadingAds] = useState(true)
  const [errorAds, setErrorAds] = useState(null)
  const userId = localStorage.getItem('id')

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/')
      return
    }

    const fetchUserData = async () => {
      try {
        if (userId) {
          const response = await axios.get(`http://localhost:3000/api/user/${userId}`)
          const dbData = response.data
          setProfileData({
            username: dbData.username || user.name || '',
            profilepicture: dbData.profilepicture || user.picture || '/images/blank-profile-picture-973460_1280.webp',
            about: dbData.about || '',
            phone: dbData.phone || '',
            email: dbData.email || user.email || '',
          })
        } else {
          setProfileData({
            username: user.name || '',
            profilepicture: user.picture || '/images/blank-profile-picture-973460_1280.webp',
            about: '',
            phone: '',
            email: user.email || '',
          })
        }
      } catch (err) {
        console.error('Error fetching user data:', err.response || err)
        setProfileData({
          username: user.name || '',
          profilepicture: user.picture || '/images/blank-profile-picture-973460_1280.webp',
          about: '',
          phone: '',
          email: user.email || '',
        })
      }
    }

    const fetchUserAds = async () => {
      if (!userId) {
        setErrorAds('Please log in to view your ads')
        setLoadingAds(false)
        return
      }

      try {
        const response = await axios.get(`http://localhost:3000/api/user/${userId}/ads`)
        setAds(response.data)
        setLoadingAds(false)
      } catch (err) {
        setErrorAds('Failed to fetch your ads')
        setLoadingAds(false)
        console.error('Error fetching user ads:', err)
      }
    }

    fetchUserData()
    fetchUserAds()
  }, [isAuthenticated, user, navigate, userId])

  if (!isAuthenticated || !user) return null

  const joinDate = new Date(user.updated_at).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  const handleAdClick = (adId) => {
    if (!adId) return
    navigate(`/preview/${adId}`)
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10 mt-45">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Profile  */}
          <div className="sm:w-1/2 bg-white p-6 rounded-md ">
            <div className="flex flex-col items-start sm:items-start gap-4">
              <div>
                <img
                  src={profileData.profilepicture}
                  alt="Profile"
                  className="rounded-full w-20 h-20"
                />
              </div>
              <div className="text-left">
                <h2 className="text-xl font-semibold">{profileData.username}</h2>
                <p className="text-gray-600 text-sm mt-1">Member since {joinDate}</p>
                <p className="text-gray-600 text-sm">120 Followers | 10 Following</p>
                {profileData.about && (
                  <p className="text-gray-600 text-sm mt-2">{profileData.about}</p>
                )}
                <button
                  onClick={() => navigate('/edit')}
                  className="mt-4 bg-white text-blue-900 font-bold py-2 px-4 rounded hover:bg-white hover:border-4 border hover:border-blue-800 transition"
                >
                  Edit Profile
                </button>
              </div>
            </div>
            {/* No Ads Message */}
            {ads.length === 0 && !loadingAds && !errorAds && (
              <div className="flex flex-col items-center justify-center text-center mt-10">
                <img
                  src="/images/edit-side.webp"
                  alt="No Ads"
                  className="w-40 mb-4"
                />
                <p className="text-lg font-semibold">You haven't listed anything yet</p>
                <p className="text-sm text-gray-500 mb-4">Let go of what you don’t use anymore</p>
                <button
                  onClick={() => navigate('/postadd')}
                  className="bg-blue-800 text-white font-bold py-2 px-6 rounded hover:bg-white hover:text-blue-800 border hover:border-blue-800 transition"
                >
                  Start selling
                </button>
              </div>
            )}
          </div>

          {/* Ads Section */}
          <div className="sm:w-1/2">
            <h3 className="text-2xl font-semibold mb-4">My Ads</h3>
            {loadingAds ? (
              <p>Loading ads...</p>
            ) : errorAds ? (
              <p className="text-red-500">{errorAds}</p>
            ) : (
              ads.length > 0 && (
                <div className="grid sm:grid-cols-2 gap-6">
                  {ads.map((ad, index) => (
                    <div
                      key={index}
                      className="w-full bg-white border border-gray-300 rounded-md p-4 hover:shadow-md transition cursor-pointer"
                      onClick={() => handleAdClick(ad._id)}
                    >
                      <img
                        src={`http://localhost:3000/images/${ad.pic[0] || 'default.jpg'}`}
                        alt={ad.adtitle}
                        className="w-full h-40 object-cover rounded mb-3"
                        onError={(e) => (e.target.src = '/images/fallback.jpg')}
                      />
                      <h3 className="text-lg font-semibold mb-1">{ad.adtitle}</h3>
                      <p className="text-xl font-bold text-gray-800">₹ {ad.price}</p>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Viewprofile