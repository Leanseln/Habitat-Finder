import Header from "../components/Header"
import House1 from "../images/House1.jpg"
import House2 from "../images/House2.jpg"
import House3 from "../images/House3.jpg"
import House4 from "../images/House4.jpg"
import House5 from "../images/House5.jpg"
import House6 from "../images/House6.jpg"
import House7 from "../images/House7.jpg"
import House8 from "../images/House8.jpg"
import icon from "../images/Icon.png"
import { BiSearchAlt } from "react-icons/bi";
import HomeHeader from "../components/HomeHeader"



const Home = () => {
    return (
        <> 
        <HomeHeader />
        <div className="bg-[#FEECDB]">
        <div className="searchBarContainer">
            <div className="flex items-center justify-center">
            <img src={icon} alt="icon" className="w-16 h-16 mr-3"/>
            <p className="text-center text-xl font-normal">
            Find Home to Rent
            </p>
            </div>
            <div className="flex justify-center items-center">
                <div className="flex flex-col sm:flex-row bg-white border border-black rounded-full overflow-hidden w-full max-w-96">
                <BiSearchAlt className="ms-2 mt-1"/>
                <input type="text" className="flex-grow px-3 py-0 focus:outline-none" placeholder="" />
                <button type="submit" className="bg-blue-500 text-white px-3 py-0 sm:rounded-r-full">Search</button>
                </div>
        </div>
        </div>
        <hr className="my-4 border-t border-black" />
        <div className="container mx-auto mt-4">
            <div className="flex space-x-4 align-items: center; ml-10 overflow-hidden">
                <div className="">
                <select name="Price" className="block mt-1 w-full bg-gray-200 px-1 py-0 rounded-sm">
                    <option className="text-center">Price</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                </select>
                </div>
                <div>
                <select name="Bedroom" className="block mt-1 w-full bg-gray-200 px-1 py-0 rounded-sm">
                    <option className="text-center">Bedroom</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                </select>
                </div>
                <div>
                <select name="Guest" className="block mt-1 w-full bg-gray-200 px-1 py-0 rounded-sm">
                    <option className="text-center">Guest</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                </select>
                </div>
            </div>
        </div>
        <div>
    
            <section>
            <div className="container mx-auto mt-3 p-10">
            <p className="text-left mb-2 text-lg">Homes For Rent</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <div className="card border border-gray-300  overflow-hidden">
                    <a href="#">
                        <img src={House1} alt="House 1"/>
                    </a>
                    <p className="description items-center text-sm px-2 bg-zinc-100">
                    Caloocan City
                    <br/>
                    2Bd | 1 Bath |1200 Sqft
                    <br/>
                    P5,000 Month
                    </p>
                </div>
                <div className="card border border-gray-300 overflow-hidden">
                    <a href="#">
                        <img src={House2} alt="House 2"/>
                    </a>
                    <p className="description items-center text-sm px-2 bg-zinc-100">
                    Caloocan City
                    <br/>
                    2Bd | 1 Bath |1200 Sqft
                    <br/>
                    P5,000 Month
                    </p>
                </div>
                <div className="card border border-gray-300 overflow-hiddend">
                    <a href="#">
                        <img src={House3} alt="House 3"/>
                    </a>
                    <p className="description items-center text-sm px-2 bg-zinc-100">
                    Caloocan City
                    <br/>
                    2Bd | 1 Bath |1200 Sqft
                    <br/>
                    P5,000 Month
                    </p>
                </div>
                <div className="card border border-gray-300 overflow-hidden">
                    <a href="#">
                        <img src={House4} alt="House 4"/>
                    </a>
                    <p class="description items-center text-sm px-2 bg-zinc-100">
                    Caloocan City
                    <br/>
                    2Bd | 1 Bath |1200 Sqft
                    <br/>
                    P5,000 Month
                    </p>
                    </div>
                    <div className="card border border-gray-300  overflow-hidden">
                    <a href="#">
                        <img src={House5} alt="House 5"/>
                    </a>
                    <p className="description items-center text-sm px-2 bg-zinc-100">
                    Caloocan City
                    <br/>
                    2Bd | 1 Bath |1200 Sqft
                    <br/>
                    P5,000 Month
                    </p>
                    </div>
                <div className="card border border-gray-300 overflow-hidden">
                    <a href="#">
                        <img src={House6} alt="House 6"/>
                    </a>
                    <p className="description items-center text-sm px-2 bg-zinc-100">
                    Caloocan City
                    <br/>
                    2Bd | 1 Bath |1200 Sqft
                    <br/>
                    P5,000 Month
                    </p>
                    </div>
                <div className="card border border-gray-300 overflow-hidden">
                    <a href="#">
                        <img src={House7} alt="House 7"/>
                    </a>
                    <p className="description items-center text-sm px-2 bg-zinc-100">
                    Caloocan City
                    <br/>
                    2Bd | 1 Bath |1200 Sqft
                    <br/>
                    P5,000 Month
                    </p>
                </div>
                <div className="card border border-gray-300 overflow-hidden">
                    <a href="#">
                        <img src={House8} alt="House 8"/>
                    </a>
                    <p className="description items-center text-sm px-2 bg-zinc-100">
                    Caloocan City
                    <br/>
                    2Bd | 1 Bath |1200 Sqft
                    <br/>
                    P5,000 Month
                    </p>
                </div>
                <div className="card border border-gray-300 overflow-hidden">
                    <a href="#">
                        <img src={House8} alt="House 8"/>
                    </a>
                    <p className="description items-center text-sm px-2 bg-zinc-100">
                    Caloocan City
                    <br/>
                    2Bd | 1 Bath |1200 Sqft
                    <br/>
                    P5,000 Month
                    </p>
                </div>
                <div className="card border border-gray-300 overflow-hidden">
                    <a href="#">
                        <img src={House8} alt="House 8"/>
                    </a>
                    <p className="description items-center text-sm px-2 bg-zinc-100">
                    Caloocan City
                    <br/>
                    2Bd | 1 Bath |1200 Sqft
                    <br/>
                    P5,000 Month
                    </p>
                </div>
            </div>
            </div>
        </section>

        </div>
        </div>
        </>
    )
}

export default Home