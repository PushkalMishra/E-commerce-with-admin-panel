import React from 'react'
import {Link} from "react-router-dom"
import addProduct from "../assets/addproduct.png"
import listProduct from '../assets/productlist.png'
const Sidebar = () => {
  return (
    <div className='py-7 flex flex-col justify-center gap-x-1 gap-y-5 bg-white sm:gap-x-4 sm:w-full lg:max-w-6xl lg:h-screen lg:justify-start lg:pl-6 pt-20 mt-10 '>
        <Link to={'addproduct'}><button className='flexCenter gap-2 rounded-md bg-primary h-12 w-40 xs:w-44 medium-16 '><img src={addProduct} alt='' height={44} width={44}/><span>Add Product</span></button></Link>
        <Link to={'listproduct'}><button className='flexCenter gap-2 rounded-md bg-primary h-12 w-40 xs:w-44 medium-16 '><img src={listProduct} alt='' height={44} width={44}/><span>Product List</span></button></Link>
    </div>
  )
} 

export default Sidebar
