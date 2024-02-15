import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { db } from "../firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router";

const OAuth = () => {

    const navigate = useNavigate();

    const onGoogleClick = async () => {
        try {
            const auth = getAuth();
    
            const provider = new GoogleAuthProvider();

            const result = await signInWithPopup(auth, provider)
            const user = result.user;
            console.log(user)
            // user check if already exist
            const docRef = doc(db, "users", user.uid);

            const docSnap = await getDoc(docRef)

            if(!docSnap.exists()) {
                await setDoc(docRef, {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp(),
                })
            }
            navigate('/')
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