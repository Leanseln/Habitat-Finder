import { useState } from 'react'
import Loading from './Loading'
import { toast } from 'react-toastify'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth } from 'firebase/auth';
import { v4 as uuidv4} from "uuid";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router';


const AddPropertyModal = ({closeModal}) => {

    const auth = getAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);


    const [formData, setFormData] = useState({
        bedrooms: 1,
        bathrooms: 1,
        address: '',
        city: '',
        floorArea: 0,
        parking: false,
        description: '',
        Price: 0.0,
        images: {},
        houseType: '',
    });

    const {
        bedrooms, 
        bathrooms, 
        address, 
        floorArea,
        city,
        parking,
        description, 
        Price, 
        images,
        houseType, } = formData;

    const onChange = (e) => {
        let boolean = null;

        if(e.target.value === "true"){
            boolean = true;
        }
        if(e.target.value === "false"){
            boolean = false;
        }

        if(e.target.files){
            setFormData((prevState) =>({
                ...prevState,
                images: e.target.files
            }));
        }
        if(!e.target.files){
            setFormData((prevState)=>({
                ...prevState,
                [e.target.id]: boolean ?? e.target.value,
            }));
        }
        if (e.target.name === 'parking') {
            setFormData((prevState) => ({
                ...prevState,
                parking: e.target.value === "true", // Set based on value
            }));
        }
        if (e.target.id === 'houseType') {
            setFormData((prevState) => ({
                ...prevState,
                houseType: e.target.value,
            }));
        }
        
    }
    
    const onSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        
        if(images.length > 15) {
            toast.error("Maximum 15 images are allowed");
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
        const docRef = await addDoc(collection(db, "listings"), formDataCopy);
        toast.success("Property Added Successfully");
        closeModal(false);
        window.location.reload();
        setLoading(false);
    }

    if(loading) {
        return <Loading />
    }


    return (
        <div className=''>
            <div className="items-center flex justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative sm:w-[400px] md:w-[450px] lg:min-w-[500px] lg:max-w-[500px] mt-12 h-full">
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
                        className="mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full bg-[#ce6c10] text-white cursor-default"
                    >Rent</button>

<p className='text-lg mt-3 font-semibold'>Address:</p>
                <input 
                    type="text" 
                    id='address' 
                    value={address}
                    onChange={onChange}
                    placeholder='Address'
                    required
                    className='w-full px-4 py-2 text-sm md:text-base text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600'
                />

                <p className='text-lg mt-3 font-semibold'>City:</p>
                <input 
                    type="text" 
                    id='city' 
                    value={city}
                    onChange={onChange}
                    placeholder='City'
                    required
                    className='w-full px-4 py-2 text-sm md:text-base text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-3'
                />
                
                <div className="my-3">
                <p className="text-lg font-semibold">House Type:</p>
                <select id="houseType" value={houseType} onChange={onChange} className="w-full px-4 py-2 text-sm md:text-base text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600">
                    <option value="">Select House Type</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="condo">Condo</option>
                    {/* Add more options as needed */}
                </select>
                </div>

                <p className='text-lg font-semibold'>Description of the House:</p>
                <textarea 
                    type='text'
                    rows={4}
                    id='description' 
                    value={description}
                    onChange={onChange}
                    placeholder='Description'
                    required
                    className="w-full resize-none px-4 py-2 text-sm md:text-base text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 whitespace-pre-line"
                />

                <div className='flex space-x-6 my-3'>
                    <div>
                        <p className='text-lg font-semibold'>Bedrooms:</p>
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
                        <p className='text-lg font-semibold'>Baths:</p>
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

                

                <div className="flex items-center my-3">
                <p className="text-lg font-semibold mr-4">Parking Spot:</p>
                <div className="flex items-center space-x-4">
                    <input
                    type="radio"
                    id="yesparking"
                    name="parking"
                    value={true}
                    onChange={onChange}
                    checked={parking}
                    className="w-4 h-4 border-gray-300 rounded-full focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    />
                    <label htmlFor="yesparking">Yes</label>

                    <input
                    type="radio"
                    id="noparking"
                    name="parking"
                    value={false}
                    onChange={onChange}
                    checked={!parking}
                    className="w-4 h-4 border-gray-300 rounded-full focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    />
                    <label htmlFor="noparking">No</label>
                </div>
                </div>

                <div className="flex items-center my-3">
                    <div className="">
                        <p className='text-lg font-semibold'>
                            Floor Area:
                        </p>
                        <div className="flex justify-center items-center space-x-6">
                            <input 
                            type="number" 
                            id='floorArea' 
                            value={floorArea}
                            onChange={onChange}
                            min="0"
                            required
                            className='w-full px-4 py-2 text-sm md:text-base text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center'
                            />
                            <p>Sqm</p>
                        </div>
                        
                    </div>
                </div>
                <div className="flex items-center mb-3">
                    <div className="">
                        <p className='text-lg font-semibold'>
                            Price (₱):
                        </p>
                        <div className="flex justify-center items-center space-x-6">
                            <input 
                            type="number" 
                            id='Price' 
                            value={Price}
                            onChange={(e) => {
                                const value = e.target.value;
                                // Check if the input is a valid float number
                                if (/^\d*\.?\d*$/.test(value)) {
                                    // Update the state with the new value
                                    onChange(e);
                                }
                            }}
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

                <button type='submit' className='mb-6 w-full px-7 py-3 bg-[#ce6c10] text-white font-medium text-sm uppercase rounded shadow-md hover:bg-[#BD5B00] hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-[#8a4300] active:shadow-lg transition duration-150 ease-in-out'
                >Add Property</button>
            </form>
                    </div>
                </div>
            </div>
            
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            
        </div>
    )
}

export default AddPropertyModal