import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { db } from "../firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/userSlice";

const OAuth = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onGoogleClick = async () => {
        try {
            const auth = getAuth();
    
            const provider = new GoogleAuthProvider();
            
            const result = await signInWithPopup(auth, provider)
            const user = result.user;
            console.log(user)
            const {uid, emailVerified, displayName, email:userEmail, photoURL} = user
            
            // user check if already exist
            const docRef = doc(db, "users", user.uid);

            const docSnap = await getDoc(docRef)

            if(!docSnap.exists()) {
                await setDoc(docRef, {
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL,
                    timestamp: serverTimestamp(),
                })
            }
            dispatch(setCredentials({uid, emailVerified, displayName, email:userEmail, photoURL}))
            navigate('/')
            console.log(auth)
        } catch (error) {
            toast.error("Could not authorized with Google");
        }
    }

    return (
        <button type="button" onClick={onGoogleClick} className="flex items-center justify-center w-full mb-6 bg-[#df4141] text-white px-7 py-3 uppercase text-[12px] lg:text-sm font-medium hover:bg-[#ad4b4b] active:bg-[#833434] shadow-md hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out rounded">
            <FcGoogle className="text-2xl bg-white rounded-full mr-2"/> Continue with Google
        </button>
    )
}

export default OAuth