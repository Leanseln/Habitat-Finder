import Header from "../components/Header"
import House1 from "../pages/imgs/House1.jpg"
import House2 from "../pages/imgs/House2.jpg"
import House3 from "../pages/imgs/House3.jpg"
import House4 from "../pages/imgs/House4.jpg"
import House5 from "../pages/imgs/House5.jpg"
import House6 from "../pages/imgs/House6.jpg"
import House7 from "../pages/imgs/House7.jpg"
import House8 from "../pages/imgs/House8.jpg"
import icon from "../pages/imgs/icon.png"
import { BiSearchAlt } from "react-icons/bi";



const Home = () => {
    return (
        <> 
        
        <div className="searchBarContainer">
           <div class="flex items-center justify-center">
            <img src={icon} alt="icon" clas="w-16 h-16 mr-3"/>
            <p class="text-center text-xl font-normal">
             Find Home to Rent
            </p>
           </div>
         <div class="flex justify-center items-center">
             <div class="flex flex-col sm:flex-row bg-white border border-black rounded-full overflow-hidden w-full max-w-96">
                <BiSearchAlt class="ms-2 mt-1"/>
              <input type="text" class="flex-grow px-3 py-0 focus:outline-none" placeholder="" />
              <button type="submit" class="bg-blue-500 text-white px-3 py-0 sm:rounded-r-full">Search</button>
             </div>
        </div>
        </div>
        <hr class="my-4 border-t border-black" />
        <div class="container mx-auto mt-4 ps-8">
          <div class="flex space-x-4 align-items: center; ps-8 ml-6 overflow-hidden">
             <div class="">
               <select name="Price" class="block mt-1 w-full bg-gray-200 px-1 py-0 rounded-sm">
                   <option value=" " class="text-center">Price</option>
                   <option value="option1">Option 1</option>
                   <option value="option2">Option 2</option>
                   <option value="option3">Option 3</option>
               </select>
             </div>
             <div>
               <select name="Bedroom" class="block mt-1 w-full bg-gray-200 px-1 py-0 rounded-sm">
                  <option value="" class="text-center">Bedroom</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
               </select>
             </div>
             <div>
                <select name="Guest" class="block mt-1 w-full bg-gray-200 px-1 py-0 rounded-sm">
                  <option value="" class="text-center">Guest</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
             </div>
          </div>
        </div>
        <div>
    
         <section>
          <div class="container mx-auto mt-3 p-10">
          <p class="text-left mb-2 text-lg">Homes For Rent</p>
           <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               <div class="card border border-gray-300  overflow-hidden">
                  <a href="#">
                     <img src={House1} alt="House 1"/>
                   </a>
                   <p class="description items-center text-sm px-2 bg-zinc-100">
                    Caloocan City
                    <br/>
                    2Bd | 1 Bath |1200 Sqft
                    <br/>
                    P5,000 Month
                    </p>
               </div>
               <div class="card border border-gray-300 overflow-hidden">
                 <a href="#">
                     <img src={House2} alt="House 2"/>
                   </a>
                   <p class="description items-center text-sm px-2 bg-zinc-100">
                    Caloocan City
                    <br/>
                    2Bd | 1 Bath |1200 Sqft
                    <br/>
                    P5,000 Month
                    </p>
                </div>
                <div class="card border border-gray-300 overflow-hiddend">
                   <a href="#">
                     <img src={House3} alt="House 3"/>
                   </a>
                   <p class="description items-center text-sm px-2 bg-zinc-100">
                    Caloocan City
                    <br/>
                    2Bd | 1 Bath |1200 Sqft
                    <br/>
                    P5,000 Month
                    </p>
                </div>
                <div class="card border border-gray-300 overflow-hidden">
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
                 <div class="card border border-gray-300  overflow-hidden">
                   <a href="#">
                     <img src={House5} alt="House 5"/>
                   </a>
                   <p class="description items-center text-sm px-2 bg-zinc-100">
                    Caloocan City
                    <br/>
                    2Bd | 1 Bath |1200 Sqft
                    <br/>
                    P5,000 Month
                    </p>
                 </div>
                <div class="card border border-gray-300 overflow-hidden">
                   <a href="#">
                     <img src={House6} alt="House 6"/>
                   </a>
                   <p class="description items-center text-sm px-2 bg-zinc-100">
                    Caloocan City
                    <br/>
                    2Bd | 1 Bath |1200 Sqft
                    <br/>
                    P5,000 Month
                    </p>
                  </div>
                <div class="card border border-gray-300 overflow-hidden">
                   <a href="#">
                     <img src={House7} alt="House 7"/>
                   </a>
                   <p class="description items-center text-sm px-2 bg-zinc-100">
                    Caloocan City
                    <br/>
                    2Bd | 1 Bath |1200 Sqft
                    <br/>
                    P5,000 Month
                    </p>
                </div>
                <div class="card border border-gray-300 overflow-hidden">
                  <a href="#">
                     <img src={House8} alt="House 8"/>
                   </a>
                   <p class="description items-center text-sm px-2 bg-zinc-100">
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
        </>
    )
}

export default Home