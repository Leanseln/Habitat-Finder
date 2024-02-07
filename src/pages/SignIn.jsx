import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
    return (
        <>
        <div className="grid place-items-center h-screen">
        <div className="w-1/3 h-96 bg-contain flex justify-center items-center mx-auto flex-col py-5 rounded-2xl border-solid border-2 ">
            <input 
                type="email"
                placeholder="Email"
                className="mb-4 rounded-md w-80 border-solid border-2 border-gray-600 p-1"
            />
            <input
                type="password"
                placeholder="Password"
                className="mb-4 w-80 rounded-md border-solid border-2 border-gray-600 p-1"
            />

            <p className="mb-5"><b>Forgot Password?</b></p>
        
        <button className="bg-[#28a3eb] w-80 rounded-md">Login</button>

        <p>OR</p>

        <FcGoogle className="text-5xl m-8"/>

        <p>need an account? <b>Sign Up</b></p>
        </div></div>
            

        </>
    )
}

export default SignIn