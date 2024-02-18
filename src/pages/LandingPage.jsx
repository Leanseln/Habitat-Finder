import LandingPage1 from "../pages/imgs/landingpage.jpeg"
import LandingPage2 from "../pages/imgs/landingpage1.jpg"
import icon from "../pages/imgs/icon.png"
import collage from "../pages/imgs/collage.png"
import h1 from "../pages/imgs/h1.jpg"
import h2 from "../pages/imgs/h2.jpg"
import h3 from "../pages/imgs/h3.jpg"


const LandingPage = () => {
    return (

        <>

        <div className="min-h-screen bg-gray-100 flex flex-col overflow-hidden">
               <div className="bg-transparent fixed top-2 left-2 sm:left-0 right-0 z-10 flex flex-col sm:flex-row items-center justify-between px-6">
                  <img src={icon} className="h-13 w-auto bg-no-blur mb-2 sm:mb-0" alt="Icon" />
                  <div className="flex flex-col sm:flex-row">
                  <button className="bg-[#CBB89D] border-b-4 border-[#806044] hover:border-white hover:bg-[#412F26] hover:text-white text-[#412F26] font-bold py-1 px-4 rounded mr-4 shadow-2xl mb-2 sm:mb-0">Login</button>
                  <button className="bg-[#CBB89D] border-b-4 border-[#806044] hover:border-white hover:bg-[#412F26] hover:text-white text-[#412F26] font-bold py-1 px-4 rounded mr-4 shadow-2xl mb-2 sm:mb-0">Register</button>
                  </div>
               </div>

               <div className="w-screen flex-grow bg-cover bg-center bg-no-blur flex items-center justify-center overflow-x-auto"
                    style={{ backgroundImage: `url(${LandingPage1})` }}>
                  <div className="md:w-1/2 md:pr-8 md:pl-4 sm:items-center text-center  ml-16 md:mr-5 s:mr-16 ">
                    <h1 className="text-3xl lg:text-5xl font-bold mb-4 text-[#412F26] ">Looking for a House?</h1>
                    <p className="text-sm lg:text-base text-[#412F26] mb-4 lg:mb-0 sm:pl-3 sm:pr-5 text-justify ">Set off on an adventure to explore the allure of renting, where a world of exquisite and comfortable houses awaits you at every corner, beckoning you to make priceless memories in settings that beckon tales of coziness and warmth.</p>
                    <br />
                    <button className="bg-[#CBB89D] border border-[#412F26] hover:bg-[#412F26] hover:text-white justify-self-center font-semibold py-2 px-4 rounded mt-4 lg:mt-0">Let's find a house for you!</button>
                  </div>
                  <div className="hidden md:flex w-1/2 overflow-hidden">
                     <img src={collage} alt="Image" className="w-full h-full object-cover opacity-70" />
                  </div>
               </div>

        </div>


    <div className="min-h-screen flex items-center justify-center">

      <div
        className="w-screen h-screen bg-cover bg-center bg-no-blur mx-auto flex justify-center"
        style={{ backgroundImage: `url(${LandingPage2})`   }} 
      >

            <div className="lg:w-5/6 pr-10 my-20">
              <h1 className="text-4xl font-bold mb-4 text-[#412F26] text-right">Real Community</h1>
              <h1 className="text-4xl font-bold mb-4 text-[#412F26] text-right">Real Connections</h1>
              <p className="text-sm lg:text-base text-[#412F26] mb-4 lg:mb-0 sm:pl-3 sm:pr-5 mt-0">
              A vital way for people to obtain a home that meets their needs and allows them flexibility and accessibility without the commitment of homeownership is through renting. Whether it's a large home tucked away in the suburbs or a quaint apartment in the middle of the city, rentals act as a link to help single people and families alike discover a suitable and pleasant place to live. Renting provides the flexibility to adjust to changing lifestyles while guaranteeing a secure and friendly home for everyone in a society where mobility and shifting circumstances are the norm.
              </p>

            </div>

      </div>

    </div>

    <div className="min-h-screen flex flex-col items-center justify-center bg-[#C3C3C3]">

          <div className="mt-8">
              <h3 className="text-xl font-bold">What are you looking for?</h3>
          </div>

        <div className="container mx-auto mt-5">
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
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
                 <img src={h2} alt="Placeholder" className="w-full h-48 object-cover object-center px-2 py-2 mb-0" />
                 <div className="p-4">
                 <h2 className="text-xl font-semibold mb-2">House 3</h2>
                 <p className="text-gray-600">1-bed loft, downtown location, open layout, rooftop access, city views.</p>
                 </div>
             </div>

          </div>
       </div>
   </div>

   <div className="min-h-screen flex items-center justify-center bg-[#C3C3C3]">
     <div className="w-screen my-0 bg-white">
        <div className="max-w-screen-lg mx-auto flex flex-col-reverse items-center md:flex-row">
           <div className="w-full md:w-1/2 md:pr-8 px-4 py-8">
           <h1 className="text-4xl font-bold mb-4">A home for you...</h1>
           <p className="text-gray-800">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat, ducimus quo. Ipsa dolorum maxime nam voluptates eius nostrum tenetur rem hic culpa suscipit? Reprehenderit quod animi ex voluptatem velit eligendi?</p>
           </div>

           <div className="w-full md:w-1/2 md:pl-8 py-3">
              <img src={LandingPage2} alt="Image" className="w-full h-auto" />
           </div>
        </div>
     </div>
   </div>



        </>
    )
}

export default LandingPage