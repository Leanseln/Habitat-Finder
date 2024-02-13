import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";


export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  function onChange(e) {
    setEmail(e.target.value);
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was sent");
    } catch (error) {
      toast.error("Could not send reset password");
    }
  }
  
  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Forgot Password</h1>
      <div className="grid place-items-center h-screen">
        <div className="w-[90%] sm:w-[50%] lg:w-1/3 flex justify-center flex-col items-center mx-auto pt-8 shadow-lg">
          <form onSubmit={onSubmit} className='flex items-center justify-center flex-col w-3/4'>
            <input
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Email address"
              className="mb-6 border w-full px-4 py-2 text-sm md:text-base text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
            />

            <div className="flex justify-between whitespace-nowrap text-sm md:text-base w-full">
              <p className="mb-6">
                Don't have a account?
                <Link
                  to="/signup"
                  className="text-blue-800 hover:text-blue-400 transition duration-200 ease-in-out ml-1"
                >
                  Register
                </Link>
              </p>
              <p>
                <Link
                  to="/signin"
                  className="text-blue-800 hover:text-blue-400 transition duration-200 ease-in-out"
                >
                  Sign in
                </Link>
              </p>
            </div>
            <button
              className="w-full bg-[#28a3eb] text-white px-7 py-3 text-[10px] md:text-[12px] lg:text-sm font-medium uppercase rounded shadow-md hover:bg-[#3880aa] transition duration-150 ease-in-out hover:shadow-lg active:bg-[#286d96]"
              type="submit"
            >
              Send reset password
            </button>
            <div className="my-4">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
}