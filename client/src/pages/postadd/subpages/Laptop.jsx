import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Foot from '../../../components/footer/Foot';
import Navpost from '../../../components/navbar/Navpost';
import axios from 'axios';

const Laptop = () => {
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
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

  const LaptopBrands = [
    'Apple',
    'Samsung',
    'Lenovo',
    'Google',
    'Dell',
    'HP',
    'Asus',
    'MSI',
    'ThinkPad',
    'Acer',
    'Toshiba',
    'LG',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      setImages((prev) => {
        const newImages = [...prev];
        newImages[index] = { file, url: URL.createObjectURL(file) };
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

  const validateForm = () => {
    if (!formData.brand) return 'Brand is required';
    if (!formData.adTitle) return 'Ad Title is required';
    if (!formData.description) return 'Description is required';
    if (!formData.price || isNaN(formData.price) || formData.price <= 0) return 'Valid price is required';
    if (!location.state) return 'State is required';
    if (!location.city) return 'City is required';
    if (!location.neighborhood) return 'Neighborhood is required';
    if (!images.some((img) => img !== null)) return 'At least one image is required';
    return '';
  };

  const handlePostAd = async () => {
    setError('');
    setLoading(true);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('brand', formData.brand);
      formDataToSend.append('adTitle', formData.adTitle);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('category', 'laptop');
      formDataToSend.append('email', localStorage.getItem('email') || 'user@example.com');
      formDataToSend.append('location', JSON.stringify(location));

      const uploadedImages = images.filter((img) => img !== null);
      uploadedImages.forEach((image, index) => {
        formDataToSend.append('file', image.file, `image${index}.jpg`);
      });

      console.log('Posting ad:', { ...formData, location, images: uploadedImages.length });

      const response = await axios.post('http://localhost:3000/api/lap', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      console.log('Response:', response.data);
      alert(response.data.message);
      navigate('/');
    } catch (error) {
      console.error('Error posting ad:', error.response || error.message);
      const errorMessage =
        error.response?.status === 404
          ? 'Server endpoint not found. Please check if the backend is running on http://localhost:3000/api/lap'
          : error.response?.data?.error || 'Failed to post ad. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      <Navpost />
      <div className="flex justify-center p-3 xs:p-4 sm:p-6 md:p-8 bg-gray-100 min-h-screen">
        <div className="w-full max-w-screen-lg min-w-[280px]">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          <div className="flex items-center mb-4">
            <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold uppercase mx-auto">
              Post Your Ad
            </h1>
          </div>
          <div className="bg-white rounded-lg shadow-md p-3 xs:p-4 sm:p-6">
            {/* Selected Category Section */}
            <div className="mb-4">
              <h2 className="text-base xs:text-lg sm:text-xl font-bold uppercase p-2">
                Selected Category
              </h2>
              <div className="flex justify-between items-center p-2">
                <span className="text-xs xs:text-sm sm:text-base text-gray-600">Laptops / Laptops</span>
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
            <div className="mb-4">
              <h2 className="text-base xs:text-lg sm:text-xl font-bold uppercase p-2">
                Include Some Details
              </h2>
              <div className="p-2 space-y-4">
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
                      className="w-full p-2 xs:p-2.5 sm:p-3 border border-gray-300 rounded-md text-xs xs:text-sm sm:text-base appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label="Select laptop brand"
                    >
                      <option value="">Select Brand</option>
                      {LaptopBrands.map((brand) => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </select>
                    {imageError ? (
                      <svg
                        className="h-4 w-4 xs:h-5 xs:w-5 absolute top-3 right-2 text-gray-500"
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
                        className="h-4 w-4 xs:h-5 xs:w-5 absolute top-3 right-2"
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
                    className="w-full p-2 xs:p-2.5 sm:p-3 border border-gray-300 rounded-md text-xs xs:text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full p-2 xs:p-2.5 sm:p-3 border border-gray-300 rounded-md text-xs xs:text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    aria-label="Ad description"
                  />
                </div>
              </div>
            </div>
            {/* Set a Price Section */}
            <div className="mb-4">
              <h2 className="text-base xs:text-lg sm:text-xl font-bold uppercase p-2">
                Set a Price
              </h2>
              <div className="p-2 space-y-4">
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
                    className="w-full p-2 xs:p-2.5 sm:p-3 border border-gray-300 rounded-md text-xs xs:text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Price"
                  />
                </div>
              </div>
            </div>
            {/* Upload Photos Section */}
            <div className="mb-4">
              <h2 className="text-base xs:text-lg sm:text-xl font-bold uppercase p-2">
                Upload Photos
              </h2>
              <div className="p-2">
                <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-4 gap-2 xs:gap-3">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      {image ? (
                        <div>
                          <img
                            src={image.url}
                            alt={`Uploaded image ${index + 1}`}
                            className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 object-cover rounded-md"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-gray-200 rounded-full p-1 text-xs"
                            aria-label={`Remove image ${index + 1}`}
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
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
                            className="w-6 h-6 xs:w-8 xs:h-8 sm:w-9 sm:h-9 text-gray-500"
                          >
                            <path
                              d="M861.099 667.008v78.080h77.568v77.653h-77.568v77.141h-77.568v-77.184h-77.611v-77.611h77.611v-78.080h77.568zM617.515 124.16l38.784 116.437h165.973l38.827 38.827v271.659l-38.827 38.357-38.741-38.4v-232.832h-183.125l-38.784-116.48h-176.853l-38.784 116.48h-183.083v426.923h426.667l38.784 38.357-38.784 39.253h-465.493l-38.741-38.869v-504.491l38.784-38.827h165.973l38.827-116.437h288.597zM473.216 318.208c106.837 0 193.92 86.955 193.92 194.048 0 106.923-87.040 194.091-193.92 194.091s-193.963-87.168-193.963-194.091c0-107.093 87.083-194.048 193.963-194.048zM473.216 395.861c-64.213 0-116.352 52.181-116.352 116.395 0 64.256 52.139 116.437 116.352 116.437 64.171 0 116.352-52.181 116.352-116.437 0-64.213-52.181-116.437-116.352-116.437z"
                            />
                          </svg>
                          {index === 0 && (
                            <span className="text-xs xs:text-sm text-gray-600 text-center mt-1">
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
            <div className="mb-4">
              <h2 className="text-base xs:text-lg sm:text-xl font-bold uppercase p-2">
                Confirm Your Location
              </h2>
              <div className="p-2 space-y-4">
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
                      className="w-full p-2 xs:p-2.5 sm:p-3 border border-gray-300 rounded-md text-xs xs:text-sm sm:text-base appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="h-4 w-4 xs:h-5 xs:w-5 absolute top-3 right-2 text-gray-500"
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
                        className="h-4 w-4 xs:h-5 xs:w-5 absolute top-3 right-2"
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
                        className="w-full p-2 xs:p-2.5 sm:p-3 border border-gray-300 rounded-md text-xs xs:text-sm sm:text-base appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                          className="h-4 w-4 xs:h-5 xs:w-5 absolute top-3 right-2 text-gray-500"
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
                          className="h-4 w-4 xs:h-5 xs:w-5 absolute top-3 right-2"
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
                        className="w-full p-2 xs:p-2.5 sm:p-3 border border-gray-300 rounded-md text-xs xs:text-sm sm:text-base appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                          className="h-4 w-4 xs:h-5 xs:w-5 absolute top-3 right-2 text-gray-500"
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
                          className="h-4 w-4 xs:h-5 xs:w-5 absolute top-3 right-2"
                          onError={handleImageError}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Post Your Ad Button */}
            <div className="p-2">
              <button
                onClick={handlePostAd}
                disabled={loading}
                className={`w-full min-h-[44px] py-2 xs:py-2.5 sm:py-3 bg-blue-600 text-white text-xs xs:text-sm sm:text-base font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                aria-label="Post your ad"
              >
                {loading ? 'Posting...' : 'Post Your Ad'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Foot />
    </>
  );
};

export default Laptop;