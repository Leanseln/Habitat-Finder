import React from 'react'
import { useNavigate } from 'react-router'
import LOGO from '../images/LOGO.png'

const HomeHeader = () => {

    const navigate = useNavigate();

    return (
        <>
        <header className='bg-[#ffd7b1]'>
            <div className='flex items-center justify-between container mx-auto py-2 lg:px-10'>
                <div className='flex justify-center text-center my-auto'>
                    <img src={LOGO} className='h-14 hover:scale-105' onClick={()=>navigate('/')} />
                </div>

                <div className='flex justify-center text-center'>
                    <ul className='flex space-x-10'>
                        <li className='text-md font-semibold text-gray-800 border-b-[3px] border-b-transparent cursor-pointer hover:scale-105 hover:text-[#BD5B00]'
                        onClick={()=>navigate("/")}>Home</li>
                        
                        <li className='text-md font-semibold text-gray-800 border-b-[3px] border-b-transparent cursor-pointer hover:scale-105 hover:text-[#BD5B00]'
                        onClick={()=>navigate("/profile")}>
                            Profile
                        </li>
                    </ul>
                </div>
                </div>
        </header>
        <hr className='border-orange-800'/>
        </>
    )
}

export default HomeHeader