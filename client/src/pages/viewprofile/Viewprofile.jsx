import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';

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

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/');
      return;
    }

    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('id');
        if (userId) {
          const response = await axios.get(`http://localhost:3000/api/user/${userId}`);
          const dbData = response.data;
          setProfileData({
            username: dbData.username || user.name || '',
            profilepicture: dbData.profilepicture || user.picture || '/images/blank-profile-picture-973460_1280.webp',
            about: dbData.about || '',
            phone: dbData.phone || '',
            email: dbData.email || user.email || '',
          });
        } else {
          // Fallback to Auth0 if no userId
          setProfileData({
            username: user.name || '',
            profilepicture: user.picture || '/images/blank-profile-picture-973460_1280.webp',
            about: '',
            phone: '',
            email: user.email || '',
          });
        }
      } catch (err) {
        console.error('Error fetching user data:', err.response || err);
        // Fallback to Auth0 on error
        setProfileData({
          username: user.name || '',
          profilepicture: user.picture || '/images/blank-profile-picture-973460_1280.webp',
          about: '',
          phone: '',
          email: user.email || '',
        });
      }
    };

    fetchUserData();
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || !user) return null;

  const getInitial = (name) => name?.charAt(0)?.toUpperCase() || 'U';

  const joinDate = new Date(user.updated_at).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10 mt-45">
        <div className="flex flex-col sm:flex-row items-start justify-between bg-white p-6 rounded-md">
          {/* Profile Info */}
          <div className="flex flex-col items-center sm:items-start gap-4 sm:w-1/2">
            <div>
              <img
                src={profileData.profilepicture}
                alt="Profile"
                className="rounded-full w-20 h-20"
              />
            </div>
            <div className="text-center sm:text-left">
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

          {/* Edit Side */}
          <div className="flex flex-col items-center justify-center text-center mt-10 sm:mt-0 sm:w-1/2">
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
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Viewprofile;