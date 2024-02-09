import { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';

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
        <div className="grid place-items-center h-screen">
        <div className="w-11/12 md:w-1/2 lg:w-3/12 bg-contain flex justify-center items-center mx-auto flex-col py-5 rounded-2xl border-solid border-2 ">
            <form onSubmit={onSubmit} className='flex justify-center items-center flex-col'>
                <input 
                    type="email"
                    id='email'
                    value={email}
                    onChange={onChange}
                    placeholder="Email"
                    className="mb-4 rounded-md w-72 border-solid border-2 border-gray-600 p-1"
                />
                <input
                    type={showPassword ? "text" : "password"}
                    id='password'
                    value={password}
                    onChange={onChange}
                    placeholder="Password"
                    className="mb-4 w-72 rounded-md border-solid border-2 border-gray-600 p-1"
                />
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
            
            <p className="mb-5 cursor-pointer">
                <Link to="/forgotpassword">Forgot Password?</Link>
            </p>
        
        <button className="bg-[#28a3eb] w-72 rounded-md px-7 py-3 font-medium" type='submit'>Login</button>

        <p>OR</p>

        <OAuth />

        <p>need an account? <b>Sign Up</b></p>
        
        </form>
        </div>
        </div>
        

        </>
    )
}

export default SignIn