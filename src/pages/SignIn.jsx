import { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';
import Header from '../components/Header';

const SignIn = () => {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const {email, password} = formData;

    const onChange = (e) => {
        setFormData((prevState)=> ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const auth = getAuth();

            const userCredentials = await signInWithEmailAndPassword(auth, email, password);

            if(userCredentials.user) {
                navigate('/')
            }
            console.log(auth)
        } catch (error) {
            toast.error("Invalid Credentials");
        }
    }

    return (
        <>
        <Header />
        <div className="grid place-items-center h-screen">
        <div className='w-[90%] sm:w-[50%] lg:w-1/3 flex justify-center flex-col items-center mx-auto pt-8 shadow-lg'>
                    <form onSubmit={onSubmit} className='flex items-center justify-center flex-col w-3/4'>
                        <input 
                        type="email" 
                        id='email' 
                        value={email}  
                        onChange={onChange} 
                        placeholder="Email Address" 
                        className='mb-6 w-full px-4 py-2 text-sm md:text-base text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out'/>

                        <div className='relative mb-6 w-full'>
                            <input 
                            type={showPassword ? "text" : "password"} 
                            id='password' 
                            value={password}  
                            onChange={onChange} 
                            placeholder="Password" 
                            className='w-full px-4 py-2 text-sm md:text-base text-gray-700 border bg-white border-gray-300 rounded transition ease-in-out'/>
                            {
                                showPassword ? (
                                    <FaEyeSlash className='absolute right-3 top-3 text-xl cursor-pointer'
                                    onClick={() => setShowPassword((prevState)=>!prevState)}
                                    />
                                ) : (
                                    <FaEye className='absolute right-3 top-3 text-xl cursor-pointer'
                                    onClick={() => setShowPassword((prevState)=>!prevState)}
                                    />
                                    
                                )
                            } 
                        </div>
                        <div className='flex justify-between whitespace-nowrap text-sm w-full'>
                            <p className='mb-6 text-[10px] md:text-[12px] lg:text-sm'>Don't have an account
                                <Link to="/signup" className='text-blue-800 hover:text-blue-400  transition duration-200 ease-in-out ml-1'> Register</Link>
                            </p>
                            <p className='text-[10px] md:text-[12px] lg:text-sm'>
                                <Link to="/forgotpassword" className='text-blue-800 hover:text-blue-400 transition duration-200 ease-in-out'>Forgot Password?</Link>
                            </p>
                        </div>
                        <button className='w-full bg-[#28a3eb] text-white px-7 py-3 text-[10px] md:text-[12px] lg:text-sm font-medium uppercase rounded shadow-md hover:bg-[#3880aa] transition duration-150 ease-in-out hover:shadow-lg active:bg-[#286d96]' type="submit">Sign In</button>

                        <div className='my-4'>
                            <p className='font-semibold text-[10px] md:text-[12px] lg:text-sm'>OR</p>
                        </div> 
                        <OAuth />
                    </form>
                </div>
        </div>
        

        </>
    )
}

export default SignIn