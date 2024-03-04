import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import LOGO from '../images/LOGO.png'
import { getAuth} from 'firebase/auth';
import Profile from '../images/profile.png';
import { useSelector } from 'react-redux';

const HomeHeader = () => {

    const navigate = useNavigate();
    const user = useSelector((state) => state.user)

    useEffect(()=>{
        if(user && !user.emailVerified){
            return navigate('/pending')
        }
        if(!user) {
            return navigate('/landingpage')
        }
    }, [user])

    if(!user) {
        return null;
    }

    return (
        <>
        <header className='bg-[#ffd7b1] sticky top-0 z-50'>
            <div className='flex items-center justify-between container mx-auto py-2 lg:px-10'>
                <div className='flex justify-center text-center my-auto'>
                    <img src={LOGO} className='h-14 hover:scale-105' onClick={()=>navigate('/')} />
                </div>

                <div className='flex justify-center text-center items-center'>
                    <ul className='flex space-x-10 justify-center items-center'>
                        <li className='text-lg font-semibold text-gray-800 border-b-[3px] border-b-transparent cursor-pointer hover:scale-105 hover:text-[#BD5B00]'
                        onClick={()=>navigate("/")}>Home</li>
                        
                        <img className='h-12 cursor-pointer hover:scale-105 hover:text-[#BD5B00] rounded-full bg-[#ce6c10] '
                        onClick={()=>navigate("/profile")} src={user.photoURL ?? Profile } alt="" />
                    </ul>
                </div>
                </div>
                <hr className='border-orange-800'/>
        </header>
        
        </>
    )
}

export default HomeHeader