import HabitatLogo from '../images/habitatlogo.png';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate();

    const signin = (e) => {
        e.preventDefault()

        navigate('/signin');
    }

    const signup = (e) => {
        e.preventDefault()

        navigate('/signup');
    }
    return (
        <>
            <header className=' flex items-center justify-between container mx-auto p-2'>
                <div>
                    <img src={HabitatLogo} className='w-40 md:w-[80%] lg:w-full' />
                </div>
                <div>
                    <button onClick={signin} className='bg-gray-200 rounded-md py-1 px-2 mr-4 text-sm md:text-lg'>Login</button>
                    <button onClick={signup} className='bg-gray-200 rounded-md py-1 px-2 text-sm md:text-lg'>Sign Up</button>
                </div>
            </header>
        </>
    )
}

export default Header