import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import LandingPage from "./pages/LandingPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PropertyDetailPage from "./pages/PropertyDetailPage";
import VerifyPage from "./components/VerifyPage";
import EditPropertyModal from "./components/EditPropertyModal";
import Cars from './components/Cars'
import Carousels from "./components/Carousels";

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/pending" element={<VerifyPage />} />
          <Route path="/landingpage" element={<LandingPage />} />
          <Route path="/editproperty/:listingId" element={<EditPropertyModal />} />
          <Route path="/property/:listingId" element={<PropertyDetailPage />} />
          <Route path="/swiper" element={<Cars />} />
          <Route path="cars" element={<Carousels />} />
          
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />
    
    </>
  )
}

export default App
