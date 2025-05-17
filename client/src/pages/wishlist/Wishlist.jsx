import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'

const Wishlist = () => {
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [filteredWishlistProducts, setFilteredWishlistProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const userId = localStorage.getItem('id')
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      try {
        const userRes = await axios.get(`http://localhost:3000/api/user/${userId}`)
        const wishlist = userRes.data.wishlist || [];

        const wishlistIds = wishlist.map((item) =>
          typeof item === 'string' ? item : item._id
        );

        const productRes = await axios.get('http://localhost:3000/api/getproducts');
        const allProducts = productRes.data;

        const filtered = allProducts
          .filter((product) => wishlistIds.includes(String(product._id)))
          .sort((a, b) => {
            return wishlistIds.indexOf(String(b._id)) - wishlistIds.indexOf(String(a._id));
          });

        setWishlistProducts(filtered)
        setFilteredWishlistProducts(filtered)
      } catch (error) {
        console.error('Error fetching wishlist products:', error)
      }
    }

    if (userId) {
      fetchWishlistProducts();
    }
  }, [userId])

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredWishlistProducts(wishlistProducts);
    } else {
      const filtered = wishlistProducts.filter((product) =>
        product.adtitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredWishlistProducts(filtered);
    }
  }, [searchQuery, wishlistProducts]);

  const handleProductClick = (productId) => {
    navigate(`/preview/${productId}`);
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/wishlist',
        { userId, productId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      const updatedWishlistIds = response.data.wishlist.map((item) =>
        typeof item === 'string' ? item : item._id
      );

      setWishlistProducts((prev) =>
        prev.filter((product) => updatedWishlistIds.includes(product._id))
      );
      setFilteredWishlistProducts((prev) =>
        prev.filter((product) => updatedWishlistIds.includes(product._id))
      );
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      alert('Failed to update wishlist');
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className="home mx-4 sm:mx-8 lg:mx-32 pt-[240px] pb-6 sm:pb-10 mb-25">
        <h2 className="text-2xl sm:text-3xl mb-6 bg-white">WISHLIST</h2>

        {filteredWishlistProducts.length === 0 ? (
          <div className="text-center">
            <h1 className="text-gray-600 text-5xl mb-4">
              {searchQuery
                ? 'No items match your search'
                : "You haven't liked any ads yet!"}
            </h1>
            <p className="text-gray-600 text-2xl mb-4">
              Like ads and share them with the world
            </p>
            <button
              className="bg-white text-blue-900 border border-blue-900 font-semibold py-1 xs:py-1.5 sm:py-2 px-4 xs:px-5 sm:px-6 rounded hover:border-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => navigate('/')}
            >
              DISCOVER
            </button>
          </div>
        ) : (
          <div className="cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mx-auto max-w-7xl">
            {filteredWishlistProducts.map((product, index) => (
              <div
                key={index}
                className="relative w-full sm:w-[250px] md:w-[300px] h-auto min-h-[300px] bg-white border border-gray-200 rounded shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleProductClick(product._id)}
              >
                <div>
                  <img
                    src="/images/heartfill.png"
                    alt="Remove from Wishlist"
                    className="absolute right-4 top-4 bg-white rounded-full p-2 cursor-pointer size-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFromWishlist(product._id);
                    }}
                  />
                </div>
                <img
                  className="rounded-t-lg w-full h-40 sm:h-48 object-contain"
                  src={`http://localhost:3000/images/${product.pic[0] || 'default.jpg'}`}
                  alt={product.adtitle}
                  onError={(e) => (e.target.src = '/images/fallback.jpg')}
                />
                <div className="p-4 sm:p-5">
                  <h5 className="mb-2 text-xl sm:text-4xl font-bold tracking-tight text-gray-900">
                    ₹ {product.price}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 text-sm sm:text-2xl">
                    {product.adtitle}
                  </p>
                  <p className="mb-3 font-normal text-gray-700 text-sm sm:text-md">
                    {product.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}

export default Wishlist