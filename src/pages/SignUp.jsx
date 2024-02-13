import { FcGoogle } from "react-icons/fc"
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';
import { db } from '../firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import OAuth from "../components/OAuth";
import Header from "../components/Header";
import { Link } from "react-router-dom";


const SignUp = () => {

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const { name, email, password } = formData;

    const onChange = (e) => {
        setFormData((prevState)=> ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    }

    const onSubmit = async(e) => {
        e.preventDefault()

        try {
            const auth = getAuth();
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            updateProfile(auth.currentUser, {
                displayName: name
            })
            const user = userCredentials.user;

            await sendEmailVerification(user);
            
            const formDataCopy = {...formData}
            delete formDataCopy.password
            formDataCopy.timestamp = serverTimestamp();

            await setDoc(doc(db, "users", user.uid), formDataCopy)
            
            navigate("/")
        } catch(error) {
            console.log("Something went wrong with you")
        }

        
    }

    return (
        
        <>
        <Header />
        <div className="grid place-items-center h-screen">
        <div className="w-[90%] sm:w-[50%] lg:w-1/3 flex justify-center flex-col items-center mx-auto pt-8 shadow-lg">
        <form onSubmit={onSubmit} className="flex items-center justify-center flex-col w-3/4">
            <input 
            type="name" 
            id="name"
            value={name}
            onChange={onChange}
            placeholder="Name"
            className='mb-6 w-full px-4 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out'
            />
            
            <input type="email"
            id="email"
            value={email}
            onChange={onChange}
            placeholder="Email"
            className='mb-6 w-full px-4 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out'
            />
            <div className='w-full relative mb-6'>
                <input type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
                className='w-full px-4 py-2 text-base text-gray-700 border bg-white border-gray-300 rounded transition ease-in-out'/>
                {
                    showPassword ? (
                    <FaEyeSlash className="absolute right-3 top-3 text-xl cursor-pointer" onClick={() => setShowPassword((prevState) => !prevState)}/>
                    ) : (
                    <FaEye className='absolute right-3 top-3 text-xl cursor-pointer' onClick={() => setShowPassword((prevState)=>!prevState)} />
                    )
                }
            </div>
    
        <button className="border-solid w-full bg-[#28a3eb] font-medium text-white px-7 py-3 rounded-md uppercase text-sm" type="submit">Sign Up</button>
        
        <div className='my-4'>
        <p className='font-semibold text-[10px] md:text-[12px] lg:text-sm'>OR</p>
        </div> 
        
        <OAuth />

        <p className="text-sm mb-6">Already have an account? <Link to="/signin" className=" font-bold text-blue-800 hover:text-blue-400">Sign In here</Link></p>
        </form>
        </div> 
        </div> 
        </>
    )
}

export default SignUp