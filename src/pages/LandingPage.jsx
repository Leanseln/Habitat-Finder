import LandingPage1 from "../pages/imgs/landingpage.jpeg"
import LandingPage2 from "../pages/imgs/landingpage1.jpg"
import icon from "../pages/imgs/icon.png"
import collage from "../pages/imgs/collage.png"
import h1 from "../pages/imgs/h1.jpg"
import h2 from "../pages/imgs/h2.jpg"
import h3 from "../pages/imgs/h3.jpg"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { CgArrowLongRight } from "react-icons/cg";


const LandingPage = () => {
    return (

        <>
        <Header />
        
            <div className="w-full h-screen flex-grow bg-cover bg-center bg-no-blur flex  overflow-x-auto"
                    style={{ backgroundImage: `url(${LandingPage1})` }}>
                <div className="w-full md:pr-8 md:pl-4 sm:items-center text-center  ml-16 md:mr-5 s:mr-16 mt-32">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-9xl font-extrabold mb-10 lg:mb-24 text-[#994b03bd] text-center font-monteserrat">Looking for a House?</h1>
                    <p className="text-[14px] sm:text-[16px] md:text-[18px] w-full lg:text-xl text-[#744c38] mb-10 lg:mb-20 text-center items-center  font-monteserrat">Set off on an adventure to explore the allure of renting, where a world of exquisite and comfortable houses awaits you at every corner, beckoning you to make priceless memories in settings that beckon tales of coziness and warmth.</p>
                    
                    <div className="flex justify-center">
                    <button className="bg-[#CBB89D] border text-sm md:text-base border-[#412F26] hover:bg-[#412F26] hover:text-white font-semibold py-1 md:py-2 px-4 rounded mt-4 lg:mt-0 flex justify-center items-center ">Let's find a house for you!<CgArrowLongRight size={30} className="ml-2 lg:ml-5"/></button></div>
                </div>
            </div>

    <div className="min-h-screen flex items-center justify-center">
    <div
        className="w-screen h-screen bg-cover bg-center bg-no-blur mx-auto flex justify-center"
        style={{ backgroundImage: `url(${LandingPage2})`   }} >
            <div className="lg:w-5/6 pr-10 my-20">
                <div className="flex flex-col">
                    <h1 className="text-4xl font-bold mb-4 lg:text-7xl text-[#412F26]">Real Community</h1>
                    <h1 className="text-4xl font-bold mb-4 lg:text-7xl text-[#412F26]">Real Connections</h1>
                </div>
                
                <p className="text-sm lg:text-2xl text-[#412F26] mb-4 lg:mb-0 sm:pl-3 sm:pr-5 mt-0">
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
                    <div className="bg-white overflow-hidden shadow-lg h-500 w-300 md:h-400 md:w-400 lg:h-400 lg:w-400">
                    <img src={h1} alt="Placeholder" className="w-full h-48 object-cover object-center px-2 py-2" />
                    <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">House 1</h2>
                    <p className="text-gray-600">
                    3-bed, 2-bath suburban home, hardwood floors, granite kitchen, tranquil backyard.
                    </p>
                    </div>
                </div>

                <div className="bg-white  overflow-hidden shadow-lg h-500 w-300 md:h-400 md:w-400 lg:h-400 lg:w-400 ml-4">
                    <img src={h3} alt="Placeholder" className="w-full h-48 object-cover object-center px-2 py-2" />
                    <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">House 2</h2>
                    <p className="text-gray-600">4-bed family home, spacious living area, backyard, garage, near schools.</p>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow-lg h-500 w-300 md:h-400 md:w-400 lg:h-400 lg:w-400 ml-4">
                    <img src={h2} alt="Placeholder" className="w-full h-48 object-cover object-center px-2 py-2" />
                    <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">House 3</h2>
                    <p className="text-gray-600">1-bed loft, downtown location, open layout, rooftop access, city views.</p>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <div className="flex items-center justify-center bg-[#C3C3C3] pb-12">
        <div className="w-screen my-0 bg-white">
        <div className="max-w-screen-lg mx-auto flex flex-col items-center md:flex-row">
            <div className="w-full md:w-1/2 md:pr-8 px-4 py-8">
            <h1 className="text-4xl font-bold mb-4">A home for you...</h1>
            <p className="text-gray-800">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat, ducimus quo. Ipsa dolorum maxime nam voluptates eius nostrum tenetur rem hic culpa suscipit? Reprehenderit quod animi ex voluptatem velit eligendi?</p>
            </div>

            <div className="w-full md:w-1/2 md:pl-8 pb-10 md:py-3">
                <img src={LandingPage2} alt="Image" className="w-full h-auto" />
            </div>
        </div>
        </div>
    </div>
        <Footer />
        </>
    )
}

export default LandingPage