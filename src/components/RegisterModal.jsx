import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification  } from 'firebase/auth';
import { db } from '../firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import OAuth from "./OAuth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/userSlice";

const RegisterModal = ({closeModalRegister, openModalLogin}) => {

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        photo: "",
    })

    const { name, email, password, photo } = formData;

    const onChange = (e) => {
        setFormData((prevState)=> ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    }

    const onSubmit = async(e) => {
        e.preventDefault()

        // Perform basic validation for empty fields (optional)
        if (name === '') {
            toast.error('Please enter your name');
            return;
        }
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
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

            await updateProfile(userCredentials.user, {
                displayName: name,
            })
            const {uid, emailVerified, displayName, email:userEmail, photoURL} = userCredentials.user
            dispatch(setCredentials({uid, emailVerified, displayName, email:userEmail, photoURL}))
            const formDataCopy = {...formData}
            delete formDataCopy.password
            formDataCopy.timestamp = serverTimestamp();

            await setDoc(doc(db, "users", userCredentials.user.uid), formDataCopy)
            sendEmailVerification(userCredentials.user)
            navigate('/pending');

        } catch(error) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    toast.error(`Email address ${email} already in use.`);
                    break;
                    case 'auth/invalid-email':
                    toast.error(`Email address ${email} is invalid.`);
                    break;
                    case 'auth/operation-not-allowed':
                    toast.error(`Error during sign up.`);
                    break;
                    case 'auth/weak-password':
                    toast.error('Password is not strong enough.');
                    break;
                    default:
                    toast.error(error.message);
                    break;
                }
        }
    }

    return (
    <>
    <div className="bg-black bg-opacity-40 items-center flex justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative  min-w-full sm:max-w-[50%] sm:min-w-[50%] lg:max-w-[30%] lg:min-w-[30%] my-6 mx-auto">
            {/*content*/}
            <div className="bg-[#EFC7A2] border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-between mx-auto p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-bold text-[#4B2C1A]">
                        Register
                    </h3>
                    <button
                        className="p-1 text-black text-sm leading-none font-semibold  absolute right-2 top-0"
                        onClick={closeModalRegister}>
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
                
                        <button className="border-solid w-full bg-[#28a3eb] font-medium text-white px-7 py-3 rounded-md uppercase text-sm" type="submit">Register</button>
                        
                        <div className='my-1'>
                        <p className='font-semibold text-[10px] md:text-[12px] lg:text-sm'>OR</p>
                        </div> 
                        <OAuth />
                        <p className='mb-3'>Already have an account.
                        <span 
                        className='text-[#2c70d4] hover:text-[#7bacf5] cursor-pointer'
                        onClick={()=> {
                            openModalLogin()
                            closeModalRegister()
                        }}>Login</span></p>
                    </form>
                    
            </div>
        </div>
    </div>
    </>
    )
}

export default RegisterModal