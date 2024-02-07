import { FcGoogle } from "react-icons/fc"

const SignUp = () => {
    return (
        
        <>
        <div className="grid place-items-center h-screen">
        <div className="border-solid border-2 w-1/3  flex justify-center flex-col items-center mx-auto pt-8 ">

        
        <input type="name" 
        placeholder="Name"
        className="border-solid border-2 mb-5 w-80 rounded-md border-gray-600 p-1"
        />
        
        <input type="password"
        placeholder="Password"
        className="border-solid border-2 mb-5 w-80 rounded-md border-gray-600 p-1"
        />
        <input type="password"
        placeholder="Confirm Password"
        className="border-solid border-2 mb-12 w-80 rounded-md border-gray-600 p-1"
        />
        <button className="border-solid w-80 bg-[#28a3eb] p-1 rounded-md mb-5 ">Sign Up</button>
        
        <p className="mb-5">OR</p>
        
        <FcGoogle className="mb-4 text-5xl "/>

        <p className="text-sm">have an account? <b>Login</b></p>
        
        
        </div> </div> 
        </>
    )
}

export default SignUp