import React from 'react'
import LOGO from '../images/LOGO.png'
import { useNavigate } from 'react-router'

const Footer = () => {
    const navigate = useNavigate(); 

  return (
    <div className='bg-[#ffd7b1] w-full border-t-[1px] border-orange-800 flex justify-between items-center px-5 py-2 fixed bottom-0'>
      <img src={LOGO} alt="" className='py-1  w-[100px]' />
      <div className='flex items-center space-x-10'>
        

        <p className='text-sm sm:text-md text-[#BD5B00] font-semibold'>
          <span className='text-[black] text-base'>© </span>
          <span className='text-[#4B2C1A]'>Habitat Finder</span>
        </p>
      </div>
    </div>
  );
}

export default Footer