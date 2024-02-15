import LOGO from '../images/LOGO.png';
import LoginModal from '../hooks/LoginModal';
import RegisterModal from '../hooks/RegisterModal';
import { useState } from 'react';


const Header = () => {

    const [showModalLogin, setShowModalLogin] = useState(false);
    const [showModalRegister, setShowModalRegister] = useState(false);

    return (
        <>
            <header className='bg-[#EFC7A2]'>
                <div className='flex items-center justify-between container mx-auto py-2 lg:px-24'>
                <div>
                    <img src={LOGO} className='h-12 hover:scale-105' />
                </div>

                <div>
                    <ul className='flex space-x-10'>
                        <li className='text-sm font-semibold text-gray-800 border-b-[3px] border-b-transparent cursor-pointer hover:scale-105 hover:text-[#BD5B00] transition ease-in-out'
                        onClick={() => setShowModalLogin(true)}>
                            Login
                        </li>

                        <li className='text-sm font-semibold text-gray-800 border-b-[3px] border-b-transparent cursor-pointer hover:scale-105 hover:text-[#BD5B00] transition ease-in-out'
                        onClick={() => setShowModalRegister(true)}>
                            Register
                        </li>
                    </ul>
                </div>
                </div>
            </header>
        {showModalLogin && <LoginModal closeModal={setShowModalLogin} />}
        {showModalRegister && <RegisterModal closeModal={setShowModalRegister}/>}
        </>
    )
}

export default Header