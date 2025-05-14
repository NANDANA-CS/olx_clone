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
  const [currentImage, setCurrentImage] = useState(0); // For image gallery

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

  // Handle image gallery navigation
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
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-xl text-red-600 font-semibold">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 text-blue-900 hover:underline"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-xl text-gray-600 font-semibold">Product not found</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 text-blue-900 hover:underline"
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
      <div className="flex-1 bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb Navigation */}
          <div className="flex text-sm text-gray-500 mb-4 mt-29">
            <span
              className="cursor-pointer hover:text-blue-900"
              onClick={() => navigate('/')}
            >
              Home
            </span>{' '}
            <svg width="16px" height="16px" viewBox="0 0 1024 1024" data-aut-id="icon" className="" fill-rule="evenodd"><path class="rui-w4DG7" d="M277.333 85.333v60.331l366.336 366.336-366.336 366.336v60.331h60.331l409.003-408.981v-35.307l-409.003-409.045z"></path></svg>{' '}
            <span
              className="cursor-pointer hover:text-blue-900"
              onClick={() => navigate(`/category/${product.category}`)}
            >
              {product.category || 'Category'}
            </span>{' '}
            <svg width="16px" height="16px" viewBox="0 0 1024 1024" data-aut-id="icon" className="" fill-rule="evenodd"><path class="rui-w4DG7" d="M277.333 85.333v60.331l366.336 366.336-366.336 366.336v60.331h60.331l409.003-408.981v-35.307l-409.003-409.045z"></path></svg> <span className="text-gray-700">{product.adtitle}</span>
          </div>

          <div className=" flex-col lg:flex-row gap-8">

            {/* Image Gallery */}
            <div className="w-full  bg-black p-4">
              <div className="relative">
                <img
                  className="w-full h-auto max-h-[500px] object-contain"
                  src={`http://localhost:3000/images/${product.pic[currentImage]}`}
                  alt={product.adtitle}
                />
                {product.pic && product.pic.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
                    >
                      ←
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
                    >
                      →
                    </button>
                    <div className="flex justify-center mt-4 gap-2">
                      {product.pic.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            index === currentImage ? 'bg-blue-900' : 'bg-gray-300'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </>
                )}
              </div>
               
            </div>
             {/* Like Button */}
              <div className="flex items-center gap-4">
                <img
                  src="/images/wlike.jpg"
                  alt="Like"
                  className="h-8 cursor-pointer hover:opacity-75 transition-opacity absolute top-[200px] right-[400px]"
                  onClick={() => alert('Like functionality not implemented')}
                /> 
              </div>

            {/* Product Details */}
            <div className="w-full lg:w-1/2 space-y-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                {product.adtitle}
              </h1>
              <p className="text-2xl font-semibold text-gray-900">₹ {product.price}</p>
              <p className="text-lg text-gray-700">{product.location}</p>
              <div className="border-t border-gray-200 pt-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Details</h2>
                <div className="grid grid-cols-2 gap-4 text-gray-600">
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
              <div className="border-t border-gray-200 pt-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Description</h2>
                <p className="text-base text-gray-600 whitespace-pre-wrap">
                  {product.description || 'No description available'}
                </p>
              </div>

              {/* Seller Information */}
              <div className="border-t border-gray-200 pt-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Seller Information</h2>
                <p className="text-gray-600">
                  <strong>Seller:</strong> {product.sellerName || 'Anonymous'}
                </p>
                <div className="flex gap-4 mt-4">
                  <button
                    className="bg-white text-blue-900 border border-2 font-semibold py-2 px-6 rounded hover:border-5"
                    onClick={() => alert('Chat functionality not implemented')}
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