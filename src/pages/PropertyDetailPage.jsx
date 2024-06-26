import  { useEffect } from 'react'
import HomeHeader from '../components/HomeHeader'
import { getAuth } from 'firebase/auth'
import { useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { useNavigate, useParams } from 'react-router'
import { db } from '../firebase'
import Loading from '../components/Loading'
import { FaBed, FaBath, FaParking } from "react-icons/fa";
import Footer from '../components/Footer'
import { Carousel } from '@material-tailwind/react'
import Contact from '../components/Contact'

const PropertyDetailPage = () => {

    const navigate = useNavigate();
    const auth = getAuth();
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [listing, setListing] = useState(null);
    const [contactLandlord, setContactLandlord] = useState(false);
    
    useEffect(() => {
        async function fetchListing() {
            const docRef = doc(db, "listings", params.listingId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setListing(docSnap.data());
                setLoading(false);
            }
        }
        fetchListing();
        }, [params.listingId]);
        if (loading) {
            return <Loading />;
        }

        const handleGoBack = () => {
            navigate(-1); // Go back one page in history
        };


    return (
        <>
            <HomeHeader />
            <div className='mx-auto bg-[#FEECDB] py-5'>
            <div className="container mx-auto flex justify-center items-center">
            <div className='flex flex-col h-full'>
                <div className='mx-auto border-[1px] border-[#5f5f5f] bg-[#ffd5b2] p-5 h-auto mb-24'>
                    <p className='mb-5 flex text-3xl items-center font-semibold'>
                        {listing.city}, Philippines
                    </p>
                    <Carousel className="h-[200px] w-[400px] sm:h-[300px] sm:w-[500px] lg:h-[450px] lg:w-[800px] object-fit">
                        {listing.imgUrls.map((image, index) =>
                    <div className='flex gap-5'>
                        <img src={image} alt={`Imahe ${index}`} 
                        className='h-[200px] w-[400px] sm:h-[300px] sm:w-[500px] lg:h-[450px] lg:w-[800px] object-fit' />
                    </div>
                    )}
                    </Carousel>
                    <p className='flex text-[20px] items-center mt-6 font-semibold text-[#4B2C1A]'>
                        {listing.address}
                    </p>

                    <ul className='flex items-center whitespace-nowrap space-x-5 my-3 font-medium text-[#4B2C1A] '>
                        <li className='flex items-center whitespace-nowrap'><FaBed size={20} className='mr-1 text-[#b35c15]' /> {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}</li>
                        <li className='flex items-center whitespace-nowrap'><FaBath size={20} className='mr-1 text-[#b35c15]' /> {listing.baths > 1 ? `${listing.baths} Baths` : "1 Bath"}</li>
                        <li className='flex items-center whitespace-nowrap'><FaParking size={20} className='mr-1 text-[#b35c15]' /> {listing.parking ? "Parking Spot" : "No Parking"}</li>
                    </ul>

                    <p className='flex items-center font-semibold text-xl text-[#d8681d] mb-6'>
                        ₱ {listing.Price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        / month
                    </p>

                    <p className='flex flex-col text-[#4B2C1A] font-medium mb-6 w-[400px] sm:w-[500px] lg:w-[800px]'>
                        <span className='text-xl mb-1 font-semibold'>Description</span>
                        {listing.description}
                    </p>

                    <div className='text-[#4B2C1A]'>
                        <p className='text-xl font-semibold mb-1'>Listing Details</p>
                        <div className='flex mb-6'>
                            <div className='w-1/2'>
                                <div className='flex justify-between border-[1px] border-[#4B2C1A] px-1'>
                                    <p>Floor Area</p>
                                    <p>{listing.floorArea} sqm</p>
                                </div>
                                <div className='flex justify-between border-[1px] border-[#4B2C1A] px-1'>
                                    <p>Bedrooms</p>
                                    <p>{listing.bedrooms}</p>
                                </div>
                                <div className='flex justify-between border-[1px] border-[#4B2C1A] px-1'>
                                    <p>City</p>
                                    <p>{listing.city}</p>
                                </div>
                            </div>
                            <div className='w-1/2'>
                                <div className='flex justify-between border-[1px] border-[#4B2C1A] px-1'>
                                    <p>Parking</p>
                                    <p>{listing.parking ? "Parking" : "No Parking"}</p>
                                </div>
                                <div className='flex justify-between border-[1px] border-[#4B2C1A] px-1'>
                                    <p>House Type</p>
                                    <p>{listing.houseType}</p>
                                </div>
                                <div className='flex justify-between border-[1px] border-[#4B2C1A] px-1'>
                                    <p>Furnished</p>
                                    <p>{listing.furnished ? "Furnished" : "Not Furnished"}</p>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col text-[#4B2C1A] font-medium mb-6 w-[400px] sm:w-[500px] lg:w-[800px]'>
                        <p className='text-xl mb-1 font-semibold hidden'>Contact Details</p>
                        <p className='hidden'>Gmail: <span className='font-semibold hidden'>{listing.userEmail}</span></p>
                        </div>

                        <div className='flex-col flex'>
                            <div className='flex justify-between px-5 border-[1px] bg-[#ec9a6a] py-3 rounded gap-2'>
                            <div className='flex flex-col justify-center items-center font-semibold text-[12px] sm:text-base'>
                                <p>Do you have any questions about this property?</p>
                                <p>Connect with the owner</p>
                            </div>
                            <button className='bg-green-600 text-white font-semibold rounded px-2 text-[12px] sm:text-sm'
                            onClick={() => setContactLandlord(true)}
                            >Get Connected</button>
                            </div>
                        {contactLandlord && (
                            <Contact userRef={listing.userRef} listing={listing} />
                        )}
                        </div>
                    </div>
                            <div className='flex justify-center mt-5'>
                                <div>
                                    <button className='bg-green-600 text-white font-semibold rounded px-3 text-[24px] sm:text-sm h-10' onClick={handleGoBack}>Back</button>
                                </div>
                            </div>
                </div>
            </div>
            </div>
            
            </div>
            <Footer />
        </>
    )
}

export default PropertyDetailPage