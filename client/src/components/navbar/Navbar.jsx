import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from '../../pages/login/Login'
import LogoutButton from '../../pages/logout/logout'
import axios from 'axios';

const Navbar = ({ onSearch }) => { 
  const { isAuthenticated, user } = useAuth0()
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState({
    username: '',
    email: '',
  });

  const goToBackend = async (data) => {
    try {
      console.log('bck');
      const res = await axios.post('http://localhost:3000/api/signup', data);
      console.log(res.data.id);
      localStorage.setItem('id', res.data.id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      const userData = { username: user.name, email: user.email };
      setUserdata(userData);
      goToBackend(userData);
    }
  }, [isAuthenticated, user]);

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSellClick = () => {
    navigate('/postadd');
  };

  const handleDropdownClick = (item) => {
    if (item.label === 'Logout') {
      navigate(item.path);
    } else {
      navigate(item.path);
    }
    setIsDropdownOpen(false);
  };

  // search 
  const handleSearchChange = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    onSearch(query)
  };

  return (
    <nav className="bg-gray-100 shadow-md fixed top-0 left-0 right-0 w-full z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center h-auto sm:h-20 gap-4 sm:gap-11 py-4 sm:py-0">
          <div className="flex items-center justify-between w-full sm:w-auto gap-4 sm:gap-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img
                src="/images/olx_logo_2025.svg"
                alt="Logo"
                className="h-12 sm:h-[76px] w-auto"
              />
            </div>

            {/* Location Selector */}
            <div className="inline-flex relative items-center w-full sm:w-[360px]">
              <input
                type="search"
                value="India"
                className="border-2 rounded bg-white h-12 w-full sm:w-[360px] pl-8 bg-[url('/images/3649ea37-bc25-4403-a82c-24ebe116f6d8.svg')] bg-no-repeat bg-[4px_center]"
                readOnly
              />
              <img
                src="/images/4a61b31e-53ec-4034-a36f-ec19c689777b.svg"
                alt="Down Arrow"
                className="h-5 w-5 absolute right-2"
              />
            </div>

            {/* Mobile Search Icon */}
            <div className="sm:hidden">
              <img
                src="/images/3649ea37-bc25-4403-a82c-24ebe116f6d8.svg"
                alt="Search"
                className="h-8 w-8 cursor-pointer"
                onClick={toggleMobileSearch}
              />
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 w-full sm:w-[1000px] mx-0 sm:mx-6 hidden sm:block">
            <div className="relative">
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Find Cars, Mobile Phones and more..."
                className="w-full py-3 pl-5 pr-12 border-2 border-black-500 rounded-md text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-[#002f34] transition-all"
                value={searchQuery}
                onChange={handleSearchChange} 
              />
              <div className="h-12 w-14 bg-black absolute right-0 rounded-r top-1/2 transform -translate-y-1/2 flex items-center justify-center">
                <img
                  src="/images/images (1).png"
                  alt="Search"
                  className="size-8"
                />
              </div>
            </div>
          </div>

          {/* Language Selector */}
          <div className="flex items-center">
            <p className="text-lg sm:text-xl text-black-900 font-bold">ENGLISH</p>
            <img
              src="/images/4a61b31e-53ec-4034-a36f-ec19c689777b.svg"
              alt=""
              className="h-5 w-5 ml-2"
            />
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4 sm:space-x-8">
            {/* Like Icon */}
            <img
              src="/images/bc65b85d-d193-4d92-a00e-09bfc4299345.svg"
              alt="Like"
              className="h-8 cursor-pointer hover:opacity-75 transition-opacity"
            />

            {/* User Profile/Dropdown or Login Button */}
            {isAuthenticated ? (
              <div className="relative flex items-center">
                {localStorage.setItem('email', user.email)}
                <img
                  src={user?.picture || '/images/blank-profile-picture-973460_1280.webp'}
                  alt="User Profile"
                  className="h-10 w-10 rounded-full border border-gray-300"
                />
                <img
                  src="/images/4a61b31e-53ec-4034-a36f-ec19c689777b.svg"
                  alt="Down Arrow"
                  className="h-5 w-5 ml-2 cursor-pointer hover:opacity-75"
                  onClick={toggleDropdown}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && toggleDropdown()}
                />
                {isDropdownOpen && (
                  <div className="absolute top-12 right-0 w-64 sm:w-80 bg-white border border-gray-200 rounded-md shadow-md z-50">
                    {/* User Info */}
                    <div className="flex items-center p-3 border-b border-gray-200">
                      <img
                        src={user?.picture || '/images/blank-profile-picture-973460_1280.webp'}
                        alt="User Profile"
                        className="h-12 sm:h-18 w-12 sm:w-18 rounded-full mr-2"
                      />
                      <span className="text-gray-900 font-medium text-lg sm:text-2xl">
                        {user?.name || 'User'}
                      </span>
                    </div>
                    {/* Dropdown Items */}
                    <div>
                      <div className="cursor-pointer px-2 py-2 bg-blue-800 hover:bg-white hover:text-blue-800 border border-blue-800 text-white mx-4 text-center mb-4 mt-4 text-base sm:text-xl">
                        <p>View and Edit Profile</p>
                      </div>
                      <hr className="border border-gray-200" />
                      <div className="flex items-center space-x-3 px-2 py-3 hover:bg-blue-100 rounded transition text-base sm:text-xl">
                        <svg
                          width="23px"
                          height="23px"
                          viewBox="0 0 1024 1024"
                          data-aut-id="icon"
                          className=""
                          fillRule="evenodd"
                        >
                          <path
                            className="rui-w4DG7"
                            d="M426.667 42.667h170.667l42.667 42.667-42.667 42.667h256l42.667 42.667v768l-42.667 42.667h-682.667l-42.667-42.667v-768l42.667-42.667h256l-42.667-42.667 42.667-42.667zM213.333 896h597.333v-682.667h-597.333v682.667zM469.333 426.667v-85.333h256v85.333h-256zM298.667 426.667v-85.333h85.333v85.333h-85.333zM469.333 597.333v-85.333h256v85.333h-256zM298.667 597.333v-85.333h85.333v85.333h-85.333zM469.333 768v-85.333h256v85.333h-256zM298.667 768v-85.333h85.333v85.333h-85.333z"
                          ></path>
                        </svg>
                        <p>My Ads</p>
                      </div>
                      <div className="flex items-center space-x-3 px-2 py-3 hover:bg-blue-100 rounded transition text-base sm:text-xl">
                        <svg
                          width="23px"
                          height="23px"
                          viewBox="0 0 1024 1024"
                          data-aut-id="icon"
                          className=""
                          fillRule="evenodd"
                        >
                          <path
                            className="rui-w4DG7"
                            d="M426.667 42.667h170.667l42.667 42.667-42.667 42.667h256l42.667 42.667v768l-42.667 42.667h-682.667l-42.667-42.667v-768l42.667-42.667h256l-42.667-42.667 42.667-42.667zM213.333 896h597.333v-682.667h-597.333v682.667zM469.333 426.667v-85.333h256v85.333h-256zM298.667 426.667v-85.333h85.333v85.333h-85.333zM469.333 597.333v-85.333h256v85.333h-256zM298.667 597.333v-85.333h85.333v85.333h-85.333zM469.333 768v-85.333h256v85.333h-256zM298.667 768v-85.333h85.333v85.333h-85.333z"
                          ></path>
                        </svg>
                        <p>Buy Business Package</p>
                      </div>
                      <div className="flex items-center space-x-3 px-2 py-3 hover:bg-blue-100 rounded transition text-base sm:text-xl">
                        <svg
                          width="23px"
                          height="23px"
                          viewBox="0 0 1024 1024"
                          data-aut-id="icon"
                          className=""
                          fillRule="evenodd"
                        >
                          <path
                            className="rui-w4DG7"
                            d="M899.285 256l39.381 39.083v476.501l-39.381 39.083h-774.571l-39.381-39.083v-476.501l39.381-39.083h774.571zM853.461 511.573h-681.6v213.632h681.6v-213.632zM693.205 618.411h76.459l34.901 32.213-34.901 32.213h-128.896l-34.901-32.213 34.901-32.213h52.437zM853.461 341.248h-681.387v86.357l681.387-2.347v-84.053z"
                          ></path>
                        </svg>
                        <p>Bought Package and Buildings</p>
                      </div>
                      <hr className="border border-gray-200" />
                      <div className="flex items-center space-x-3 px-2 py-3 hover:bg-blue-100 rounded transition text-base sm:text-xl">
                        <svg
                          width="23px"
                          height="23px"
                          viewBox="0 0 1024 1024"
                          data-aut-id="icon"
                          className=""
                          fillRule="evenodd"
                        >
                          <path
                            className="rui-w4DG7"
                            d="M899.285 256l39.381 39.083v476.501l-39.381 39.083h-774.571l-39.381-39.083v-476.501l39.381-39.083h774.571zM853.461 511.573h-681.6v213.632h681.6v-213.632zM693.205 618.411h76.459l34.901 32.213-34.901 32.213h-128.896l-34.901-32.213 34.901-32.213h52.437zM853.461 341.248h-681.387v86.357l681.387-2.347v-84.053z"
                          ></path>
                        </svg>
                        <p>Help</p>
                      </div>
                      <div className="flex items-center space-x-3 px-2 py-3 hover:bg-blue-100 rounded transition text-base sm:text-xl">
                        <svg
                          width="23px"
                          height="23px"
                          viewBox="0 0 1024 1024"
                          data-aut-id="icon"
                          className=""
                          fillRule="evenodd"
                        >
                          <path
                            className="rui-w4DG7"
                            d="M899.285 256l39.381 39.083v476.501l-39.381 39.083h-774.571l-39.381-39.083v-476.501l39.381-39.083h774.571zM853.461 511.573h-681.6v213.632h681.6v-213.632zM693.205 618.411h76.459l34.901 32.213-34.901 32.213h-128.896l-34.901-32.213 34.901-32.213h52.437zM853.461 341.248h-681.387v86.357l681.387-2.347v-84.053z"
                          ></path>
                        </svg>
                        <p>Settings</p>
                      </div>
                      <div className="flex items-center space-x-3 px-2 py-3 hover:bg-blue-100 rounded transition text-base sm:text-xl">
                        <svg
                          width="23px"
                          height="23px"
                          viewBox="0 0 1024 1024"
                          data-aut-id="icon"
                          className=""
                          fillRule="evenodd"
                        >
                          <path
                            className="rui-w4DG7"
                            d="M128 85.333l-42.667 42.667v768l42.667 42.667h768l42.667-42.667v-213.333l-42.667-42.667-42.667 42.667v170.667h-682.667v-682.667h682.667v170.667l42.667 42.667 42.667-42.667v-213.333l-42.667-42.667h-768zM494.336 298.667l-183.168 183.168v60.331l183.168 183.168h60.331v-60.331l-110.336-110.336h323.669l42.667-42.667-42.667-42.667h-323.669l110.336-110.336v-60.331h-60.331z"
                          ></path>
                        </svg>
                        <div className="flex items-center">
                          <LogoutButton />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <LoginButton />
            )}

            {/* Sell Button */}
            <div
              className="relative cursor-pointer"
              onClick={handleSellClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleSellClick()}
            >
              <div className="shadow-[0_2px_8px_rgba(0,0,0,0.5)] h-10 w-[100px] sm:w-[100px] grid grid-rows-3 grid-cols-4 rounded-[100px] overflow-hidden absolute left-2">
                <div className="size-full bg-[#42B3AD] col-span-4"></div>
                <div className="size-full bg-[#FECF32] row-span-2 col-span-2"></div>
                <div className="size-full bg-[#0179FA] row-span-2 col-span-2"></div>
              </div>
              <div className="flex gap-2 h-[30px] w-[90px] sm:w-[90px] bg-white relative items-center rounded-[100px] absolute top-[5px] left-[13px]">
                <img
                  src="/images/73091623-75b8-4655-9408-04acf909e119.svg"
                  alt="Add"
                  className="ml-4 w-4 h-4"
                />
                <p className="text-sm sm:text-base font-medium text-[#004896]">
                  SELL
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isMobileSearchOpen && (
          <div className="sm:hidden mt-3 px-4 pb-3">
            <div className="relative">
              <input
                type="text"
                name="mobile-search"
                id="mobile-search"
                placeholder="Find Cars, Mobile Phones and more..."
                className="w-full py-3 pl-5 pr-12 border border-gray-300 rounded-md text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-[#002f34]"
                value={searchQuery}
                onChange={handleSearchChange} 
              />
              <img
                src="/images/3649ea37-bc25-4403-a82c-24ebe116f6d8.svg"
                alt="Search"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6"
              />
            </div>
          </div>
        )}
      </div>

      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-nowrap sm:flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 py-3 text-gray-700 font-medium text-sm sm:text-base overflow-x-auto scrollbar-hide">
            <div className="flex items-center">
              <p className="cursor-pointer hover:text-[#002f34] transition whitespace-nowrap">
                All Categories
              </p>
              <img
                src="/images/4a61b31e-53ec-4034-a36f-ec19c689777b.svg"
                alt=""
                className="h-5 w-5 ml-2"
              />
            </div>
            <p className="cursor-pointer hover:text-[#002f34] transition whitespace-nowrap">
              Cars
            </p>
            <p className="cursor-pointer hover:text-[#002f34] transition whitespace-nowrap">
              Bikes
            </p>
            <p className="cursor-pointer hover:text-[#002f34] transition whitespace-nowrap">
              Scooters
            </p>
            <p className="cursor-pointer hover:text-[#002f34] transition whitespace-nowrap">
              Mobiles
            </p>
            <p className="cursor-pointer hover:text-[#002f34] transition whitespace-nowrap">
              Electronics
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar