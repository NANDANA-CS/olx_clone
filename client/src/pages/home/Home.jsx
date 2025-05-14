import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'

const Home = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [visibleCount, setVisibleCount] = useState(4)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products')
        setProducts(response.data)
        setFilteredProducts(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(products)
      setVisibleCount(4) 
    } else {
      const filtered = products.filter((product) =>
        product.adtitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered)
      setVisibleCount(4) 
    }
  }, [searchQuery, products])

  const handleSearch = (query) => {
    setSearchQuery(query)
  };

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 4) 
  };

  return (
    <>
      <Navbar onSearch={handleSearch} /> 
      <div className="home mx-4 sm:mx-8 lg:mx-30 my-6 sm:my-10 lg:my-40">
        <h2 className="text-2xl sm:text-3xl mb-6">Fresh recommendations</h2>
        <div className="cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-2 mx-20">
          {filteredProducts.slice(0, visibleCount).map((product, index) => (
            <div
              key={index}
              className="relative w-full sm:w-[250px] md:w-[300px] h-auto min-h-[300px] bg-white border border-gray-200 rounded shadow-sm"
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
                src={`http://localhost:3000/images/${product.pic[0]}`}
                alt={product.title}
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
        {visibleCount < filteredProducts.length && (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleLoadMore}
              className="bg-white text-blue-900 border border-blue-900 text-xl hover:border-7 font-semibold py-2 px-4 rounded"
            >
              Load More
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}

export default Home;