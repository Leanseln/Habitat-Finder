import React from 'react'
import LOGO from '../images/LOGO.png'
import { useNavigate } from 'react-router'

const Footer = () => {
    const navigate = useNavigate(); 

  return (
    <div className='bg-[#ffd7b1] w-full border-t-[1px] border-orange-800 flex justify-between items-center px-5 fixed bottom-0'>
      <img src={LOGO} alt="" className='py-1  w-[120px] sm:w-[200px]' />
      <div className='flex items-center space-x-10'>
        
        <button className='text-m font-semibold text-gray-800 border-b-[3px] border-b-transparent cursor-pointer hover:scale-105 hover:text-[#BD5B00]'
          onClick={() => navigate('/about')}>About</button>

        <button className='text-m font-semibold text-gray-800 border-b-[3px] border-b-transparent cursor-pointer hover:scale-105 hover:text-[#BD5B00]'
          onClick={() => navigate('/terms')}>Terms And Conditions</button>

        <p className='text-sm sm:text-xl text-[#BD5B00] font-semibold'>
          <span className='text-[black] text-base'>©</span>
          <span className='text-[#4B2C1A]'>Habitat Finder</span>
        </p>
      </div>
    </div>
  );
}

export default Footer