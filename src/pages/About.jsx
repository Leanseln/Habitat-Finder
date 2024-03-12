import HomeHeader from "../components/HomeHeader"
import Vector from "../pages/imgs/Vector 1.png"
import Vector2 from "../pages/imgs/Vector 2.png"
import AboutUs from "../pages/imgs/aboutUs.png"
import AboutUs2 from "../pages/imgs/aboutUs2.png"
import Footer from "../components/Footer"


const About = () => {
    const teamMembers = [
        {
          id: 1,
          name: 'Leansel Nico Ortega',
          role: 'Project Manager',
          image: 'https://images.rawpixel.com/image_png_1100/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTAyL3Jhd3BpeGVsb2ZmaWNlNl9mcm9udF92aWV3X2FyY2hpdGVjdHVyZV9pbGx1c3RyYXRpb25fc21hbGxfYm9va18zNzMxM2UwZC01NDJmLTRjZDQtYjE3OC03MDNlZjAxYjRmZjZfMS5wbmc.png', // Replace with actual image URL
        },
        {
          id: 2,
          name: 'Marc Jayson Tosoc',
          role: 'Assitant Project Manager',
          image: 'https://images.rawpixel.com/image_png_1100/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTAyL3Jhd3BpeGVsX29mZmljZV80M19mcm9udF92aWV3X3Bob3RvX29mX2FfMl9zdG9yaWVzX2JyaWNrX3N1YnVyYl9lMWVhNGEyMS1lYzcwLTRmY2EtOTgwYy1kYWUzMDBlZjRhM2QucG5n.png', // Replace with actual image URL
        },
        {
          id: 3,
          name: 'Arnie Manumbaga',
          role: 'Software Engineer',
          image: 'https://images.rawpixel.com/image_png_1100/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTAyL3Jhd3BpeGVsb2ZmaWNlNF9waG90b19vZl9hX2NpdHlfYnVpbGRpbmdfaXNvbGF0ZWRfb25fYV93aGl0ZV9iYV9hMmZlNGRkMy04MTM4LTQwZDItODdkYS1lNTEzMzQzMjZjOWEucG5n.png', // Replace with actual image URL
        },
        {
          id: 4,
          name: 'Hazel Jade Lobenaria',
          role: 'Frontend Developer',
          image: 'https://images.rawpixel.com/image_png_1100/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTAyL3Jhd3BpeGVsX29mZmljZV80M19waG90b19vZl9hX2xvZnRfc3R5bGVfbG93X3Jpc2VfY29uZG9faXNvbGF0ZV83YjU5NDU1Mi0zNTMxLTQ5YzEtYTdkYy0xOWYxZGU1NDc3MGYucG5n.png', 
        },
        {
            id: 5,
            name: 'Caleb Gwenn Galagar',
            role: 'UI/UX',
            image: 'https://images.rawpixel.com/image_png_1100/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTAyL3Jhd3BpeGVsX29mZmljZV80M19waG90b19vZl9hX3doaXRlX3N1YnVyYl9ob3VzZV93aXRoX2FfcmVkX3Jvb18wZTBiOTY3Zi1jMDg2LTQxZGQtYTVlYy01ZmIyNjU5OWIyNDkucG5n.png', 
          },
          {
            id: 6,
            name: 'Warren Jether Guevarra',
            role: 'Frontend Developer',
            image: 'https://images.rawpixel.com/image_png_1100/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTAyL3Jhd3BpeGVsX29mZmljZV80M19waG90b19vZl9hX21vZGVybl9sb3dfcmlzZV9jb25kb19pc29sYXRlZF9vbl9jOTkzN2IwZi0wMmZiLTRiODUtYmJlZS02OGIwN2E4Y2M2YWUucG5n.png', 
          },
          {
            id: 7,
            name: 'Adrian Alcobendas',
            role: 'Taga share ng memes',
            image: 'https://images.rawpixel.com/image_png_1100/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTAxL3Jhd3BpeGVsb2ZmaWNlOF9mcm9udF92aWV3X2FyY2hpdGVjdHVyZV9waG90b19vZl9hX2NvZmZlZV9zaG9wX180NTQxMjA0NC1iNTU0LTQ3M2EtOGRkNy1iODhiMzUyMTMyYTVfMi5wbmc.png', 
          },
      ];

    return (

        <>
        <HomeHeader />
        
        <div className="bg-[#FEECDB] min-h-screen flex items-center justify-center relative">
             <div className="max-w-5xl mx-auto relative">
             <img src={Vector} alt="Placeholder" className="w-full h-auto" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-transparent p-4 max-w-4xl">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-1/2 pr-2">
                        <h2 className="text-4xl font-bold mb-4 text-center">About Us</h2>
                        <p>
                         We embarked on the journey of creating this website with a singular vision – to simplify and
                         elevate the rental experience for everyone involved. In a world where access often outweighs
                         ownership, we recognized the need for a streamlined and user-friendly platform that connects
                         seekers with providers seamlessly.
                        </p>
                        </div>
                        <div className="w-1/2 pl-2">
                        <img src={AboutUs} alt="Placeholder" className="max-w-full max-h-fulll" />
                        </div>
                        </div>
                     </div>
                 </div>
            </div>
         </div>


         <div className="bg-[#FEECDB] py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
             <div className="max-w-7xl w-full bg-transparent rounded-lg overflow-hidden">
                 <div className="p-4">
                   <h2 className="text-3xl font-semibold text-center text-[#4B2C1A]">Meet Our Team</h2>
                    <div className="grid grid-cols-4 gap-4 mt-4 h-auto">
                    {teamMembers.map((member, index) => (
                         <div key={member.id} className={`bg-gray-200 bg-opacity-40 rounded-lg overflow-hidden shadow-md flex items-center ${index >= 4 && index <= 6 ? 'justify-center' : ''}`}>
                           <img src={member.image} alt={member.name} className="w-20 h-20 object-cover rounded-full bg-transparent" style={{ clipPath: 'circle(50%)' }} />
                          <div className="flex-1 ml-4 p-4">
                            <div>
                             <h3 className="text-lg font-semibold">{member.name}</h3>
                              <p className="text-sm text-gray-600">{member.role}</p>
                            </div>
                           </div>
                        </div>
                    ))}
                    </div>
                 </div>
             </div>
         </div>

        <div className="bg-[#FEECDB] min-h-screen flex items-center justify-center relative">
            <div className="max-w-5xl mx-auto relative">
               <img src={Vector2} alt="Placeholder" className="w-full h-auto" />
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-transparent p-4 max-w-4xl">
                   <div className="flex items-center justify-between mb-4">
                     <div className="w-1/2 pl-2 pr-3">
                      <img src={AboutUs2} alt="Placeholder" className="w-full h-auto " />
                     </div>
                  <div className="w-1/2 pr-1 pl-4">
                    <h2 className="text-4xl font-bold mb-4 text-right">Our Goal</h2>
                    <p>
                     We want to empower individuals and businesses alike, fostering a sharing economy that values efficiency,
                     affordability, and sustainability. Whether you're searching for the perfect space, equipment, or vehicle,
                     or looking to monetize your unused assets, our rental website is designed to be the catalyst for a more
                     interconnected and resourceful community.
                    </p>
                  </div>
                  </div>
                  <p className="text-center mt-7">Join us on this collaborative adventure as we redefine the way we live, work, and share!</p>
             </div>
            </div>
           </div>
       </div>
    <Footer/>
        </>
    )
}

export default About