import { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router';
import { collection, getDocs, orderBy, query, where, deleteDoc, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import PropertyCard from '../components/PropertyCard';
import { toast } from 'react-toastify';
import House from '../images/House1.jpg'
import HomeHeader from '../components/HomeHeader'
import { MdAddHome } from "react-icons/md";
import AddPropertyModal from '../components/AddPropertyModal';
import EditPropertyModal from '../components/EditPropertyModal';
import Avatar from '../images/avatar.png'

const Profile = () => {

    const auth = getAuth();
    const navigate = useNavigate();
    const [listings, setListings] = useState(null);
    const [changeDetail, setChangeDetail] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showPropertyModal, setShowPropertyModal] = useState(false);
    const [showEditPropertyModal, setShowEditPropertyModal] = useState(false);

    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
        pp: auth.currentUser.photoURL
    })

    const { name, email, pp } = formData;

    const onLogout = () => {
        auth.signOut()
        navigate('/landingpage')
    }

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    const onDelete = async (listingID) => {
        if (window.confirm("Are you sure about that?")) {
            await deleteDoc(doc(db, "listings", listingID))
            const updatedListings = listings.filter(
                (listing) => listing.id !== listingID
            );
            setListings(updatedListings)
            toast.success("Successfully Deleted")
        }
    }

    const onEdit = (listingID) => {
        navigate(`/editproperty/${listingID}`)
    }


    useEffect(() => {
        const fetchUserListing = async () => {

            const listingRef = collection(db, "listings");
            const q = query(listingRef, where("userRef", "==", auth.currentUser.uid),
                orderBy("timestamp", "desc")
            );
            const querySnap = await getDocs(q);
            let listings = [];
            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });
            setListings(listings);
            setLoading(false);
        }
        fetchUserListing();
    }, [auth.currentUser.uid])

    return (
        <>
        < HomeHeader />
        <div className='bg-[#FEECDB] min-h-[100vh]'>
            <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
                <h1 className='text-3xl text-center mt-6 font-bold'>
                    My Profile
                </h1>
                <div className='w-full md:[50%] mt-6 px-3'>
                    
                    <form className='flex'>
                        
                        <div className='w-[25%] flex justify-center items-center'>
                            <input 
                            type="image" 
                            id='pp'
                            value={pp}
                            disabled={!changeDetail}
                            onChange={onChange}
                            className='w-[160px] h-[160px] rounded-full object-cover hover:scale-105' src={Avatar} />
                        </div>
                        {/* name input */}
                    <div className='pt-10 mb-10'>
                        <label for="name" className='mb-2 text-sm font-medium text-gray-900 dark:text-white'>Name</label>
                        <input
                            type="name"
                            id='name'
                            value={name}
                            disabled={!changeDetail}
                            onChange={onChange}
                            className={`w-full px-4 py-1 text-base text-gray-700 bg-[#EFC7A2] border-[1px] border-black transition ease-in-out mb-3 &&${changeDetail && "bg-red-200 focus:bg-red-200"}`} />

                        {/* email input */}
                        <label for="email" className='mb-2 text-sm font-medium text-gray-900 dark:text-white'>Email</label>
                        <input
                            type="email"
                            id='email'
                            value={email}
                            disabled
                            className='w-full px-4 py-1 text-base text-gray-700 bg-[#EFC7A2] border-[1px] border-black transition ease-in-out mb-3 ' />

                        <div className='flex justify-end text-sm sm:text-lg'>
                            <p
                                onClick={onLogout}
                                className='text-blue-600 hover:text-blue-700 transition ease-in-out duration-200 cursor-pointer'>Sign out</p>
                        </div>
                    </div>
                    </form>
                    <button type='submit' className='w-92 bg-[#ce6c10] text-white uppercase px-7 py-2 text-sm font-medium rounded shadow-md hover:bg-[#BD5B00] transition duration-150 ease-in-out hover:shadow-lg active:bg-[#8a4300] flex justify-center items-center'
                    onClick={()=> setShowPropertyModal(true)}>
                        
                            <MdAddHome className='mr-2 text-3xl rounded-full p-1 border-2' /> Add Your Property
                        
                    </button>
                </div>
            </section>
            <div className='max-w-6xl px-3 mt-6 mx-auto'>
                {!loading && listings.length > 0 && (
                    <>
                        <h2 className='text-2xl text-start font-semibold mb-6'>My Property</h2>
                        <ul className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-6 mb-6 gap-4'>
                            {listings.map((listing) => (
                                <PropertyCard
                                    key={listing.id}
                                    id={listing.id}
                                    listing={listing.data}
                                    onDelete={() => onDelete(listing.id)}
                                    onEdit={() => onEdit(listing.id)}
                                />
                            ))}
                        </ul>
                    </>
                )}
            </div>
            {showPropertyModal && <AddPropertyModal closeModal={setShowPropertyModal} />}
            {showEditPropertyModal && <EditPropertyModal closeModal={setShowEditPropertyModal} />}
        </div>
        </>
    )
}

export default Profile