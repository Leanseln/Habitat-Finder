import { FcGoogle } from "react-icons/fc"
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { db } from '../firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import OAuth from "../components/OAuth";


const SignUp = () => {

    const [showPassword, setShowPassword] = useState("false");
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
        <div className="grid place-items-center h-screen">
        <div className="border-solid border-2 w-1/3  flex justify-center flex-col items-center mx-auto pt-8 ">
        <form onSubmit={onSubmit} className="flex items-center justify-center flex-col">
            <input 
            type="name" 
            id="name"
            value={name}
            onChange={onChange}
            placeholder="Name"
            className="border-solid border-2 mb-5 w-72 rounded-md border-gray-600 p-1"
            />
            
            <input type="email"
            id="email"
            value={email}
            onChange={onChange}
            placeholder="Email"
            className="border-solid border-2 mb-5 w-72 rounded-md border-gray-600 p-1"
            />
            <div className='relative mb-6'>
                <input type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
                className="border-solid border-2 w-72 rounded-md border-gray-600 p-1"/>
                {
                    showPassword ? (
                    <FaEye className="absolute right-3 top-2 text-xl cursor-pointer" onClick={() => setShowPassword((prevState) => !prevState)}/>
                    ) : (
                    <FaEyeSlash className='absolute right-3 top-2 text-xl cursor-pointer' onClick={() => setShowPassword((prevState)=>!prevState)} />
                    )
                }
            </div>
    
        <button className="border-solid w-72 bg-[#28a3eb] px-7 py-3 rounded-md" type="submit">Sign Up</button>
        
        <p className="my-3">OR</p>
        
        <OAuth />

        <p className="text-sm">have an account? <b>Login</b></p>
        </form>
        </div> 
        </div> 
        </>
    )
}

export default SignUp