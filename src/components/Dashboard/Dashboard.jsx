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
        <div className="bg-gray-100">
            <DashCardTop navigateManageShops={navigateManageShops} navigateAnomaly={navigateAnomaly} />
            <DashCardMiddle />
            <DashCardBottom payments={payments} navigatePayment={navigatePayment} navigateSubscription={navigateSubscription} />
        </div>
    );
}