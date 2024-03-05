import React from 'react'
import LOGO from '../images/LOGO.png'

const Footer = () => {
    return (
        <div className='bg-[#ffd7b1] w-full border-t-[1px] border-orange-800 flex justify-between items-center px-5 fixed bottom-0'>
            <img src={LOGO} alt="" className='py-5 w-[120px] sm:w-[200px]' />
            <p className=' text-sm sm:text-xl text-[#BD5B00] font-semibold'><span className='text-[black]text-base '>©</span><span className='text-[#4B2C1A]'>Habitat</span>Finder</p>
        </div>
    )
}

export default Footer