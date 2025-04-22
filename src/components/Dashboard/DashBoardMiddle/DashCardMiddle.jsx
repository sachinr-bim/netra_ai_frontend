import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { aggregateAnomalyData } from "../../../reduxToolkit/slices/anomalySlice";
import { aggregateVisitorData } from "../../../reduxToolkit/slices/visitorsSlice";
import AnomalyChart from "./AnomalyChart";
import VisitorsChart from "./VisitorsChart";

const COLORS = {
  anomalies: "#FF6B6B",
  visitors: {
    male: "#0982ce",
    female: "#fc98fc"
  }
};

const ANOMALY_TYPES = [
  { value: "all", label: "All Types" },
  { value: "Theft Alerts", label: "Theft Alerts" },
  { value: "Suspicious behaviours", label: "Suspicious behaviours" },
  { value: "Fighting Behaviour", label: "Fighting Behaviour" },
  { value: "Aggressive", label: "Aggressive" },
  { value: "Gesture Detection", label: "Gesture Detection" },
  { value: "Fall Detection", label: "Fall Detection" },
  { value: "Weapon Detection", label: "Weapon Detection" }
];

const TIME_OPTIONS = [
  { value: "currentMonth", label: "Current Month" },
  { value: "previousMonth", label: "Previous Month" },
  { value: "currentYear", label: "Current Year" }
];

export default function DashCardMiddle() {
  const dispatch = useDispatch();
  
  // Get data from Redux store
  const { aggregatedData: anomalyData } = useSelector(state => state.anomaly);
  const { aggregatedData: visitorData } = useSelector(state => state.visitor);

  // Trigger data aggregation on component mount
  useEffect(() => {
    // Get current date range (last month to now)
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(endDate.getMonth() - 1);
    
    dispatch(aggregateAnomalyData({ startDate, endDate }));
    dispatch(aggregateVisitorData({ startDate, endDate }));
  }, [dispatch]);

  // Anomalies chart state
  const [anomaliesDateRange, setAnomaliesDateRange] = useState({
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)), // Default: last month
    end: new Date()
  });
  
  const [anomalyType, setAnomalyType] = useState("all");
  
  // Visitors chart state
  const [visitorsDateRange, setVisitorsDateRange] = useState({
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)), // Default: last month
    end: new Date()
  });

  const getAnomaliesData = () => {
    // Filter based on date range
    const filteredData = (anomalyData.all || []).filter(item => {
      const itemDate = new Date(item.dateTime);
      return itemDate >= anomaliesDateRange.start && itemDate <= anomaliesDateRange.end;
    });
    
    return anomalyType === "all" 
      ? filteredData.map(shop => ({
          name: shop.shopName,
          count: shop.count,
          type: shop.type
        }))
      : filteredData.filter(shop => shop.type === anomalyType).map(shop => ({
          name: shop.shopName,
          count: shop.count,
          type: shop.type
        }));
  };

  const getVisitorsData = () => {
    // Filter based on date range
    const filteredData = (visitorData.all || []).filter(item => {
      const itemDate = new Date(item.dateTime);
      return itemDate >= visitorsDateRange.start && itemDate <= visitorsDateRange.end;
    });
    
    return filteredData.map(shop => ({
      name: shop.shopName,
      male: shop.male,
      female: shop.female
    }));
  };

  const anomaliesData = getAnomaliesData();
  const visitorsData = getVisitorsData();

  const renderCustomizedLegend = (props) => {
    const { payload } = props;
    return (
      <div className="flex justify-center gap-4 mt-2">
        {payload.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center gap-1 mt-4">
            <div 
              className="w-3 h-3 rounded-sm" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-md text-gray-700">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white mt-6 p-4 md:p-6 rounded-lg w-full">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-800">Dashboard</h2>
          <p className="text-xs text-gray-500">Track and analyze your key metrics</p>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">

        <AnomalyChart anomaliesDateRange={anomaliesDateRange} setAnomaliesDateRange={setAnomaliesDateRange} TIME_OPTIONS={TIME_OPTIONS} 
          anomalyType={anomalyType} setAnomalyType={setAnomalyType} ANOMALY_TYPES={ANOMALY_TYPES} anomaliesData={anomaliesData} 
          COLORS={COLORS} />
        
        <VisitorsChart visitorsDateRange={visitorsDateRange} setVisitorsDateRange={setVisitorsDateRange} TIME_OPTIONS={TIME_OPTIONS} 
          visitorsData={visitorsData} renderCustomizedLegend={renderCustomizedLegend} COLORS={COLORS} />

      </div>
    </div>
  );
}