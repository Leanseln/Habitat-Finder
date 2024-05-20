import { useDispatch, useSelector } from 'react-redux';
import LOGO from '../images/LOGO.png';
import ForgotPassword from './ForgotPassword';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getAuth } from 'firebase/auth';
import { setCredentials, verify } from '../store/userSlice';

const Header = () => {

    const [showModalLogin, setShowModalLogin] = useState(false);
    const [showModalRegister, setShowModalRegister] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const auth = getAuth();

    useEffect(()=> {
        if(user) {
            navigate('/')
            console.log(user)
        }
    }, [user])

    return (
        <>
            <header className='bg-[#ffd7b1] sticky top-0 z-10'>
                <div className='flex items-center justify-between container mx-auto py-2 lg:px-24'>
                    <div>
                        <img src={LOGO} className='h-12 hover:scale-105' />
                    </div>
                    <div>
                        <ul className=' flex space-x-10'>
                            <li className='mr-2 text-sm lg:text-lg font-semibold bg-[#994b03bd] text-white px-4 py-1 rounded-sm cursor-pointer hover:scale-105 transition duration-100 ease-in-out'
                            onClick={() => setShowModalLogin(true)}>
                                Login
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </header>
        {showModalLogin && <LoginModal closeModalLogin={() => setShowModalLogin(false)} openModalRegister={() => setShowModalRegister(true)} openForgotPassword={() => setShowForgotPassword(true)} />}
        {showModalRegister && <RegisterModal closeModalRegister={() => setShowModalRegister(false)} openModalLogin={() => setShowModalLogin(true)} />}
        {showForgotPassword && <ForgotPassword closeForgotPassword={() => setShowForgotPassword(false)} openModalRegister={() => setShowModalRegister(true)} openModalLogin={() => setShowModalLogin(true)} />}
        </>
    )
}

export default Header