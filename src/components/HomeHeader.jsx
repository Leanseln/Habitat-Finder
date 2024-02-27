import React from 'react'
import { useNavigate } from 'react-router'
import LOGO from '../images/LOGO.png'
import { getAuth } from 'firebase/auth';
import Profile from '../images/profile.png';

const HomeHeader = () => {

    const navigate = useNavigate();
    const auth = getAuth();

    return (
        <>
        <header className='bg-[#ffd7b1] sticky top-0'>
            <div className='flex items-center justify-between container mx-auto py-2 lg:px-10'>
                <div className='flex justify-center text-center my-auto'>
                    <img src={LOGO} className='h-14 hover:scale-105' onClick={()=>navigate('/')} />
                </div>

                <div className='flex justify-center text-center items-center'>
                    <ul className='flex space-x-10 justify-center items-center'>
                        <li className='text-lg font-semibold text-gray-800 border-b-[3px] border-b-transparent cursor-pointer hover:scale-105 hover:text-[#BD5B00]'
                        onClick={()=>navigate("/")}>Home</li>
                        
                        <img className='h-12 cursor-pointer hover:scale-105 hover:text-[#BD5B00] rounded-full bg-[#ce6c10] '
                        onClick={()=>navigate("/profile")} src={auth.currentUser.photoURL ?? Profile } alt="" />
                            
                    </ul>
                </div>
                </div>
        </header>
        <hr className='border-orange-800'/>
        </>
    )
}

export default HomeHeader