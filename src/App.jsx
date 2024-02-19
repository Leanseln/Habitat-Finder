import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import LandingPage from "./pages/LandingPage";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./hooks/PrivateRoute";
import 'react-toastify/dist/ReactToastify.css';
import AddProperty from "./pages/AddProperty";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import EditProperty from "./pages/EditProperty";

function App() {
  
  return (
    <>
      <BrowserRouter>
        
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/landingpage" element={<LandingPage />} />
          <Route path="/addproperty" element={<PrivateRoute />}>
            <Route path="/addproperty" element={<AddProperty />} />
          </Route>
          <Route path="/editproperty/:listingId" element={<EditProperty />} />
          <Route path="/property/:listingId" element={<PropertyDetailPage />} />
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
