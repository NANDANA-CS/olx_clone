import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'

const Home = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/products')
                setProducts(response.data)
            } catch (error) {
                console.error("Error fetching products:", error)
            }
        }

        fetchProducts()
    }, [])

    return (
        <>
            <Navbar />
            <div className='home mx-4 sm:mx-8 lg:mx-30 my-6 sm:my-10 lg:my-40'>
                <h2 className='text-2xl sm:text-3xl mb-6'>Fresh recommendations</h2>
                <div className='cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-2 mx-20'>
                    {products.map((product, index) => (
                        <div key={index} className="relative w-full sm:w-[250px] md:w-[300px] h-auto min-h-[300px] bg-white border border-gray-200 rounded shadow-sm">
                            <div className=''>
                                <img
                                    src="/images/bc65b85d-d193-4d92-a00e-09bfc4299345.svg"
                                    alt="Like"
                                    className='absolute right-4 top-4 bg-white rounded-full p-2'
                                />
                            </div>
                            <img
                                className="rounded-t-lg w-full h-40 sm:h-48 object-contain"
                                src={`http://localhost:3000/images/${product.pic[0]}`}
                                alt={product.title}
                            />
                            <div className="p-4 sm:p-5">
                                <h5 className="mb-2 text-xl sm:text-2xl font-bold tracking-tight text-gray-900">₹ {product.price}</h5>
                                <p className="mb-3 font-normal text-gray-700 text-sm sm:text-base">{product.adtitle}</p>

                                 <p className="mb-3 font-normal text-gray-700 text-sm sm:text-base">{product.location}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home