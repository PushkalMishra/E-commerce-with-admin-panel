import React from 'react'
import Sidebar from '../components/Sidebar'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import AddProduct from '../components/AddProduct'
import ListProduct from '../components/ListProduct'
import { Outlet } from 'react-router-dom'

const Admin = () => {
  return (
    <div className='lg:flex'>
        <Sidebar/>
        <Outlet/>
        {/* <Routes>
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="listproduct" element={<ListProduct />} />
        </Routes> */}
    </div>
  )
}

export default Admin
