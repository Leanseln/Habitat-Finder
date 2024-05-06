import LandingPage1 from "../pages/imgs/landingpage.jpeg"
import LandingPage2 from "../pages/imgs/landingpage1.jpg"
import h5 from "../pages/imgs/h5.jpg"
import h6 from "../pages/imgs/h6.jpg"
import h3 from "../pages/imgs/h3.jpg"
import Header from "../components/Header"
import LoginModal from "../components/LoginModal"
import RegisterModal from "../components/RegisterModal"
import ForgotPassword from "../components/ForgotPassword"
import { useEffect, useState } from "react"
import { CgArrowLongRight } from "react-icons/cg";
import Footer from "../components/Footer"


const LandingPage = () => {

    const [showModalLogin, setShowModalLogin] = useState(false);
    const [showModalRegister, setShowModalRegister] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    return (

        <>
        <Header />
            <div className="w-full h-screen flex-grow bg-cover bg-center bg-no-blur flex  overflow-x-auto"
                    style={{ backgroundImage: `url(${LandingPage1})` }}>
                <div className="w-full md:pr-8 md:pl-4 sm:items-center text-center  ml-16 md:mr-5 s:mr-16 mt-6">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-2 lg:mb-24 text-[#994b03bd] text-center font-monteserrat">Looking for a House?</h1>
                    <div className="w-full lg:w-1/2 mx-auto">

                    
                    <p className="text-[14px] sm:text-[16px] md:text-[18px] w-full lg:text-xl text-[#744c38] mb-10 lg:mb-16 text-center items-center  font-monteserrat">Set off on an adventure to explore the allure of renting, where a world of exquisite and comfortable houses awaits you at every corner, beckoning you to make priceless memories in settings that beckon tales of coziness and warmth.</p></div>
                    
                    <div className="flex justify-center">
                    <button className="bg-[#CBB89D] border text-sm md:text-base border-[#412F26] hover:bg-[#412F26] hover:text-white font-semibold py-1 md:py-2 px-4 rounded mt-4 lg:mt-0 flex justify-center items-center"
                    onClick={() => setShowModalLogin(true)}
                    >Let's find a house for you!<CgArrowLongRight size={30} className="ml-2 lg:ml-5"/></button></div>
                </div>
            </div>

    <div className="min-h-screen flex items-center justify-center">
    <div
        className="w-screen h-screen bg-cover bg-center bg-no-blur mx-auto flex justify-center"
        style={{ backgroundImage: `url(${LandingPage2})`   }} >
            <div className="lg:w-5/6 mt-10">
                <div className="mb-16">
                    <h1 className="text-xl font-bold mb-5 lg:text-7xl text-[#994b03bd]">Real Community</h1>
                    <h1 className="text-xl font-bold mb-5 lg:text-7xl text-[#994b03bd]">Real Connections</h1>
                </div>
                
                <p className="text-sm lg:text-2xl text-[#412F26] lg:w-[65%] mb-4 lg:mb-0 sm:pl-3 sm:pr-5 mt-0">
                A vital way for people to obtain a home that meets their needs and allows them flexibility and accessibility without the commitment of homeownership is through renting. Whether it's a large home tucked away in the suburbs or a quaint apartment in the middle of the city, rentals act as a link to help single people and families alike discover a suitable and pleasant place to live. Renting provides the flexibility to adjust to changing lifestyles while guaranteeing a secure and friendly home for everyone in a society where mobility and shifting circumstances are the norm.
                </p>
            </div>
    </div>
    </div>

    <div className="flex flex-col items-center justify-center bg-[#C3C3C3] py-24">

        <div className="mt-8">
            <h3 className="text-4xl font-bold text-white">What are you looking for?</h3>
        </div>

            <div className="container mx-auto mt-5">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    <div className="bg-white overflow-hidden shadow-lg w-300 md:w-400  lg:w-400">
                    <img src={h5} alt="Placeholder" className="w-full h-48 object-cover object-center hover:scale-105" />
                    <div className="px-2 pt-4 pb-2">
                    <h2 className="text-xl font-semibold ">Manila</h2>
                    <p>
                    Manila, known as the “Pearl of the Orient”, is the nation’s capital city. This bustling historic city is full of things to see and do — including museums, parks, theaters, shopping malls and a plethora of restaurants to choose from.
                    </p>
                    </div>
                </div>
                    <div className="bg-white overflow-hidden shadow-lg w-300 md:w-400  lg:w-400">
                    <img src={h6} alt="Placeholder" className="w-full h-48 object-cover object-center hover:scale-105" />
                    <div className="px-2 pt-4 pb-2">
                    <h2 className="text-xl font-semibold ">Tagaytay</h2>
                    <p>
                    Tagaytay is one of the most frequented places in the south because of its outstanding scenery. It overlooks Taal Lake and Taal Volcano and cold climate, given its high altitude. This makes both the volcano and lake viewable from several vantage points. This also explains where it gets its moniker and why tourism is one of its major industries.
                    </p>
                    </div>
                </div>
                    <div className="bg-white overflow-hidden shadow-lg w-300 md:w-400  lg:w-400">
                    <img src={h3} alt="Placeholder" className="w-full h-48 object-cover object-center hover:scale-105" />
                    <div className="px-2 pt-4 pb-2">
                    <h2 className="text-xl font-semibold ">Palawan</h2>
                    <p>
                        Palawan is an island province in the Philippines known for its stunning natural beauty and biodiversity. It is often referred to as the "last frontier" due to its pristine landscapes and remote location
                    </p>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <div className="flex items-center justify-center bg-[#C3C3C3] pb-12">
        <div className="w-screen my-0 bg-white">
        <div className="max-w-screen-lg mx-auto flex flex-col items-center md:flex-row">
            <div className="w-full md:w-1/2 md:pr-8 px-4 py-8">
            <h1 className="text-4xl font-bold mb-4">Unlock the Door to Your Next Adventure: Rent a Home Today.</h1>
            <p className="text-gray-800">Each rental is designed with you in mind, ensuring a space where you can relax, work, and play. With flexible lease terms and responsive property management, your rental experience will be seamless. Discover the place where you can truly feel at home.</p>
            </div>

            <div className="w-full md:w-1/2 md:pl-8 pb-10 md:py-3">
                <img src={LandingPage2} alt="Image" className="w-full h-auto" />
            </div>
        </div>
        </div>
    </div>
        {showModalLogin && <LoginModal closeModalLogin={() => setShowModalLogin(false)} openModalRegister={() => setShowModalRegister(true)} openForgotPassword={() => setShowForgotPassword(true)} />}
        {showModalRegister && <RegisterModal closeModalRegister={() => setShowModalRegister(false)} openModalLogin={() => setShowModalLogin(true)} />}
        {showForgotPassword && <ForgotPassword closeForgotPassword={() => setShowForgotPassword(false)} openModalRegister={() => setShowModalRegister(true)} openModalLogin={() => setShowModalLogin(true)} />}
        <Footer />
        </>
    )
}

export default LandingPage