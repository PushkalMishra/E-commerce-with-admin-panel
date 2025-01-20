import React from 'react'
import logo from '../assets/logo.svg'
import profileImg from '../assets/profile.png'
const Navbar = () => {
  return (
    <nav className='max_padd_container flexBetween bg-white py-2 ring-1 ring-slate-900/5 relative'>
        <div><img src={logo} alt=''/></div>
        <div>Admin Panel</div>
        <div><img src={profileImg} alt='' className='h-12 w-12 rounded-full'/></div>
    </nav>
  )
}

export default Navbar
