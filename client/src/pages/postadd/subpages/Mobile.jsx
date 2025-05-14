import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Foot from '../../../components/footer/Foot';
import Navpost from '../../../components/navbar/Navpost';

const Mobile = () => {
  const [formData, setFormData] = useState({
    brand: '',
    adTitle: '',
    description: '',
    price: '',
  });
  const [images, setImages] = useState(Array(8).fill(null));
  const [location, setLocation] = useState({
    state: '',
    city: '',
    neighborhood: '',
  });
  const [imageError, setImageError] = useState(false);

  const navigate = useNavigate();

  const states = [
    {
      name: 'Kerala',
      cities: [
        { name: 'Thrissur', neighborhoods: ['Wadakancherry', 'Chalakkudy', 'Chavakkad'] },
        { name: 'Ernakulam', neighborhoods: ['Kakkanad', 'Kaloor', 'Edappally', 'Kalamassery'] },
        { name: 'Idukki', neighborhoods: ['Kattappana', 'Painavu', 'Thodupuzha'] },
        { name: 'Kottayam', neighborhoods: ['Pala', 'Ponnkunnam', 'Thodupuzha'] },
      ],
    },
    {
      name: 'Tamil Nadu',
      cities: [
        { name: 'Chennai', neighborhoods: ['T. Nagar', 'Adyar', 'Velachery', 'Kodambakkam'] },
        { name: 'Madurai', neighborhoods: ['Anna Nagar', 'Thiruppalai', 'KK Nagar'] },
        { name: 'Coimbatore', neighborhoods: ['Gandhipuram', 'Saibaba Colony', 'Peelamedu'] },
      ],
    },
    {
      name: 'Karnataka',
      cities: [
        { name: 'Bangalore', neighborhoods: ['Koramangala', 'Whitefield', 'Indiranagar', 'Jayanagar'] },
        { name: 'Mysore', neighborhoods: ['Vijayanagar', 'Saraswathipuram', 'Nazarbad'] },
        { name: 'Mangalore', neighborhoods: ['Bejai', 'Kankanady', 'Pandeshwar'] },
      ],
    },
    {
      name: 'Goa',
      cities: [
        { name: 'Panaji', neighborhoods: ['Altinho', 'Campal', 'Miramar'] },
        { name: 'Margao', neighborhoods: ['Fatorda', 'Borda', 'Navelim'] },
        { name: 'Vasco da Gama', neighborhoods: ['Chicalim', 'Dabolim', 'Vaddem'] },
      ],
    },
    {
      name: 'Maharashtra',
      cities: [
        { name: 'Mumbai', neighborhoods: ['Andheri', 'Bandra', 'Dadar', 'Colaba'] },
        { name: 'Pune', neighborhoods: ['Kothrud', 'Viman Nagar', 'Hinjewadi'] },
        { name: 'Nagpur', neighborhoods: ['Dharampeth', 'Sitabuldi', 'Manish Nagar'] },
      ],
    },
    {
      name: 'Delhi',
      cities: [
        { name: 'New Delhi', neighborhoods: ['Connaught Place', 'Karol Bagh', 'Saket'] },
        { name: 'North Delhi', neighborhoods: ['Model Town', 'Rohini', 'Pitampura'] },
        { name: 'South Delhi', neighborhoods: ['Hauz Khas', 'Greater Kailash', 'Vasant Kunj'] },
      ],
    },
    {
      name: 'Telangana',
      cities: [
        { name: 'Hyderabad', neighborhoods: ['Banjara Hills', 'Madhapur', 'Gachibowli', 'Begumpet'] },
        { name: 'Warangal', neighborhoods: ['Hanamkonda', 'Kazipet', 'Subedari'] },
      ],
    },
    {
      name: 'West Bengal',
      cities: [
        { name: 'Kolkata', neighborhoods: ['Salt Lake', 'Behala', 'Garia', 'Park Street'] },
        { name: 'Howrah', neighborhoods: ['Shibpur', 'Bally', 'Liluah'] },
      ],
    },
    {
      name: 'Uttar Pradesh',
      cities: [
        { name: 'Lucknow', neighborhoods: ['Hazratganj', 'Gomti Nagar', 'Alambagh'] },
        { name: 'Varanasi', neighborhoods: ['Assi Ghat', 'Bhelupur', 'Lanka'] },
      ],
    },
    {
      name: 'Gujarat',
      cities: [
        { name: 'Ahmedabad', neighborhoods: ['Navrangpura', 'Satellite', 'Maninagar'] },
        { name: 'Surat', neighborhoods: ['Adajan', 'Vesu', 'Athwa'] },
      ],
    },
  ];

  const MobileBrands = [
    'Apple',
    'Samsung',
    'Xiaomi',
    'OnePlus',
    'Oppo',
    'Vivo',
    'Realme',
    'Google',
    'Nokia',
    'Motorola',
    'Sony',
    'Asus',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // Limit to 5MB
        alert('Image size exceeds 5MB limit.');
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('Please upload a valid image file.');
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setImages((prev) => {
        const newImages = [...prev];
        newImages[index] = imageUrl;
        return newImages;
      });
    }
  };

  const removeImage = (index) => {
    setImages((prev) => {
      const newImages = [...prev];
      newImages[index] = null;
      return newImages;
    });
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    if (name === 'state') {
      setLocation({ state: value, city: '', neighborhood: '' });
    } else if (name === 'city') {
      setLocation((prev) => ({ ...prev, city: value, neighborhood: '' }));
    } else {
      setLocation((prev) => ({ ...prev, neighborhood: value }));
    }
  };

  const handlePostAd = () => {
    console.log('Posting mobile ad:', formData, images.filter((img) => img !== null), location);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      <Navpost />
      <div className="flex justify-center p-2 xs:p-4 sm:p-6 md:p-8 lg:p-10 bg-gray-100 min-h-screen">
        <div className="w-full max-w-screen-lg min-w-[280px]">
          <div className="flex items-center mb-3 xs:mb-4 sm:mb-5">
            <h1 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold uppercase mx-auto">
              Post Your Mobile Ad
            </h1>
          </div>
          <div className="bg-white rounded-lg shadow-md p-2 xs:p-4 sm:p-6">
            {/* Selected Category Section */}
            <div className="mb-3 xs:mb-4 sm:mb-5">
              <h2 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold uppercase p-1 xs:p-2">
                Selected Category
              </h2>
              <div className="flex justify-between items-center p-1 xs:p-2">
                <span className="text-xs xs:text-sm sm:text-base text-gray-600">Electronics / Mobile</span>
                <button
                  type="button"
                  aria-label="Change category"
                  className="text-xs xs:text-sm sm:text-base text-blue-600 hover:underline cursor-pointer"
                  onClick={() => navigate('/postadd')}
                >
                  Change
                </button>
              </div>
            </div>
            {/* Include Some Details Section */}
            <div className="mb-3 xs:mb-4 sm:mb-5">
              <h2 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold uppercase p-1 xs:p-2">
                Include Some Details
              </h2>
              <div className="p-1 xs:p-2 space-y-3 xs:space-y-4">
                {/* Brand */}
                <div>
                  <label className="block text-xs xs:text-sm sm:text-base font-medium text-gray-700 mb-1">
                    Brand *
                  </label>
                  <div className="relative">
                    <select
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      className="w-full p-1.5 xs:p-2 sm:p-2.5 md:p-3 border border-gray-300 rounded-md text-xs xs:text-sm sm:text-base appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label="Select mobile brand"
                    >
                      <option value="">Select Brand</option>
                      {MobileBrands.map((brand) => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </select>
                    {imageError ? (
                      <svg
                        className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 absolute top-2 xs:top-3 right-2 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    ) : (
                      <img
                        src="/images/4a61b31e-53ec-4034-a36f-ec19c689777b.svg"
                        alt="Down Arrow"
                        className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 absolute top-2 xs:top-3 right-2"
                        onError={handleImageError}
                      />
                    )}
                  </div>
                </div>
                {/* Ad Title */}
                <div>
                  <label className="block text-xs xs:text-sm sm:text-base font-medium text-gray-700 mb-1">
                    Ad Title *
                  </label>
                  <input
                    type="text"
                    name="adTitle"
                    value={formData.adTitle}
                    onChange={handleInputChange}
                    placeholder="Enter Ad Title"
                    className="w-full p-1.5 xs:p-2 sm:p-2.5 md:p-3 border border-gray-300 rounded-md text-xs xs:text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Ad title"
                  />
                </div>
                {/* Description */}
                <div>
                  <label className="block text-xs xs:text-sm sm:text-base font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter Description"
                    className="w-full p-1.5 xs:p-2 sm:p-2.5 md:p-3 border border-gray-300 rounded-md text-xs xs:text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3 xs:rows-4"
                    aria-label="Ad description"
                  />
                </div>
              </div>
            </div>
            {/* Set a Price Section */}
            <div className="mb-3 xs:mb-4 sm:mb-5">
              <h2 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold uppercase p-1 xs:p-2">
                Set a Price
              </h2>
              <div className="p-1 xs:p-2 space-y-3 xs:space-y-4">
                <div>
                  <label className="block text-xs xs:text-sm sm:text-base font-medium text-gray-700 mb-1">
                    Price *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="₹ Enter Price"
                    className="w-full p-1.5 xs:p-2 sm:p-2.5 md:p-3 border border-gray-300 rounded-md text-xs xs:text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Price"
                  />
                </div>
              </div>
            </div>
            {/* Upload Photos Section */}
            <div className="mb-3 xs:mb-4 sm:mb-5">
              <h2 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold uppercase p-1 xs:p-2">
                Upload Photos
              </h2>
              <div className="p-1 xs:p-2">
                <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-4 gap-1 xs:gap-2 sm:gap-3">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      {image ? (
                        <div>
                          <img
                            src={image}
                            alt={`Uploaded image ${index + 1}`}
                            className="w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-md"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute top-0.5 right-0.5 bg-gray-200 rounded-full p-1 text-xs"
                            aria-label={`Remove image ${index + 1}`}
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(index, e)}
                            className="hidden"
                            aria-label={`Upload image ${index + 1}`}
                          />
                          <svg
                            width="24px"
                            height="24px"
                            viewBox="0 0 1024 1024"
                            className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gray-500"
                          >
                            <path
                              className="rui-jB92v"
                              d="M861.099 667.008v78.080h77.568v77.653h-77.568v77.141h-77.568v-77.184h-77.611v-77.611h77.611v-78.080h77.568zM617.515 124.16l38.784 116.437h165.973l38.827 38.827v271.659l-38.827 38.357-38.741-38.4v-232.832h-183.125l-38.784-116.48h-176.853l-38.784 116.48h-183.083v426.923h426.667l38.784 38.357-38.784 39.253h-465.493l-38.741-38.869v-504.491l38.784-38.827h165.973l38.827-116.437h288.597zM473.216 318.208c106.837 0 193.92 86.955 193.92 194.048 0 106.923-87.040 194.091-193.92 194.091s-193.963-87.168-193.963-194.091c0-107.093 87.083-194.048 193.963-194.048zM473.216 395.861c-64.213 0-116.352 52.181-116.352 116.395 0 64.256 52.139 116.437 116.352 116.437 64.171 0 116.352-52.181 116.352-116.437 0-64.213-52.181-116.437-116.352-116.437z"
                            />
                          </svg>
                          {index === 0 && (
                            <span className="text-[10px] xs:text-xs sm:text-sm text-gray-600 text-center mt-0.5 xs:mt-1">
                              Add Photos
                            </span>
                          )}
                        </label>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Confirm Your Location Section */}
            <div className="mb-3 xs:mb-4 sm:mb-5">
              <h2 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold uppercase p-1 xs:p-2">
                Confirm Your Location
              </h2>
              <div className="p-1 xs:p-2 space-y-3 xs:space-y-4">
                {/* State */}
                <div>
                  <label className="block text-xs xs:text-sm sm:text-base font-medium text-gray-700 mb-1">
                    State *
                  </label>
                  <div className="relative">
                    <select
                      name="state"
                      value={location.state}
                      onChange={handleLocationChange}
                      className="w-full p-1.5 xs:p-2 sm:p-2.5 md:p-3 border border-gray-300 rounded-md text-xs xs:text-sm sm:text-base appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label="Select state"
                    >
                      <option value="">Select State</option>
                      {states.map((state) => (
                        <option key={state.name} value={state.name}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                    {imageError ? (
                      <svg
                        className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 absolute top-2 xs:top-3 right-2 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    ) : (
                      <img
                        src="/images/4a61b31e-53ec-4034-a36f-ec19c689777b.svg"
                        alt="Down Arrow"
                        className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 absolute top-2 xs:top-3 right-2"
                        onError={handleImageError}
                      />
                    )}
                  </div>
                </div>
                {/* City */}
                {location.state && (
                  <div>
                    <label className="block text-xs xs:text-sm sm:text-base font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <div className="relative">
                      <select
                        name="city"
                        value={location.city}
                        onChange={handleLocationChange}
                        className="w-full p-1.5 xs:p-2 sm:p-2.5 md:p-3 border border-gray-300 rounded-md text-xs xs:text-sm sm:text-base appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Select city"
                      >
                        <option value="">Select City</option>
                        {states
                          .find((s) => s.name === location.state)
                          ?.cities.map((city) => (
                            <option key={city.name} value={city.name}>
                              {city.name}
                            </option>
                          ))}
                      </select>
                      {imageError ? (
                        <svg
                          className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 absolute top-2 xs:top-3 right-2 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      ) : (
                        <img
                          src="/images/4a61b31e-53ec-4034-a36f-ec19c689777b.svg"
                          alt="Down Arrow"
                          className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 absolute top-2 xs:top-3 right-2"
                          onError={handleImageError}
                        />
                      )}
                    </div>
                  </div>
                )}
                {/* Neighborhood */}
                {location.city && (
                  <div>
                    <label className="block text-xs xs:text-sm sm:text-base font-medium text-gray-700 mb-1">
                      Neighborhood *
                    </label>
                    <div className="relative">
                      <select
                        name="neighborhood"
                        value={location.neighborhood}
                        onChange={handleLocationChange}
                        className="w-full p-1.5 xs:p-2 sm:p-2.5 md:p-3 border border-gray-300 rounded-md text-xs xs:text-sm sm:text-base appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Select neighborhood"
                      >
                        <option value="">Select Neighborhood</option>
                        {states
                          .find((s) => s.name === location.state)
                          ?.cities.find((c) => c.name === location.city)
                          ?.neighborhoods.map((neighborhood) => (
                            <option key={neighborhood} value={neighborhood}>
                              {neighborhood}
                            </option>
                          ))}
                      </select>
                      {imageError ? (
                        <svg
                          className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 absolute top-2 xs:top-3 right-2 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      ) : (
                        <img
                          src="/images/4a61b31e-53ec-4034-a36f-ec19c689777b.svg"
                          alt="Down Arrow"
                          className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 absolute top-2 xs:top-3 right-2"
                          onError={handleImageError}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Post Your Ad Button */}
            <div className="p-1 xs:p-2">
              <button
                onClick={handlePostAd}
                className="w-full min-h-[40px] xs:min-h-[44px] py-1.5 xs:py-2 sm:py-2.5 md:py-3 bg-blue-600 text-white text-xs xs:text-sm sm:text-base font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Post your ad"
              >
                Post Your Ad
              </button>
            </div>
          </div>
        </div>
      </div>
      <Foot />
    </>
  );
};

export default Mobile;