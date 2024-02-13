import HabitatLogo from '../images/habitatlogo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from "react";

const Header = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [pageState, setPageState] = useState("Sign in");
    const [pageSignup, setpageSignup] = useState("Sign up");
    
    const auth = getAuth();

    useEffect( ()=> {
        onAuthStateChanged(auth, (user)=> {
            if(user){
                setPageState("Profile");
                setpageSignup("Logout");
            } else {
                setPageState("Sign In");
                setpageSignup("Sign up");
            }

        })
    }, [auth]);

    const pathMatchRoute = (route) => {
        if(route === location.pathname) {
            return true;
        }
    }

    const signin = (e) => {
        e.preventDefault()

        navigate('/signin');
    }

    const signup = (e) => {
        e.preventDefault()

        navigate('/signup');
    }

    const onLogout = () => {
        auth.signOut()
        navigate('/signin')
    }

    
    return (
        <>
            <header className=' flex items-center justify-between container mx-auto pt-2'>
                <div>
                    <img src={HabitatLogo} className='w-40 md:w-[60%] lg:w-[70%]' />
                </div>

                <div>
                    <ul className='flex space-x-10'>
                        <li className={` text-sm font-semibold text-gray-800 border-b-[3px] border-b-transparent cursor-pointer ${location.pathname === "/" ? "text-black border-b-red-500" : ""}`} 
                        onClick={()=>navigate("/")}>Home</li>
                        
                        <li className={` text-sm font-semibold text-gray-800 border-b-[3px] border-b-transparent cursor-pointer ${location.pathname === "/signin" || location.pathname === "/profile" ? "text-black border-b-red-500" : ""}`}
                        onClick={()=>navigate('/profile')}>
                            {pageState}
                        </li>
                    </ul>
                </div>
            </header>
        </>
    )
}

export default Header