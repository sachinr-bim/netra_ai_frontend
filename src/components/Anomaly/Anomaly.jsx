import { useState } from "react";

// Redux
import { useSelector } from "react-redux";

// Components
import AnomalyFilter from "./AnomalyFilter";
import AnomalyTable from "./AnomalyTable";

// Icons
import SearchIcon from "../../assets/icons/SearchIcon";

export default function Anomaly() {
  const { anomaly } = useSelector(state => state.anomaly);
  const { shops } = useSelector(state => state.shops);
  const detectionTypes = [...new Set(anomaly.map(item => item.detectionType))];
  
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedShopName, setSelectedShopName] = useState("");
  const [filters, setFilters] = useState({ detectionType: "", feedbackStatus: "" });

  const hasActiveFilters = selectedShopName || searchTerm || filters.detectionType || filters.feedbackStatus;

  const filteredAnomalies = anomaly.filter(ele => {
    const matchesSearch = !searchTerm || 
      [ele.shopName, ele.cameraName, ele.detectionType].some(field => 
        field.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesShop = !selectedShopName || ele.shopName === selectedShopName;
    const matchesType = !filters.detectionType || ele.detectionType === filters.detectionType;
    const matchesFeedback = !filters.feedbackStatus || 
      (filters.feedbackStatus === "withFeedback" ? ele.userFeedback : !ele.userFeedback);
      
    return matchesSearch && matchesShop && matchesType && matchesFeedback;
  });

  const clearFilters = () => {
    setSelectedShopName("");
    setSearchTerm("");
    setFilters({ detectionType: "", feedbackStatus: "" });
  };

  return (
    <div className="bg-gray-100 p-4 md:p-6">
      {/* Search and Filter Bar */}
      <div className="bg-white mb-6 p-4 md:p-7 rounded-xl">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search here..."
              className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--theme-color)]"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 border border-[var(--theme-color)] text-[var(--theme-color)] rounded-md hover:bg-[var(--theme-color)] hover:text-white transition-colors"
            >
              {showFilters ? 'Close Filter' : 'Filters'}
            </button>
            {hasActiveFilters && (
              <button 
                onClick={clearFilters}
                className="px-4 py-2 text-gray-600 rounded-md hover:bg-gray-100 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Expanded Filters Section */}
        <AnomalyFilter shops={shops} detectionTypes={detectionTypes} showFilters={showFilters} selectedShopName={setSelectedShopName} setSelectedShopName={setSelectedShopName} filters={filters} setFilters={setFilters} />
        
      </div>

      {/* Anomaly Table */}
      <AnomalyTable filteredAnomalies={filteredAnomalies} />
      
    </div>
  );
}