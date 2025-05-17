import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'

const Edit = () => {
  const { isAuthenticated, user } = useAuth0()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    about: '',
    profilepicture: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (isAuthenticated && user) {
      const fetchUserData = async () => {
        try {
          const userId = localStorage.getItem('id')
          if (userId) {
            const response = await axios.get(`http://localhost:3000/api/user/${userId}`)
            const dbData = response.data
            setFormData({
              username: dbData.username || user.name || '',
              email: dbData.email || user.email || '',
              phone: dbData.phone || '',
              about: dbData.about || '',
              profilepicture: dbData.profilepicture || user.picture || '/images/blank-profile-picture-973460_1280.webp',
            })
          } else {
            setFormData({
              username: user.name || '',
              email: user.email || '',
              phone: '',
              about: '',
              profilepicture: user.picture || '/images/blank-profile-picture-973460_1280.webp',
            })
          }
        } catch (err) {
          console.error('Detailed error fetching user data:', err.response || err)
          setFormData({
            username: user.name || '',
            email: user.email || '',
            phone: '',
            about: '',
            profilepicture: user.picture || '/images/blank-profile-picture-973460_1280.webp',
          });
          setError('Failed to fetch user data.')
        }
      }
      fetchUserData()
    }
  }, [isAuthenticated, user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      const userId = localStorage.getItem('id')
      if (!userId) {
        setError('User ID not found. Please log in again.')
        return;
      }

      const response = await axios.put(`http://localhost:3000/api/user/${userId}`, {
        username: formData.username,
        email: formData.email,
        phone: formData.phone || null,
        about: formData.about || null,
        profilepicture: formData.profilepicture || null,
      });

      setSuccess('Profile updated successfully!')
      setTimeout(() => navigate('/viewprofile'), 2000)
    } catch (err) {
      console.error('Error updating profile:', err.response || err)
      setError('Failed to update profile. Please try again.')
    }
  }

  const handleCancel = () => {
    navigate('/viewprofile');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-700">Please log in to edit your profile.</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8 pt-40 mt-25">
        <div className="max-w-5xl w-full flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-1/3">
            <div className="border rounded p-4 text-center">
              <img
                src={formData.profilepicture}
                alt="Profile"
                className="w-20 h-20 rounded-full mx-auto mb-3"
              />
              <button
                onClick={() => navigate('/viewprofile')}
                className="mt-4 bg-white text-blue-900 font-bold py-2 px-4 rounded hover:bg-white hover:border-4 border hover:border-blue-800 transition"
              >
                View profile
              </button>
            </div>
          </div>
          {/* form */}
          <div className="w-full lg:w-2/3">
            <div className="border rounded p-6 bg-white shadow">
              <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>

              <div className="mb-6">
                <h3 className="text-md font-semibold mb-2">Basic information</h3>
                <div className="flex items-start gap-4 mb-4">
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    maxLength={30}
                    placeholder="Enter your name"
                    className="border rounded w-full h-12 px-4"
                  />
                  <div className="bg-gray-100 p-3 rounded text-sm text-gray-600 w-1/2">
                    <div className="flex items-start gap-2">
                      <span className="text-yellow-500 text-lg">💡</span>
                      <p>
                        <strong>Why is it important?</strong><br />
                        OLX is built on trust. Help others get to know you.
                      </p>
                    </div>
                  </div>
                </div>

                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  placeholder="About me (optional)"
                  rows={3}
                  className="border rounded w-full px-4 py-2 resize-none"
                  maxLength={200}
                />
              </div>

            {/* cont */}
              <div className="mb-6">
                <h3 className="text-md font-semibold mb-2">Contact information</h3>

                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border rounded w-full h-12 px-4"
                    placeholder="+91 Phone Number"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="border rounded w-full h-12 px-4 bg-gray-100 text-gray-700 cursor-not-allowed"
                  />
                </div>
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              {success && <p className="text-green-600 text-sm mb-4">{success}</p>}
              {/* btns */}
              <div className="flex justify-between gap-4 mt-8">
                <button
                  onClick={handleCancel}
                  className="underline underline-offset-4 text-gray-700 px-4 py-2 rounded hover:bg-gray-100"
                >
                  Discard
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-blue-900 text-white px-5 py-2 rounded font-semibold hover:bg-blue-800 transition"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Edit