import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import OAuth from "./OAuth";


const ForgotPassword = ({closeForgotPassword, openModalLogin, openModalRegister}) => {
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
    <>
      <div className="items-center flex justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-4/6 sm:w-[50%] lg:max-w-[25%] my-6 mx-auto ">
            {/*content*/}
            <div className="bg-[#EFC7A2] backdrop-blur-sm border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-between mx-auto p-5 rounded-t">
                    <h3 className="text-3xl font-bold text-[#4B2C1A]">
                        Forgot Password
                    </h3>
                    <button
                        className="p-1 text-black text-sm leading-none font-semibold  absolute right-2 top-0"
                        onClick={closeForgotPassword}>
                        <span className="text-black text-xl block outline-none focus:outline-none">
                        X
                        </span>
                    </button>
                </div>
                    {/*body*/}
                        <form onSubmit={onSubmit} className='flex items-center justify-center flex-col w-11/12 mx-auto'>
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={onChange}
                            placeholder="Email address"
                            className=" border w-full px-4 py-2 text-sm md:text-base text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                          />

                          <div className="flex justify-end whitespace-nowrap text-sm md:text-base w-full my-3">
                    
                            <p>
                              <p
                                className="text-blue-800 hover:text-blue-400 transition duration-200 ease-in-out cursor-pointer"
                                onClick={() => {
                                  openModalLogin()
                                  closeForgotPassword()
                                }}
                              >
                                Login
                              </p>
                            </p>
                          </div>
                          <button
                            className="w-full bg-[#28a3eb] text-white px-7 py-3 text-[10px] md:text-[12px] lg:text-sm font-medium uppercase rounded shadow-md hover:bg-[#3880aa] transition duration-150 ease-in-out hover:shadow-lg active:bg-[#286d96]"
                            type="submit"
                          >
                            Send reset password
                          </button>
                          
                          
                          <p className="my-6">
                              Don't have a account?
                              <span
                                className="text-blue-800 hover:text-blue-400 transition duration-200 ease-in-out ml-1 cursor-pointer"
                                onClick={() => {
                                  openModalRegister()
                                  closeForgotPassword()
                                }}
                              >
                                Register
                              </span>
                            </p>
                        </form>
                </div>
          </div>
    </div>
    </>
  );
}

export default ForgotPassword