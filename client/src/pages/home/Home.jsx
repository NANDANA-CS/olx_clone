import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'

const Home = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 4 
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/getproducts')
        console.log('API Response:', response.data) 
        setProducts(response.data)
        setFilteredProducts(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(products)
    } else {
      const filtered = products.filter((product) =>
        product.adtitle.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredProducts(filtered)
    }
    setCurrentPage(1) 
  }, [searchQuery, products])

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  const handleProductClick = (productId) => {
    if (!productId) {
      console.error('Product ID is undefined')
      return
    }
    navigate(`/preview/${productId}`)
  }


  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' }) 
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

 
  const getPageNumbers = () => {
    const maxPagesToShow = 5
    const pages = []
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    return pages
  }

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className="home mx-4 sm:mx-8 lg:mx-30 my-6 sm:my-10 lg:my-40">
        <h2 className="text-2xl sm:text-3xl mb-6">Fresh recommendations</h2>
        <div className="cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-2 mx-20">
          {currentProducts.map((product, index) => (
            <div
              key={index}
              className="relative w-full sm:w-[250px] md:w-[300px] h-auto min-h-[300px] bg-white border border-gray-200 rounded shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleProductClick(product._id)}
            >
              <div className="">
                <img
                  src="/images/bc65b85d-d193-4d92-a00e-09bfc4299345.svg"
                  alt="Like"
                  className="absolute right-4 top-4 bg-white rounded-full p-2"
                />
              </div>
              <img
                className="rounded-t-lg w-full h-40 sm:h-48 object-contain"
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

        {/* Pagination  */}
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
  )
}

export default Home