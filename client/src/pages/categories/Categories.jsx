import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

const Categories = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState([]);
  const productsPerPage = 8;
  const navigate = useNavigate();
  const userId = localStorage.getItem('id');

  useEffect(() => {
    const adjustContentPadding = () => {
      const navbar = document.querySelector('nav');
      const categoryContainer = document.querySelector('.category');
      if (navbar && categoryContainer) {
        const navbarHeight = navbar.offsetHeight;
        categoryContainer.style.paddingTop = `${navbarHeight + 16}px`;
      }
    };

    adjustContentPadding();
    window.addEventListener('resize', adjustContentPadding);
    return () => window.removeEventListener('resize', adjustContentPadding);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Send category in lowercase to match backend
        const response = await axios.get(`http://localhost:3000/api/getproducts?category=${categoryName.toLowerCase()}`);
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchWishlist = async () => {
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:3000/api/user/${userId}`);
          const data = response.data.wishlist || [];
          const wishlistIds = data.map((item) => (typeof item === 'string' ? item : item._id));
          setWishlist(wishlistIds);
        } catch (error) {
          console.error('Error fetching wishlist:', error);
        }
      }
    };

    fetchProducts();
    fetchWishlist();
  }, [categoryName, userId]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.adtitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
    setCurrentPage(1);
  }, [searchQuery, products]);

  const wishlistIds = useMemo(() => wishlist.map(String), [wishlist]);

  const handleSearch = (query) => setSearchQuery(query);

  const handleProductClick = (productId) => {
    if (!productId) return;
    navigate(`/preview/${productId}`);
  };

  const handleWishlistClick = async (productId) => {
    if (!userId) {
      alert('Please log in to add items to your wishlist');
      return;
    }

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

      const updatedWishlist = response.data.wishlist.map((item) =>
        typeof item === 'string' ? item : item._id
      );
      setWishlist(updatedWishlist);
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      alert('Failed to update wishlist');
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className="category mx-4 sm:mx-8 lg:mx-32 pt-[120px] sm:pt-[150px] lg:pt-[180px] pb-6 sm:pb-10">
        <h2 className="text-2xl sm:text-3xl mb-6 capitalize">{categoryName} Listings</h2>
        {filteredProducts.length === 0 ? (
          <p className="text-lg text-gray-600">No products found in this category.</p>
        ) : (
          <div className="cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mx-auto max-w-7xl">
            {currentProducts.map((product, index) => (
              <div
                key={index}
                className="relative w-full sm:w-[250px] md:w-[300px] h-auto min-h-[300px] bg-white border border-gray-200 rounded shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleProductClick(product._id)}
              >
                <div>
                  <img
                    src={
                      wishlistIds.includes(String(product._id))
                        ? '/images/heartfill.png'
                        : '/images/bc65b85d-d193-4d92-a00e-09bfc4299345.svg'
                    }
                    alt="Wishlist"
                    className="absolute right-4 top-4 bg-white rounded-full p-2 cursor-pointer size-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWishlistClick(product._id);
                    }}
                  />
                </div>
                <img
                  className="rounded-t-lg w-full h-40 sm:h-48 object-cover"
                  src={`http://localhost:3000/images/${product.pic[0] || 'default.jpg'}`}
                  alt={product.adtitle}
                  onError={(e) => (e.target.src = '/images/fallback.jpg')}
                />
                <div className="p-4 sm:p-5">
                  <h5 className="mb-2 text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
                    ₹ {product.price}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 text-sm sm:text-base">
                    {product.adtitle}
                  </p>
                  <p className="mb-3 font-normal text-gray-700 text-sm sm:text-base">
                    {product.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        {filteredProducts.length > 0 && (
          <div className="flex justify-center items-center mt-8 space-x-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 border border-gray-300 rounded-md text-sm font-medium ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-blue-600 hover:bg-gray-100'
              }`}
            >
              Previous
            </button>
            {getPageNumbers().map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-4 py-2 border border-gray-300 rounded-md text-sm font-medium ${
                  currentPage === pageNumber
                    ? 'bg-blue-900 text-white'
                    : 'bg-white text-blue-600 hover:bg-gray-100'
                }`}
              >
                {pageNumber}
              </button>
            ))}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border border-gray-300 rounded-md text-sm font-medium ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-blue-600 hover:bg-gray-100'
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Categories;