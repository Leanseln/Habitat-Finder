
import icon from "../images/IconLogo.png"
import { BiSearchAlt } from "react-icons/bi";
import HomeHeader from "../components/HomeHeader"
import { useDeferredValue, useEffect, useState } from "react"
import { collection, getDoc, getDocs, limit, orderBy, query, where } from "firebase/firestore"
import { db } from "../firebase"
import PropertyCard from "../components/PropertyCard"
import { getAuth } from "firebase/auth"
import Footer from "../components/Footer";
import NoResult from "../components/NoResult";

const Home = () => {

    const auth = getAuth();
    const [rentListings, setRentListings] = useState(null);
    const [searchCity, setSearchCity] = useState('');
    const searchValue = useDeferredValue(searchCity);

    useEffect(() => {
        async function fetchListings() {
        try {
            // get reference
            const listingsRef = collection(db, "listings");
            // create the query
            const q = query(
            listingsRef,
            where("type", "==", "rent"),
            orderBy("timestamp", "desc")
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
            console.log(listings)
            } catch (error) {
                console.log(error);
            }
        }
        fetchListings();
    }, []);
    
    console.log(searchCity)
    
    return (
        <>
        
        <HomeHeader />
        <div className="mb-[120px]">
        <div className="flex justify-center items-center flex-col">
            <div className="flex items-center justify-center my-2">
            <img src={icon} alt="icon" className="h-12 mr-1 text-[#4B2C1A]"/>
            <p className="text-center text-xl font-normal">
            Find Home to Rent
            </p>
            </div>
            <div className="flex justify-center items-center">
                <div className="flex flex-row bg-white border border-black rounded-full overflow-hidden w-full max-w-96 sm:min-w-96 ">
                <BiSearchAlt className="ms-2 mt-1"/>
                <input 
                type="text" 
                className="flex-grow px-3 py-0 focus:outline-none" 
                placeholder="Search City"
                value={searchCity}
                onChange={(e)=> setSearchCity(e.target.value)}
                />
                <button type="submit" className="bg-[#ce6c10] text-white px-3 py-0 sm:rounded-r-full">Search</button>
                </div>
        </div>
        </div>
        <hr className="my-4 border-t border-black" />

        <div>
    
            <section>
            <div className="max-w-6xl mx-auto pt-4 space-y-6 ">
            {rentListings && rentListings.length > 0 && (
            <div className="m-2 mb-6">
                <h2 className="px-3 text-2xl mt-6 mb-2 font-semibold">
                Places for rent
                </h2>
                
                <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {searchValue.length <= 0 ? rentListings.map((listing) => (
                    <PropertyCard
                    key={listing.id}
                    listing={listing.data}
                    id={listing.id}
                    />
                )) : rentListings.filter((property) => property.data.city.toLowerCase().includes(searchValue.toLowerCase())).length > 0 ? rentListings.filter((property) => property.data.city.toLowerCase().includes(searchValue.toLowerCase())).map((listing) => (
                    <PropertyCard
                    key={listing.id}
                    listing={listing.data}
                    id={listing.id}
                    />
                )) : <NoResult /> }
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