import { useState, useEffect } from 'react'
import Loading from './Loading'
import { toast } from 'react-toastify'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth } from 'firebase/auth';
import { v4 as uuidv4} from "uuid";
import { addDoc, collection, serverTimestamp, updateDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router';


const EditPropertyModal = ({closeModal}) => {

    const auth = getAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [listing, setListing] = useState(null)

    const [formData, setFormData] = useState({

        type: "rent",
        name: "",
        bedrooms: 1,
        bathrooms: 1,
        address: '',
        description: '',
        city: '',
        Price: 0,
        images: {},
    });

    const {
        type,
        name, 
        bedrooms, 
        city,
        bathrooms, 
        address, 
        description, 
        Price, 
        images } = formData;


    const params = useParams()

    useEffect(()=>{
        if(listing && listing.userRef !== auth.currentUser.uid){
            toast.error("You cannot edit this listing")
            navigate("/")
        }
    }, [listing, navigate])

    useEffect(() => {
        setLoading(true);
        async function fetchListing() {
            const docRef = doc(db, "listings", params.listingId)
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                setListing(docSnap.data());
                setFormData({...docSnap.data()})
                setLoading(false)
            }else {
                navigate('/')
                toast.error("Listing does not exist")
            }
        }
        fetchListing()
    }, [navigate, params.listingId])

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
    
    const onSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        
        if(images.length > 50) {
            setLoading(false);
            toast.error("Maximum 50 images are allowed");
            return;
        }
        

        const storeImage = async(image) => {
            return new Promise((resolve, reject)=>{
                const storage = getStorage()
                const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
                const storageRef = ref(storage, filename);
                const uploadTask = uploadBytesResumable(storageRef, image);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                      // Observe state change events such as progress, pause, and resume
                      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    switch (snapshot.state) {
                        case "paused":
                        console.log("Upload is paused");
                        break;
                        case "running":
                        console.log("Upload is running");
                        break;
                    }
                    },
                    (error) => {
                      // Handle unsuccessful uploads
                    reject(error);
                    },
                    () => {
                      // Handle successful uploads on complete
                      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                    }
                );
            });
        }
        
        const imgUrls = await Promise.all(
            [...images]
                .map((image) => storeImage(image)))
                .catch((error) => {
                    setLoading(false);
                    toast.error("Images not uploaded");
                    return;
                }
            );

        const formDataCopy = {
            ...formData,
            imgUrls,
            timestamp: serverTimestamp(),
            userRef: auth.currentUser.uid
        };
        delete formDataCopy.images;

        const docRef = doc(db, "listings", params.listingId);

        await updateDoc(docRef, formDataCopy);
        setLoading(false);
        toast.success("Property Updated");
        navigate("/profile");  
    }

    if(loading) {
        return <Loading />
    }

    return (
        <div className=''>
            <div className="items-center flex justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative sm:w-[400px] md:w-[450px] lg:min-w-[500px] lg:max-w-[500px] my-6 mx-auto">
                    {/*content*/}
                    <div className="bg-[#EFC7A2] border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none px-8">
                        {/*header*/}
                        <div className="flex items-center justify-between mx-auto py-5">
                        <h3 className="text-3xl font-bold text-[#4B2C1A]">
                            Add Your Property
                        </h3>
                        <button
                            className="p-1 text-black text-sm leading-none font-semibold  absolute right-2 top-0"
                            onClick={() => closeModal(false)}>
                            <span className="text-black text-xl block outline-none focus:outline-none">
                            X
                            </span>
                        </button>
                        </div>
                    {/*body*/}
                    <form onSubmit={onSubmit}>
                
                    <button 
                        type='button' 
                        id='type' 
                        value='rent'
                        onClick={onChange}
                        className="mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full bg-[#ce6c10] text-white cursor-default"
                    >Rent</button>

                <p className='text-sm md:text-lg mt-6 font-semibold'>Name</p>
                <input 
                    type="text" 
                    id='name' 
                    value={name}
                    onChange={onChange}
                    placeholder='Name'
                    maxLength="32"
                    minLength="10"
                    required
                    className='w-full px-4 py-2 text-sm md:text-base text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mg-6'
                />

                <div className='flex space-x-6 mb-6'>
                    <div>
                        <p className='text-lg font-semibold'>Beds</p>
                        <input 
                            type="number" 
                            id='bedrooms' 
                            value={bedrooms} 
                            onChange={onChange} 
                            min={1} 
                            max={20} 
                            required 
                            className='w-full px-4 py-2 text-sm md:text-base text-gray-700 bg-white border border-gray-700 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600'/>
                    </div>
                    <div>
                        <p className='text-lg font-semibold'>Baths</p>
                        <input 
                            type="number" 
                            id='bathrooms' 
                            value={bathrooms} 
                            onChange={onChange} 
                            min={1} 
                            max={20} 
                            required 
                            className='w-full px-4 py-2 text-sm md:text-base text-gray-700 bg-white border border-gray-700 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600'/>
                    </div>
                </div>

                <p className='text-lg mt-6 font-semibold'>Address</p>
                <input 
                    type="text" 
                    id='address' 
                    value={address}
                    onChange={onChange}
                    placeholder='Address'
                    required
                    className='w-full px-4 py-2 text-sm md:text-base text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600'
                />

                <p className='text-lg mt-3 font-semibold'>City</p>
                <input 
                    type="text" 
                    id='city' 
                    value={city}
                    onChange={onChange}
                    placeholder='City'
                    required
                    className='w-full px-4 py-2 text-sm md:text-base text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6'
                />

                <p className='text-lg font-semibold'>Description</p>
                <input 
                    type="text" 
                    id='description' 
                    value={description}
                    onChange={onChange}
                    placeholder='Description'
                    required
                    className="w-full px-4 py-2 text-sm md:text-base text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 whitespace-pre-line"
                />

                <p className='text-lg mt-6 font-semibold'>Parking Spot</p>
                <div className='flex'>
                    <button 
                        type='button' 
                        id='parking' 
                        value={true}
                        onClick={onChange}
                        className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${ !parking ? "bg-white text-black" : "bg-[#ce6c10] text-white"}`}
                    >Yes</button>

                    <button 
                        type='button' 
                        id='parking' 
                        value={false}
                        onClick={onChange}
                        className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${ parking ? "bg-white text-black" : "bg-[#ce6c10] text-white"}`}
                    >No</button>
                </div>

                <div className="flex items-center mt-6 mb-6">
                    <div className="">
                        <p className='text-lg font-semibold'>
                            Floor Area
                        </p>
                        <div className="flex justify-center items-center space-x-6">
                            <input 
                            type="number" 
                            id='floorArea' 
                            value={floorArea}
                            onChange={onChange}
                            min="500"
                            max="1000000000"
                            required
                            className='w-full px-4 py-2 text-sm md:text-base text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center'
                            />
                            <p>Sqft</p>
                        </div>
                        
                    </div>
                </div>
                <div className="flex items-center mb-6">
                    <div className="">
                        <p className='text-lg font-semibold'>
                            Price
                        </p>
                        <div className="flex justify-center items-center space-x-6">
                            <input 
                            type="number" 
                            id='Price' 
                            value={Price}
                            onChange={onChange}
                            min="50"
                            max="1000000000"
                            required
                            className='w-full px-4 py-2 text-sm md:text-base text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center'
                            />
                            <p> Month</p>
                        </div>
                        
                    </div>
                </div>
                
                <div className="mb-6">
                    <p className='text-lg font-semibold'>Images</p>
                    
                    <input 
                        type="file"
                        id='images'
                        onChange={onChange}
                        accept='.jpg, .png, .jpeg'
                        multiple
                        required 
                        className='w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600'
                        />
                </div>

                <button type='submit' className='mb-6 w-full px-7 py-3 bg-[#ce6c10] text-white font-medium text-sm uppercase rounded shadow-md hover:bg-[#BD5B00] hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-[#8a4300] active:shadow-lg transition duration-150 ease-in-out'>Add Property</button>
            </form>
                    </div>
                </div>
            </div>
            
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            
        </div>
    )
}

export default EditPropertyModal