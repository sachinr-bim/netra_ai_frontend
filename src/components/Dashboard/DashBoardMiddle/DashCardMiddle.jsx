import { useSelector,useDispatch } from "react-redux";
import { fetchAnomaliesForTenant } from "../../../reduxToolkit/slices/anomalySlice";
import { fetchShopsByTenantAPI } from "../../../reduxToolkit/slices/shopSlice";

import AnomalyChart from "./AnomalyChart";
import VisitorsChart from "./VisitorsChart";
import { useEffect } from "react";

const COLORS = {
  anomalies: "#FF6B6B",
  visitors: {
    male: "#0982ce",
    female: "#fc98fc"
  }
};

const TIME_OPTIONS = [
  { value: "currentMonth", label: "Current Month" },
  { value: "previousMonth", label: "Previous Month" },
  { value: "currentYear", label: "Current Year" }
];

export default function DashCardMiddle() {
  const anomalies = useSelector((state) => state.anomaly.anomalies);
  const shops = useSelector((state) => state.shops.shops)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchShopsByTenantAPI())
  },[dispatch])

  useEffect(() => {
    dispatch(fetchAnomaliesForTenant())
  },[dispatch])
  
  return (
    <div className="bg-white mt-6 p-4 md:p-6 rounded-lg w-full">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-800">Dashboard</h2>
          <p className="text-xs text-gray-500">Track and analyze your key metrics</p>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnomalyChart 
          anomalies={anomalies}
          shops={shops}
          TIME_OPTIONS={TIME_OPTIONS} 
          COLORS={COLORS} 
        />
        
        <VisitorsChart TIME_OPTIONS={TIME_OPTIONS} COLORS={COLORS} />
      </div>
    </div>
  );
}