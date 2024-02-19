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
import { useEffect, useState } from "react"
import { collection, getDoc, getDocs, limit, orderBy, query, where } from "firebase/firestore"
import { db } from "../firebase"
import PropertyCard from "../components/PropertyCard"
import { getAuth } from "firebase/auth"



const Home = () => {

    const auth = getAuth();
    const [loading, setLoading] = useState(true);
    const [rentListings, setRentListings] = useState(null);

    useEffect(() => {
        async function fetchListings() {
        try {
            // get reference
            const listingsRef = collection(db, "listings");
            // create the query
            const q = query(
            listingsRef,
            where("type", "==", "rent"),
            orderBy("timestamp", "desc"),
            limit(4)
            );
            // execute the query
            const querySnap = await getDocs(q);
            const listings = [];
            querySnap.forEach((doc) => {
            return listings.push({
                id: doc.id,
                data: doc.data(),
            });
            });
            setRentListings(listings);
            } catch (error) {
                console.log(error);
            }
        }
        fetchListings();
    }, []);
    
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
            
            
            <div className="max-w-6xl mx-auto pt-4 space-y-6 ">
            {rentListings && rentListings.length > 0 && (
            <div className="m-2 mb-6">
                <h2 className="px-3 text-2xl mt-6 font-semibold">
                Places for rent
                </h2>
                
                <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {rentListings.map((listing) => (
                    <PropertyCard
                    key={listing.id}
                    listing={listing.data}
                    id={listing.id}
                    />
                ))}
                </ul>
            </div>
        )}
        </div>
        </section>

        </div>
        </div>
        </>
    )
}

export default Home