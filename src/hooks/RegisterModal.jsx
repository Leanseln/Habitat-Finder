import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification  } from 'firebase/auth';
import { db } from '../firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import OAuth from "../components/OAuth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterModal = ({closeModal}) => {

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
            
            const formDataCopy = {...formData}
            delete formDataCopy.password
            formDataCopy.timestamp = serverTimestamp();

            await setDoc(doc(db, "users", user.uid), formDataCopy)
            
            navigate("/")
            console.log(auth)
        } catch(error) {
            toast.error("Email Already exist");
        }
    }

    return (
    <>
    <div className=" backdrop-blur-none items-center flex justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-4/6 sm:w-[50%] lg:max-w-[25%] my-6 mx-auto ">
            {/*content*/}
            <div className="bg-[#EFC7A2] backdrop-blur-sm border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-between mx-auto p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-bold text-[#4B2C1A]">
                        Register
                    </h3>
                    <button
                        className="p-1 text-black text-sm leading-none font-semibold  absolute right-2 top-0"
                        onClick={() => closeModal(false)}>
                        <span className="text-black text-xl block outline-none focus:outline-none">
                        X
                        </span>
                    </button>
                </div>
                    {/*body*/}
                    <form onSubmit={onSubmit} className="flex items-center justify-center flex-col mx-auto w-11/12">
                        <input 
                        type="name" 
                        id="name"
                        value={name}
                        onChange={onChange}
                        placeholder="Name"
                        className='mb-6 w-full px-4 py-2 text-base text-gray-700 bg-[#FEECDB] focus:outline-orange-800 outline-offset-2 rounded transition ease-in-out'
                        />
                        
                        <input type="email"
                        id="email"
                        value={email}
                        onChange={onChange}
                        placeholder="Email"
                        className='mb-6 w-full px-4 py-2 text-base text-gray-700 bg-[#FEECDB] focus:outline-orange-800 outline-offset-2 rounded transition ease-in-out'
                        />
                        <div className='w-full relative mb-6'>
                            <input type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={onChange}
                            placeholder="Password"
                            className='w-full px-4 py-2 text-base text-gray-700 bg-[#FEECDB] focus:outline-orange-800 outline-offset-2 rounded transition ease-in-out'/>
                            {
                                showPassword ? (
                                <FaEye className="absolute right-3 top-3 text-xl cursor-pointer" onClick={() => setShowPassword((prevState) => !prevState)}/>
                                ) : (
                                <FaEyeSlash className='absolute right-3 top-3 text-xl cursor-pointer' onClick={() => setShowPassword((prevState)=>!prevState)} />
                                )
                            }
                        </div>
                
                        <button className="border-solid w-full bg-[#28a3eb] font-medium text-white px-7 py-3 rounded-md uppercase text-sm" type="submit">Sign Up</button>
                        
                        <div className='my-1'>
                        <p className='font-semibold text-[10px] md:text-[12px] lg:text-sm'>OR</p>
                        </div> 
                        
                        <OAuth />
                        
                    </form>
            </div>
        </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
    )
}

export default RegisterModal