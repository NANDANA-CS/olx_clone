// import React, { useState, useEffect } from 'react';
// import { useAuth0 } from '@auth0/auth0-react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Navbar from '../../components/navbar/Navbar';
// import Footer from '../../components/footer/Footer';

// const Edit = () => {
//   const { isAuthenticated, user } = useAuth0();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     phone: '',
//   });
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   useEffect(() => {
//     if (isAuthenticated && user) {
//       setFormData({
//         username: user.name || '',
//         email: user.email || '',
//         phone: '',
//       });
//       const fetchUserData = async () => {
//         try {
//           const userId = localStorage.getItem('id');
//           console.log('Fetching user data for ID:', userId);
//           if (userId) {
//             const response = await axios.get(`http://localhost:3000/api/user/${userId}`);
//             console.log('User data response:', response.data);
//             setFormData({
//               username: response.data.username || user.name || '',
//               email: response.data.email || user.email || '',
//               phone: response.data.phone || '',
//             });
//           }
//         } catch (err) {
//           console.error('Detailed error fetching user data:', err.response || err);
//           setError('Failed to fetch user data.');
//         }
//       };
//       fetchUserData();
//     }
//   }, [isAuthenticated, user]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     try {
//       const userId = localStorage.getItem('id');
//       if (!userId) {
//         setError('User ID not found. Please log in again.');
//         return;
//       }

//       const response = await axios.put(`http://localhost:3000/api/user/${userId}`, {
//         username: formData.username,
//         email: formData.email,
//         phone: formData.phone || null,
//       });

//       setSuccess('Profile updated successfully!');
//       setTimeout(() => navigate('/'), 2000);
//     } catch (err) {
//       console.error('Error updating profile:', err.response || err);
//       setError('Failed to update profile. Please try again.');
//     }
//   };

//   if (!isAuthenticated) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <p className="text-lg text-gray-700">Please log in to edit your profile.</p>
//       </div>
//     );
//   }

//   return (
//     <>
//     <Navbar/>
//     <div className="min-h-screen flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8 mt-40">
//       {/* Header */}
//       <div className="max-w-4xl w-full">
       
//         <h1 className="text-2xl sm:text-3xl font-bold text-[#002f34] mb-4">
//           Edit Profile
//         </h1>
//       </div>

//       {/* Profile Card */}
//       <div className="max-w-4xl w-full bg-white rounded-lg shadow-md p-6 sm:p-8">
//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
//             {error}
//           </div>
//         )}
//         {success && (
//           <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
//             {success}
//           </div>
//         )}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Profile Picture (Placeholder, as OLX often includes it) */}
//           <div className="flex items-center mb-6">
//             <img
//               src={user?.picture || '/images/blank-profile-picture-973460_1280.webp'}
//               alt="Profile"
//               className="w-16 h-16 rounded-full mr-4 border border-gray-300"
//             />
//             <div>
//               <label className="text-sm font-medium text-[#002f34]">
//                 Profile Picture
//               </label>
//               <p className="text-sm text-gray-500">
//                 Change your profile picture (not implemented)
//               </p>
//             </div>
//           </div>

//           {/* Form Fields */}
//           <div className="space-y-4">
//             <div>
//               <label
//                 htmlFor="username"
//                 className="block text-sm font-medium text-[#002f34] mb-1"
//               >
//                 Name
//               </label>
//               <input
//                 id="username"
//                 name="username"
//                 type="text"
//                 value={formData.username}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#002f34] text-base"
//                 placeholder="Enter your name"
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-[#002f34] mb-1"
//               >
//                 Email
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#002f34] text-base"
//                 placeholder="Enter your email"
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="phone"
//                 className="block text-sm font-medium text-[#002f34] mb-1"
//               >
//                 Phone Number (Optional)
//               </label>
//               <input
//                 id="phone"
//                 name="phone"
//                 type="tel"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#002f34] text-base"
//                 placeholder="Enter your phone number"
//               />
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-end space-x-4">
//             <button
//               type="button"
//               onClick={() => navigate('/')}
//               className="px-6 py-3 border border-gray-300 text-[#002f34] text-base font-medium rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#002f34]"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-6 py-3 bg-[#002f34] text-white text-base font-medium rounded-md hover:bg-[#004f54] focus:outline-none focus:ring-2 focus:ring-[#002f34]"
//             >
//               Save Changes
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//     <Footer/>
//     </>
//   );
// };

// export default Edit;



import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

const Edit = () => {
  const { isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData({
        username: user.name || '',
        email: user.email || '',
        phone: '',
      });
      const fetchUserData = async () => {
        try {
          const userId = localStorage.getItem('id');
          console.log('Fetching user data for ID:', userId);
          if (userId) {
            const response = await axios.get(`http://localhost:3000/api/user/${userId}`);
            console.log('User data response:', response.data);
            setFormData({
              username: response.data.username || user.name || '',
              email: response.data.email || user.email || '',
              phone: response.data.phone || '',
            });
          }
        } catch (err) {
          console.error('Detailed error fetching user data:', err.response || err);
          setError('Failed to fetch user data.');
        }
      };
      fetchUserData();
    }
  }, [isAuthenticated, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const userId = localStorage.getItem('id');
      if (!userId) {
        setError('User ID not found. Please log in again.');
        return;
      }

      const response = await axios.put(`http://localhost:3000/api/user/${userId}`, {
        username: formData.username,
        email: formData.email,
        phone: formData.phone || null,
      });

      setSuccess('Profile updated successfully!');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      console.error('Error updating profile:', err.response || err);
      setError('Failed to update profile. Please try again.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f1f4f5]">
        <p className="text-lg text-[#002f34]">Please log in to edit your profile.</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-[#f1f4f5] min-h-screen flex flex-col items-center mt-30 py-8 px-4 sm:px-6 lg:px-8 pt-32">
        <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4 bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-6">
              <img
                src={user?.picture || '/images/blank-profile-picture-973460_1280.webp'}
                alt="Profile"
                className="w-12 h-12 rounded-full mr-3 border border-gray-300"
              />
              <div>
                <h2 className="text-lg font-semibold text-[#002f34]">
                  {user?.name || 'User'}
                </h2>
                <p className="text-sm text-gray-600">Manage your profile</p>
              </div>
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  className="w-full text-left py-2 px-4 bg-[#ebeeef] text-[#002f34] font-medium rounded-md"
                  onClick={() => navigate('/edit')}
                >
                  Profile
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left py-2 px-4 text-[#002f34] hover:bg-[#ebeeef] rounded-md"
                  onClick={() => navigate('/my-ads')}
                >
                  My Ads
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left py-2 px-4 text-[#002f34] hover:bg-[#ebeeef] rounded-md"
                  onClick={() => navigate('/wishlist')}
                >
                  Wishlist
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left py-2 px-4 text-[#002f34] hover:bg-[#ebeeef] rounded-md"
                  onClick={() => navigate('/settings')}
                >
                  Settings
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left py-2 px-4 text-[#002f34] hover:bg-[#ebeeef] rounded-md"
                  onClick={() => navigate('/logout')}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>

          {/* Profile Form */}
          <div className="w-full lg:w-3/4 bg-white rounded-lg shadow-md p-6 sm:p-8">
            <h1 className="text-xl sm:text-2xl font-bold text-[#002f34] mb-6">
              Personal Details
            </h1>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                {success}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center mb-6">
                <img
                  src={user?.picture || '/images/blank-profile-picture-973460_1280.webp'}
                  alt="Profile"
                  className="w-20 h-20 rounded-full mr-4 border border-gray-300"
                />
                <div>
                  <label className="text-sm font-medium text-[#002f34]">
                    Profile Photo
                  </label>
                  <button
                    type="button"
                    className="mt-2 text-[#002f34] text-sm font-medium hover:underline"
                    disabled
                  >
                    Update Photo (Not Implemented)
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-[#002f34] mb-1"
                  >
                    Your Name
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#d8dfe0] rounded-[4px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#002f34] text-base"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#002f34] mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#d8dfe0] rounded-[4px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#002f34] text-base"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-[#002f34] mb-1"
                  >
                    Mobile Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#d8dfe0] rounded-[4px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#002f34] text-base"
                    placeholder="Enter your mobile number"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="px-6 py-3 border border-[#d8dfe0] text-[#002f34] text-base font-medium rounded-[4px] hover:bg-[#ebeeef] focus:outline-none focus:ring-2 focus:ring-[#002f34]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#002f34] text-white text-base font-medium rounded-[4px] hover:bg-[#004f54] focus:outline-none focus:ring-2 focus:ring-[#002f34]"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Edit;