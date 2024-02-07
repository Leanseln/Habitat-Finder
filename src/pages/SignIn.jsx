import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
    return (
        <>
        <div className="w-1/3 h-2/4 bg-slate-400 flex justify-center items-center mx-auto flex-col py-5">
            <input 
                type="email"
                placeholder="Email"
                className="mb-5"
            />
            <input
                type="password"
                placeholder="Password"
                className="mb-5"
            />

            <p className="mb-5">Forgot Password?</p>
        
        <button className="bg-blue-500">Login</button>

        <p>OR</p>

        <FcGoogle className="text-5xl"/>
        </div>
            

        </>
    )
}

export default SignIn