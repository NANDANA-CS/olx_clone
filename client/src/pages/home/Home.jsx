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
         <Navbar/>
        <div className='home mx-30 my-40'>
            <h2 className='text-3xl mb-6'>Fresh recommendations</h2>
            <div className='cards flex flex-wrap gap-5'>
                {products.map((product, index) => (
                    <div key={index} className="relative w-[300px] h-[300px] bg-white border border-gray-200 rounded shadow-sm">
                       <div className=''>
                         <img src="/images/bc65b85d-d193-4d92-a00e-09bfc4299345.svg" alt="" className='absolute left-60 top-4 bg-white rounded-full p-2'/>
                       </div>
                        <img
                            className="rounded-t-lg w-full h-48 object-contain"
                            src={`http://localhost:3000/images/${product.pic[0]}`} 
                            alt={product.title}/>
                        <div className="p-5">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">₹ {product.price}</h5>
                            <p className="mb-3 font-normal text-gray-700">{product.title}</p>
                            <p></p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <Footer/>
        </>
    )
}

export default Home
