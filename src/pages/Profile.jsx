import { useEffect, useState } from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
import { useNavigate } from 'react-router';
import { collection, getDocs, orderBy, query, where, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import PropertyCard from '../components/PropertyCard';
import { toast } from 'react-toastify';
import HomeHeader from '../components/HomeHeader'
import { MdAddHome } from "react-icons/md";
import AddPropertyModal from '../components/AddPropertyModal';
import EditPropertyModal from '../components/EditPropertyModal';
import PP from '../images/profile.png'
import { TbEdit } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { logout, updateInfo } from '../store/userSlice';
import Footer from '../components/Footer';
import Modal from "../components/ConfirmationModal.jsx"
import ClipLoader from "react-spinners/ClipLoader";

const Profile = () => {

    const auth = getAuth();
    const navigate = useNavigate();
    const [listings, setListings] = useState(null);
    const [declinedListings, setDeclinedListings] = useState(null);
    const [pendingListings, setPendingListings] = useState(null);
    const [changeDetail, setChangeDetail] = useState(false);
    const [loading, setLoading] = useState();
    const [showPropertyModal, setShowPropertyModal] = useState(false);
    const [showEditPropertyModal, setShowEditPropertyModal] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [editId, setEditId] = useState('');
    const [color, setColor] = useState();
    const [open, setOpen] = useState(false);
    

    const [formData, setFormData] = useState({
        name: user?.displayName ?? '',
        email: user?.email ?? '',
        photo: user?.photoURL ?? '',
    })

    const { name, email, photo } = formData;

    const onLogout = () => {
        const auth = getAuth();
        auth.signOut();
        dispatch(logout())
        navigate('/landingpage')
    }

    const onChange = (e) => {
        if(e.target.files){
            setFormData((prevState) =>({
                ...prevState,
                images: e.target.files
            }));
        }
        if(!e.target.files){
            setFormData((prevState)=>({
                ...prevState,
                [e.target.id]: e.target.value,
            }));
        }
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
        setEditId(listingID)
        setShowEditPropertyModal(true)
    }



    useEffect(() => {
        const fetchUserListing = async () => {

            const listingRef = collection(db, "listings");
            const q = query(listingRef, 
                where("userRef", "==", user?.uid), 
                where("type", "==", "approved") ,
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
    }, [user?.uid])

    useEffect(() => {
        const fetchUserListing = async () => {

            const listingRef = collection(db, "listings");
            const q = query(listingRef, 
                where("userRef", "==", user?.uid,),
                where("type", "==", "declined"),
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
            setDeclinedListings(listings);
            setLoading(false);
        }
        fetchUserListing();
    }, [user?.uid])

    useEffect(() => {
        const fetchUserListing = async () => {

            const listingRef = collection(db, "listings");
            const q = query(listingRef, 
                where("userRef", "==", user?.uid),
                where("type", "==", "pending"),
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
            setPendingListings(listings);
            setLoading(false);
        }
        fetchUserListing();
    }, [user?.uid])

    async function nameChange() {
        try {
            if (auth.currentUser.displayName !== name) {
                //update display name in firebase auth
                await updateProfile(auth.currentUser, {
                displayName: name,
                });
        
                // update name in the firestore
        
                const docRef = doc(db, "users", auth.currentUser.uid);
                await updateDoc(docRef, {
                name,
                });
                dispatch(updateInfo(({
                    displayName: name,
                })));
                toast.success("Profile details updated");
            }
            
            } catch (error) {
            toast.error("Could not update the profile details");
            }
        }

    
    return (
        <>
        <HomeHeader />
        <div>
        <div className='bg-[#FEECDB] mb-[120px]'>
            <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
                <h1 className='text-3xl text-center mt-6 font-bold'>
                    My Profile
                </h1>
                <div className='w-full md:[50%] mt-0 sm:mt-6 px-3'>
                    <div className='flex justify-around sm:justify-normal'>
                    <div className='w-[25%] flex justify-center items-center relative'>
                            <div className='relative'>
                            <img src={photo || PP} 
                            alt='Profile Picture'
                            id='photo'
                            disabled={!changeDetail}
                            className='w-full sm:w-[160px] sm:h-[160px] rounded-full object-cover' />
                            <input 
                                type="file" 
                                name='pp' 
                                id="pp" 
                                className={`absolute right-3 bottom-4 text-amber-1000 hover:scale-105 cursor-pointer hidden && ${!changeDetail ? "hidden" : "block"}`} />
                            <label htmlFor="pp" className={`absolute right-3 bottom-4 text-amber-1000 hover:scale-105 cursor-pointer hidden ${!changeDetail ? "hidden" : "block"}`}><TbEdit size={20}/></label>
                        </div>
                        </div>
                    <form className=''>
                        {/* name input */}
                        <div className='w-full py-5 sm:py-10'>
                        <label htmlFor="name" className='mb-2 text-sm font-medium text-gray-900 dark:text-white'>Name</label>
                        <input
                            type="name"
                            id='name'
                            value={name}
                            disabled={!changeDetail}
                            onChange={onChange}
                            className={`w-full px-4 py-1 text-sm sm:text-base text-gray-700 bg-[#EFC7A2] border-[1px] border-black transition ease-in-out mb-3 &&${changeDetail && "bg-blue-200 focus:bg-blue-200"}`} />

                        {/* email input */}
                        <label htmlFor="email" className='mb-2 text-sm font-medium text-gray-900 dark:text-white'>Email</label>
                        <input
                            type="email"
                            id='email'
                            value={email}
                            disabled
                            className='w-full px-4 py-1 text-sm sm:text-base text-gray-700 bg-[#EFC7A2] border-[1px] border-black transition ease-in-out mb-3 ' />

                        <div className='flex justify-between text-sm sm:text-lg'>
                        <p className="items-center text-blue-500 transition ease-in-out duration-200 ml-1 cursor-pointer"
                        onClick={() => {
                            changeDetail && nameChange();
                            setChangeDetail((prevState) => !prevState);
                        }}>
                            {changeDetail ? "Apply change" : "Change Name"}
                        </p>
                        <div>

                                <button type="button" className='text-blue-600 hover:text-blue-700 cursor-pointer' onClick={() => setOpen(true)}>Sign out</button>
                        </div>

                        <Modal open={open} onClose={() => setOpen(false)} >
                            <div className="text-center w-56">
                            <div className="mx-auto my-4 w-48">
                                <h3 className="text-lg font-black text-gray-800">Confirm Logout</h3>
                                <p className="text-sm text-gray-500">
                                Are you sure, do you want to log out?
                                </p>
                            </div>
                            {loading ? (
                                <ClipLoader
                                color={color}
                                loading={loading}
                                size={50}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                                />
                            ) : (
                                <div className="flex gap-4">
                                <button className="btn btn-danger w-full" onClick={onLogout}>
                                    Log Out
                                </button>
                                <button
                                    className="btn btn-light w-full"
                                    onClick={() => setOpen(false)}
                                >
                                    Cancel
                                </button>
                                </div>
                            )}
                            </div>
                        </Modal>
                        </div>
                        
                    </div>
                    </form>
                    </div>
                    <button type='submit' className='w-92 bg-[#ce6c10] text-white uppercase px-7 py-2 text-sm font-medium rounded shadow-md hover:bg-[#BD5B00] transition duration-150 ease-in-out hover:shadow-lg active:bg-[#8a4300] flex justify-center items-center'
                    onClick={()=> setShowPropertyModal(true)}>
                        
                            <MdAddHome className='mr-2 text-3xl rounded-full p-1 border-2' /> Add Your Property
                        
                    </button>
                </div>
            </section>
            <section>
            <div className='max-w-6xl px-3 mt-6 mx-auto'>
                {!loading && listings?.length > 0 && (
                    <>
                        <h2 className='text-2xl text-start font-semibold mb-6'>My Property</h2>
                        <ul className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-6 mb-6 gap-4'>
                            {listings.map((listing) => (
                                <PropertyCard
                                    key={listing.id}
                                    id={listing.id}
                                    listing={listing.data}
                                    onEdit={() => onEdit(listing.id)}
                                    onDelete={() => onDelete(listing.id)}
                                />
                            ))}
                        </ul>
                    </>
                )}
            </div>
            </section>
            <section>
            <div className='max-w-6xl px-3 mt-6 mx-auto'>
                {!loading && pendingListings?.length > 0 && (
                    <>
                        <h2 className='text-2xl text-start font-semibold mb-6'>Pending</h2>
                        <ul className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-6 mb-6 gap-4'>
                            {pendingListings.map((listing) => (
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
            </section>
            <section>
            <div className='max-w-6xl px-3 mt-6 mx-auto'>
                {!loading && declinedListings?.length > 0 && (
                    <>
                        <h2 className='text-2xl text-start font-semibold mb-6'>Declined</h2>
                        <ul className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-6 mb-6 gap-4'>
                            {declinedListings.map((listing) => (
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
            </section>
            {showPropertyModal && <AddPropertyModal closeModal={setShowPropertyModal} />}
            {showEditPropertyModal && <EditPropertyModal closeEditModal={() => setShowEditPropertyModal(false)} data={listings.filter((property)=>property.id === editId).map((property)=>property.data)} id={editId}/>}
        </div>
        </div>
        <Footer />
        </>
    )
}

export default Profile