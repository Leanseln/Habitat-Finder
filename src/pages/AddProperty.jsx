import { useState } from 'react'
import Loading from '../hooks/Loading'
import { toast } from 'react-toastify'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth } from 'firebase/auth';
import { v4 as uuidv4} from "uuid";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router';

const AddProperty = () => {

    const auth = getAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({

        name: "",
        bedrooms: 1,
        bathrooms: 1,
        address: '',
        city: '',
        floorArea: 0,
        parking: false,
        description: '',
        Price: 0,
        images: {},
    });

    const {
        
        name, 
        bedrooms, 
        bathrooms, 
        address, 
        floorArea,
        city,
        parking,
        description, 
        Price, 
        images } = formData;

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
        const docRef = await addDoc(collection(db, "listings"), formDataCopy);
        setLoading(false);
        toast.success("Property Added Successfully");
        navigate("/profile");
    }

    if(loading) {
        return <Loading />
    }
    return (
        <main className='max-w-md mx-auto p-10 shadow-lg mt-10'>
            <h1 className='text-3xl text-center mt-6 font-bold'>
                Add Property
            </h1>
            <form onSubmit={onSubmit}>
                <p className='text-sm md:text-base mt-6 font-semibold'>Add Your Home</p>
                
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
                    className="w-full px-4 py-2 text-sm md:text-base text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
                />

                <p className='text-lg mt-6 font-semibold'>Parking Spot</p>
                <div className='flex'>
                    <button 
                        type='button' 
                        id='parking' 
                        value={true}
                        onClick={onChange}
                        className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${ !parking ? "bg-white text-black" : "bg-slate-600 text-white"}`}
                    >Yes</button>

                    <button 
                        type='button' 
                        id='parking' 
                        value={false}
                        onClick={onChange}
                        className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${ parking ? "bg-white text-black" : "bg-slate-600 text-white"}`}
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
                            <p>SquareMeter</p>
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
                            <p> /Month</p>
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

                <button type='submit' className='mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'>Add Property</button>
            </form>
        </main>
    )
}

export default AddProperty