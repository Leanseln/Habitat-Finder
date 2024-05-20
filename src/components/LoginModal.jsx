import { useNavigate, Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import OAuth from './OAuth'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/userSlice';

const LoginModal = ({closeModalLogin, openModalRegister, openForgotPassword}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [showPassword, setShowPassword] = useState(false);
    
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const {email, password} = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    }

    const Login = async (e) => {
        e.preventDefault()
        if (email === '') {
            toast.error('Please enter your email address');
            return;
        }
        if(password === '') {
            toast.error('Please enter your password');
            return;
        }
        try {
            const auth = getAuth();
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            const {uid, emailVerified, displayName, email:userEmail, photoURL} = userCredentials.user
            if(userCredentials.user) {
                dispatch(setCredentials({uid, emailVerified, displayName, email:userEmail, photoURL}))
                toast.success('Successfully Login')
            }
            
        } catch (error) {
            toast.error("Invalid Credentials");
        } finally {
            closeModalLogin()
        }
    }


    return (
            <>
            <div className="bg-black bg-opacity-40 items-center flex justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative min-w-full sm:max-w-[50%] sm:min-w-[50%] lg:max-w-[30%] lg:min-w-[30%] my-6 mx-auto">
                    {/*content*/}
                    <div className="bg-[#EFC7A2] border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-center justify-between mx-auto py-5">
                        <h3 className="text-3xl font-bold text-[#4B2C1A]">
                            Login
                        </h3>
                        <button
                            className="p-1 text-black text-sm leading-none font-semibold  absolute right-2 top-0"
                            onClick={closeModalLogin}>
                            <span className="text-black text-xl block outline-none focus:outline-none">
                            X
                            </span>
                        </button>
                        </div>
                    {/*body*/}
                    <form onSubmit={Login}className='flex items-center justify-center flex-col w-11/12 mx-auto'>
                            <input 
                            type="email" 
                            id='email' 
                            value={email}  
                            onChange={onChange} 
                            placeholder="Email Address"
                            className='mb-6 w-full px-4 py-2 text-sm md:text-base text-gray-700 bg-[#FEECDB] focus:outline-orange-800 outline-offset-2 rounded transition ease-in-out'/>

                            <div className='relative mb-3 w-full'>
                                <input 
                                type={showPassword ? "text" : "password"} 
                                id='password' 
                                value={password}  
                                onChange={onChange} 
                                placeholder="Password" 
                                className='w-full px-4 py-2 text-sm md:text-base text-gray-700 bg-[#FEECDB] focus:outline-orange-800 outline-offset-2 rounded transition ease-in-out'/>
                                {
                                    showPassword ? (
                                        <FaEye className='absolute right-3 top-3 text-xl cursor-pointer'
                                        onClick={() => setShowPassword((prevState)=>!prevState)}
                                        />
                                    ) : (
                                        <FaEyeSlash className='absolute right-3 top-3 text-xl cursor-pointer'
                                        onClick={() => setShowPassword((prevState)=>!prevState)}
                                        />
                                        
                                    )
                                } 
                            </div>
                            <div className='flex justify-end text-sm w-full mb-3'>
                                <p className='text-[10px] md:text-[12px] lg:text-sm'>
                                    <p className='text-blue-800 hover:text-blue-400 transition duration-200 ease-in-out cursor-pointer' 
                                    onClick={() => {
                                        openForgotPassword()
                                        closeModalLogin()
                                    }}>Forgot Password?</p>
                                </p>
                            </div>
                            <button className='w-full bg-[#28a3eb] text-white px-7 py-3 text-[12px] lg:text-sm font-medium uppercase rounded shadow-md hover:bg-[#3880aa] transition duration-150 ease-in-out hover:shadow-lg active:bg-[#286d96]' type="submit">Login</button>

                            <div className='my-1'>
                                <p className='font-semibold text-[10px] md:text-[12px] lg:text-sm'>OR</p>
                            </div> 
                            <OAuth />
                            <p className='mb-3'>Don't have an account?<span className='text-[#2c70d4] hover:text-[#7bacf5] cursor-pointer'
                            onClick={() => {
                                openModalRegister()
                                closeModalLogin()
                            }}>Register</span></p>
                        </form>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            
            </>
    )
}

export default LoginModal