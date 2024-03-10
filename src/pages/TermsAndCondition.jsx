import HomeHeader from "../components/HomeHeader"
import Background from "../pages/imgs/background.jpg"
import Footer from "../components/Footer"


const TermsAndCondition = () => {
    
    return (

        <>
        <HomeHeader />
        
        <div className="w-full h-screen flex items-center justify-center bg-cover bg-center bg-no-blur overflow-x-auto"
                style={{ backgroundImage: `url(${Background})` }}>
                <style>
                    {`
                        ::-webkit-scrollbar {
                            width: 10px; 
                        }
                        ::-webkit-scrollbar-track {
                            background-color: #f1f1f1; 
                        }
                        ::-webkit-scrollbar-thumb {
                            background-color: #888; 
                            border-radius: 5px;
                        }
                        ::-webkit-scrollbar-thumb:hover {
                            background-color: #555; 
                        }
                    `}
                </style>
                <div className="bg-[#FEECDB] bg-opacity-85 rounded-lg shadow-md p-5 max-w-md overflow-hidden">
                    <div className="bg-[#ffd7b1] rounded-lg shadow-md p-4 mb-4">
                        <h2 className="text-2xl font-bold text-center text-[#4B2C1A]">Terms and Conditions</h2>
                    </div>
                    <div className="overflow-y-auto h-48">
                        <h3 className="text-m font-semibold text-[#4B2C1A]">Acknowledgement</h3>
                        <p className="text-gray-800">
                        These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.
                        <br/>
                        <br/>
                        Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.
                        <br/>
                        <br/>
                        By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.
                        <br/>
                        <br/>
                        You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.
                        <br/>
                        <br/>
                        Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the Privacy Policy of the Company. Our Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your personal information when You use the Application or the Website and tells You about Your privacy rights and how the law protects You. Please read Our Privacy Policy carefully before using Our Service.
                        </p>
                    </div>
                </div>
            </div>


    <Footer/>
        </>
    )
}

export default TermsAndCondition