import { getAuth, sendEmailVerification } from 'firebase/auth';
import { useEffect, useState } from 'react'
import { IoIosMailOpen } from "react-icons/io";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const VerifyPage = () => {

    const auth = getAuth()
    const [user] = useAuthState(auth);
    
    const navigate = useNavigate();

    const handleSubmitVerification = () => {
        sendEmailVerification(user) 
        toast.success('Email has been sent')
    }

    useEffect(() => {
        if (user && !user.emailVerified) {
        sendEmailVerification(user);
        }
        if (user && user.emailVerified) {
            navigate('/')
        }
    }, [user]);


    function verified(){
        return window.location.reload();
    }

    return (
        <div className="max-w-screen-2xl max-h-screen mx-auto px-4 overflow-hidden">

        <div className="flex justify-center h-scree p-5">
            <div className="flex w-full flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center ">
                <h1 className="text-6xl mb-10">Verify Your Email</h1>
                <h2 className="text-2xl ">
                Check your email & click the link to activate your account.
                </h2>
            </div>
            <div className="my-16">
                <IoIosMailOpen size={500} color='#994b03bd' />
            </div>
            <div className="flex flex-col justify-center items-center mb-28">
                <button
                onClick={handleSubmitVerification}
                type="button"
                className="bg-[#994b03bd] rounded-full mb-6 text-slate-50 font-semibold  py-3 text-lg border w-64 hover:bg-[#ffd7b1] hover:text-[#994b03bd] duration-300"
                >
                Send Email
                </button>
                <p>If you're verified already! <button onClick={verified} className='text-blue-600'>Click Here!</button></p>
            </div>
            </div>
        </div>
        </div>
    )
}

export default VerifyPage