import  { useEffect } from 'react'
import HomeHeader from '../components/HomeHeader'
import { getAuth } from 'firebase/auth'
import { useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { useParams } from 'react-router'
import { db } from '../firebase'
import Loading from '../hooks/Loading'
import { FaMapMarkerAlt, FaBed, FaBath, FaParking } from "react-icons/fa";
import Footer from '../components/Footer'

const PropertyDetailPage = () => {

    const auth = getAuth();
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [property, setProperty] = useState(null);

    useEffect(() => {
        async function fetchListing() {
            const docRef = doc(db, "listings", params.listingId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setProperty(docSnap.data());
                setLoading(false);
            }
        }
        fetchListing();
        }, [params.listingId]);
        if (loading) {
            return <Loading />;
        }


    return (
        <>
            <HomeHeader />
            <div className='mx-auto bg-[#FEECDB]'>
            <div className="container mx-auto h-full">
            <div className='flex flex-col'>
                <div className='mx-auto bg-[#ffd5b2] h-full px-5'>
                    <p className='pt-8 mb-5 flex text-3xl items-center font-semibold'>
                        {property.name}, {property.city}
                    </p>
                    <div className='flex gap-5'>
                        <img src={property.imgUrls[0]} alt="imahe" 
                        className='h-[450px] w-[800px] object-fit' />
                        
                    </div>
                    
                    <p className='flex text-[20px] items-center mt-6 font-semibold text-[#4B2C1A]'>
                        {property.address}
                    </p>

                    <ul className='flex items-center whitespace-nowrap space-x-5 my-3 font-medium text-[#4B2C1A] '>
                        <li className='flex items-center whitespace-nowrap'><FaBed size={20} className='mr-1 text-amber-700' /> {property.bedrooms > 1 ? `${property.bedrooms} Beds` : "1 Bed"}</li>
                        <li className='flex items-center whitespace-nowrap'><FaBath size={20} className='mr-1 text-amber-700' /> {property.baths > 1 ? `${property.baths} Baths` : "1 Bath"}</li>
                        <li className='flex items-center whitespace-nowrap'><FaParking size={20} className='mr-1 text-amber-700' /> {property.parking ? "Parking Spot" : "No Parking"}</li>
                    </ul>

                    <p className='flex items-center font-semibold text-xl text-[#ff6947] mb-6'>
                        ₱ {property.Price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        / month
                    </p>
                    
                    <p className='flex flex-col text-[#4B2C1A] font-medium mb-6'>
                        <span className='text-xl mb-1'>Description</span>
                        {property.description}
                    </p>

                    <div className='text-[#4B2C1A]'>
                        <p className='text-xl font-semibold mb-1'>Listing Details</p>
                        <div className='flex mb-6'>
                            <div className='w-1/2'>
                                <div className='flex justify-between border-[1px] border-[#4B2C1A] px-1'>
                                    <p>Floor Area</p>
                                    <p>{property.floorArea} sqm</p>
                                </div>
                                <div className='flex justify-between border-[1px] border-[#4B2C1A] px-1'>
                                    <p>Bedrooms</p>
                                    <p>{property.bedrooms}</p>
                                </div>
                                <div className='flex justify-between border-[1px] border-[#4B2C1A] px-1'>
                                    <p>Year Built</p>
                                    <p>2022</p>
                                </div>
                            </div>
                            <div className='w-1/2'>
                                <div className='flex justify-between border-[1px] border-[#4B2C1A] px-1'>
                                    <p>Parking</p>
                                    <p>{property.parking ? "Parking" : "No Parking"}</p>
                                </div>
                                <div className='flex justify-between border-[1px] border-[#4B2C1A] px-1'>
                                    <p>Bedrooms</p>
                                    <p>1521 sqft</p>
                                </div>
                                <div className='flex justify-between border-[1px] border-[#4B2C1A] px-1'>
                                    <p>Year Built</p>
                                    <p>2022</p>
                                </div>
                            </div>
                        </div>

                        <div className='flex justify-between px-5 border-[1px] bg-[#ec9a6a] py-3 rounded my-5'>
                            <div className='flex flex-col justify-center items-center font-semibold'>
                                <p>Do you have any questions about this property?</p>
                                <p>Connect with the owner</p>
                            </div>
                            <button className='bg-green-600 text-white font-semibold rounded px-2 text-sm'>Get Connected</button>
                        </div>

                    </div>
                </div>
            </div>
            </div>
                <Footer />
            </div>
        </>
    )
}

export default PropertyDetailPage