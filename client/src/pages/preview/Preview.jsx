import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

const Preview = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const adjustContentPadding = () => {
      const navbar = document.querySelector('nav');
      const contentContainer = document.querySelector('.preview-content');
      if (navbar && contentContainer) {
        const navbarHeight = navbar.offsetHeight;
        console.log('Navbar Height:', navbarHeight); 
        contentContainer.style.paddingTop = `${navbarHeight + 16}px`; 
      } else {
        console.log('Navbar or Content container not found');
      }
    };

    adjustContentPadding();
    window.addEventListener('resize', adjustContentPadding);

    return () => window.removeEventListener('resize', adjustContentPadding);
  }, []);

  useEffect(() => {
    console.log('Product ID from params:', productId);
    const fetchProduct = async () => {
      if (!productId) {
        setError('Invalid product ID');
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`http://localhost:3000/api/products/${productId}`);
        console.log('Fetched product:', response.data);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to load product details');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleNextImage = () => {
    if (product && product.pic) {
      setCurrentImage((prev) => (prev + 1) % product.pic.length);
    }
  };

  const handlePrevImage = () => {
    if (product && product.pic) {
      setCurrentImage((prev) => (prev - 1 + product.pic.length) % product.pic.length);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 xs:h-14 sm:h-16 w-12 xs:w-14 sm:w-16 border-t-4 border-blue-900"></div>
        <p className="mt-2 text-sm xs:text-base sm:text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-4 xs:p-6 sm:p-8 rounded-lg shadow-lg text-center">
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-red-600 font-semibold">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-3 xs:mt-4 text-xs xs:text-sm sm:text-base text-blue-900 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Back to home"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-4 xs:p-6 sm:p-8 rounded-lg shadow-lg text-center">
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 font-semibold">Product not found</p>
          <button
            onClick={() => navigate('/')}
            className="mt-3 xs:mt-4 text-xs xs:text-sm sm:text-base text-blue-900 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Back to home"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex-1 bg-gray-100 min-h-screen preview-content pt-[120px] xs:pt-[140px] sm:pt-[160px] lg:pt-[180px] pb-4 xs:pb-6 sm:pb-8">
        <div className="max-w-7xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center text-xs xs:text-sm sm:text-base text-gray-500 mb-3 xs:mb-4 sm:mb-5">
            <span
              className="cursor-pointer hover:text-blue-900 truncate"
              onClick={() => navigate('/')}
              aria-label="Navigate to home"
            >
              Home
            </span>
            <svg
              width="12px"
              height="12px"
              viewBox="0 0 1024 1024"
              className="mx-1 xs:mx-2 w-3 xs:w-4 sm:w-5 h-3 xs:h-4 sm:h-5"
              fillRule="evenodd"
            >
              <path className="rui-w4DG7" d="M277.333 85.333v60.331l366.336 366.336-366.336 366.336v60.331h60.331l409.003-408.981v-35.307l-409.003-409.045z" />
            </svg>
            <span
              className="cursor-pointer hover:text-blue-900 truncate"
              onClick={() => navigate(`/category/${product.category}`)}
              aria-label={`Navigate to ${product.category} category`}
            >
              {product.category || 'Category'}
            </span>
            <svg
              width="12px"
              height="12px"
              viewBox="0 0 1024 1024"
              className="mx-1 xs:mx-2 w-3 xs:w-4 sm:w-5 h-3 xs:h-4 sm:h-5"
              fillRule="evenodd"
            >
              <path className="rui-w4DG7" d="M277.333 85.333v60.331l366.336 366.336-366.336 366.336v60.331h60.331l409.003-408.981v-35.307l-409.003-409.045z" />
            </svg>
            <span className="text-gray-700 truncate">{product.adtitle}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 xs:gap-6 sm:gap-8">
            {/* Image Gallery */}
            <div className="w-full sm:w-1/2 bg-white p-2 xs:p-3 sm:p-4 rounded-lg shadow-md relative">
              <div className="relative">
                <img
                  className="w-full h-auto max-h-[300px] xs:max-h-[400px] sm:max-h-[500px] object-contain"
                  src={`http://localhost:3000/images/${product.pic[currentImage]}`}
                  alt={product.adtitle}
                />
                {product.pic && product.pic.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-1 xs:left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-1 xs:p-2 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label="Previous image"
                    >
                      ←
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-1 xs:right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-1 xs:p-2 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label="Next image"
                    >
                      →
                    </button>
                    <div className="flex justify-center mt-2 xs:mt-3 sm:mt-4 gap-1 xs:gap-2">
                      {product.pic.map((_, index) => (
                        <div
                          key={index}
                          className={`w-1.5 xs:w-2 sm:w-2.5 h-1.5 xs:h-2 sm:h-2.5 rounded-full ${
                            index === currentImage ? 'bg-blue-900' : 'bg-gray-300'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </>
                )}
              </div>
              {/* Like Button */}
              <div className="absolute top-2 xs:top-3 sm:top-4 right-2 xs:right-3 sm:right-4">
                <img
                  src="/images/wlike.jpg"
                  alt="Like"
                  className="h-6 xs:h-7 sm:h-8 cursor-pointer hover:opacity-75 transition-opacity"
                  onClick={() => alert('Like functionality not implemented')}
                  aria-label="Like product"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="w-full sm:w-1/2 space-y-3 xs:space-y-4 sm:space-y-6">
              <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                {product.adtitle}
              </h1>
              <p className="text-lg xs:text-xl sm:text-2xl font-semibold text-gray-900">₹ {product.price}</p>
              <p className="text-sm xs:text-base sm:text-lg text-gray-700">{product.location}</p>
              <div className="border-t border-gray-200 pt-3 xs:pt-4 sm:pt-5">
                <h2 className="text-base xs:text-lg sm:text-xl font-semibold text-gray-800 mb-1 xs:mb-2">Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 xs:gap-3 sm:gap-4 text-gray-600 text-sm xs:text-base">
                  <div>
                    <p>
                      <strong>Category:</strong> {product.category || 'Not specified'}
                    </p>
                    <p>
                      <strong>Condition:</strong> {product.condition || 'Used'}
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Posted:</strong>{' '}
                      {new Date(product.createdAt).toLocaleDateString() || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-3 xs:pt-4 sm:pt-5">
                <h2 className="text-base xs:text-lg sm:text-xl font-semibold text-gray-800 mb-1 xs:mb-2">Description</h2>
                <p className="text-sm xs:text-base sm:text-base text-gray-600 whitespace-pre-wrap">
                  {product.description || 'No description available'}
                </p>
              </div>

              {/* Seller Information */}
              <div className="border-t border-gray-200 pt-3 xs:pt-4 sm:pt-5">
                <h2 className="text-base xs:text-lg sm:text-xl font-semibold text-gray-800 mb-1 xs:mb-2">Seller Information</h2>
                <p className="text-sm xs:text-base sm:text-base text-gray-600">
                  <strong>Seller:</strong> {product.sellerName || 'Anonymous'}
                </p>
                <div className="flex gap-2 xs:gap-3 sm:gap-4 mt-3 xs:mt-4">
                  <button
                    className="bg-white text-blue-900 border border-blue-900 font-semibold py-1 xs:py-1.5 sm:py-2 px-4 xs:px-5 sm:px-6 rounded hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => alert('Chat functionality not implemented')}
                    aria-label="Chat with seller"
                  >
                    Chat with Seller
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Preview;