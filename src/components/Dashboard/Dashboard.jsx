// Redux
import { useSelector } from "react-redux";

// Libraries and Packages
import { useNavigate } from "react-router-dom";

// Components
import DashCardTop from "./DashBoardTop/DashCardTop";
import DashCardMiddle from "./DashBoardMiddle/DashCardMiddle";
import DashCardBottom from "./DashCardBottom";

export default function Dashboard() {
    const navigate = useNavigate()
    const payments = useSelector((state) => state.payments.payments)

    const navigatePayment = () => navigate('/payment')
    const navigateManageShops = () => navigate('/shopManagement')
    const navigateAnomaly = () => navigate('/anomalyList')
    const navigateSubscription = () => navigate('/subscription')

    return (
        <div className="bg-gray-100 min-h-screen p-3 xs:p-4 sm:p-4 md:p-6 lg:p-2">
            <div className="max-w-19xl mx-auto grid grid-cols-1 gap-4 md:gap-6 lg:gap-8">
                <DashCardTop 
                    navigateManageShops={navigateManageShops} 
                    navigateAnomaly={navigateAnomaly} 
                />
                <DashCardMiddle />
                <DashCardBottom 
                    payments={payments} 
                    navigatePayment={navigatePayment} 
                    navigateSubscription={navigateSubscription} 
                />
            </div>
        </div>
    );
}