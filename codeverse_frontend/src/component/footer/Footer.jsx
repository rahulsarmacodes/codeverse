import React from 'react'

const Footer = () => {
  return (
    <div className='w-full mt-auto flex flex-col gap-3 p-5 text-gray-500 font-Inter whitespace-none'>
      <div className='flex justify-center items-center sm:gap-8 flex-col sm:flex-row gap-1'>
            <a href="" className='hover:text-black hover:cursor-pointer  hover:scale-110 transition-transform duration-300'>FAQ</a>
            <a href="" className='hover:text-black hover:cursor-pointer  hover:scale-110 transition-transform duration-300'>Support</a>
            <a href="" className='hover:text-black hover:cursor-pointer  hover:scale-110 transition-transform duration-300'>Privacy</a>
            <a href="" className='hover:text-black hover:cursor-pointer  hover:scale-110 transition-transform duration-300'>Timeline</a>
            <a href="" className='hover:text-black hover:cursor-pointer  hover:scale-110 transition-transform duration-300'>Terms</a>
      </div>

      <div className='flex justify-center items-center gap-5 text-4xl text-gray-700'>
            <a href="https://www.linkedin.com/in/codeverse-webspace"><i className=" text-xl hover:text-black fa-brands fa-linkedin hover:cursor-pointer hover:scale-110 transition-transform duration-300"></i></a>
            <a href="https://x.com/CodeVerseWS"><i className=" text-xl hover:text-black fa-brands fa-x-twitter hover:cursor-pointer hover:scale-110 transition-transform duration-300"></i></a>
            <a href="https://www.instagram.com/codeverse.webspace"><i className=" text-xl hover:text-black fa-brands fa-instagram hover:cursor-pointer hover:scale-110 transition-transform duration-300"></i></a>
            <a href="https://www.facebook.com/share/1DvVrAKsM5/"><i className=" text-xl hover:text-black fa-brands fa-facebook hover:cursor-pointer hover:scale-110 transition-transform duration-300"></i></a>
      </div>

      <div className='flex justify-center items-center '>
            <p>© 2025 CodeVerse, Inc. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer
