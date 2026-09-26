import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RxCross1 } from "react-icons/rx";
import { MdLogout, MdOutlineMenu } from "react-icons/md";
import { jwtDecode } from "jwt-decode";


const Navbar = () => {
  // for mobile screens
  const [isOpen, setIsOpen] = useState(false)
  const [decodeUsername, setDecodeUsername] = useState('');
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  // to check logged in or not !!
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token =localStorage.getItem("token");
      if(token){
        setisLoggedIn(true);
        const decode = jwtDecode(token);
        setDecodeUsername(decode.username);
      }
  }, [])

  //logout function
  const handleLogout = () =>{
    localStorage.removeItem("token");
    sessionStorage.removeItem('sessionid');
    setisLoggedIn(false);
    navigate('/login');
  }


  return (
    <div className=''>
      <nav className='fixed left-0 right-0 z-50 font-Inter flex bg-white text-black justify-between items-center px-6 py-3 shadow-md'>
        <Link to='/' className='text-2xl font-bold hover:opacity-90 transition-opacity'>
          <span className='text-3xl font-semibold'>Code</span>
          <span>verse</span>
          <span className='text-orange font-bold'>&lt;/&gt;</span>
        </Link>

        {/* Desktop Links */}
        <div className='gap-4 md:gap-10 text-md font-semibold hidden sm:flex items-center'>
          <div className='flex gap-2 md:gap-3 px-2 py-1'>
            {isLoggedIn && (
              <Link to='/' className='border px-3 py-1 rounded-full hover:text-orange hover:scale-105 transition-all duration-200'>Home</Link>
            )}
            <Link to='/leaderboard' className='border px-3 py-1 rounded-full hover:text-orange hover:scale-105 transition-all duration-200'>Leaderboard</Link>
            {isLoggedIn && (
              <Link to='/events' className='border px-3 py-1 rounded-full hover:text-orange hover:scale-105 transition-all duration-200'>Events</Link>
            )}
            {isLoggedIn && (
              <Link to={`/profile/${decodeUsername}`} className='border px-3 py-1 rounded-full hover:text-orange hover:scale-105 transition-all duration-200'>Profile</Link>
            )}
          </div>
          {!isLoggedIn ? (
            <Link to='/login' className='bg-orange rounded-full px-4 py-1 text-white hover:scale-105 hover:opacity-90 transition-all duration-200'>Login</Link>
          ) : (
            <button onClick={handleLogout} className='flex items-center gap-2 bg-orange rounded-full px-4 py-1 text-white hover:scale-105 hover:opacity-90 transition-all duration-200 cursor-pointer'>Logout <MdLogout/></button>
          )}
        </div>

        {/* Hamburger Icon for mobile */}
        <div className='sm:hidden'>
          <button onClick={toggleMenu} className='text-black focus:outline-none cursor-pointer'>
            {isOpen ? <RxCross1 size={26} /> : <MdOutlineMenu size={26}/>}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='sm:hidden bg-white text-black px-6 pt-20 pb-6 fixed top-0 left-0 right-0 z-40 shadow-lg border-b border-gray-200'>
          <div className='flex flex-col gap-4 text-base font-semibold'>
            <Link to='/' onClick={toggleMenu} className='hover:text-orange py-1'>Home</Link>
            <Link to='/leaderboard' onClick={toggleMenu} className='hover:text-orange py-1'>Leaderboard</Link>
            {isLoggedIn && (
              <Link to='/events' onClick={toggleMenu} className='hover:text-orange py-1'>Events</Link>
            )}
            {isLoggedIn && decodeUsername && (
              <Link to={`/profile/${decodeUsername}`} onClick={toggleMenu} className='hover:text-orange py-1'>Profile</Link>
            )}
            {!isLoggedIn ? (
              <Link to='/login' onClick={toggleMenu} className='bg-orange text-white px-5 py-2 rounded-full w-max hover:opacity-90 mt-2'>Login</Link>
            ) : (
              <button onClick={() => { toggleMenu(); handleLogout(); }} className='flex items-center gap-2 bg-orange text-white px-5 py-2 rounded-full w-max hover:opacity-90 mt-2 cursor-pointer'>
                Logout <MdLogout />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
