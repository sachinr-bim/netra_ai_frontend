import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  fetchAnomaliesForTenant,
  filterAnomalies,
  setCurrentPage
} from "../../reduxToolkit/slices/anomalySlice";
import { fetchShopsByTenantAPI } from "../../reduxToolkit/slices/shopSlice";
import AnomalyFilter from "./AnomalyFilter";
import AnomalyTable from "./AnomalyTable";
import SearchIcon from "../../assets/icons/SearchIcon";

export default function Anomaly() {
  const dispatch = useDispatch();
  const { 
    anomalies, 
    filteredAnomalies, 
    loading, 
    pagination 
  } = useSelector(state => state.anomaly);
  const shops = useSelector(state => state.shops.shops);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ 
    shopId: "",
    anomalyType: [], 
    feedbackStatus: "",
    page: 1,
    pageSize: 12
  });

  useEffect(() => {
    dispatch(fetchAnomaliesForTenant());
    dispatch(fetchShopsByTenantAPI());
  }, [dispatch]);

  useEffect(() => {
    if (filters.shopId || filters.anomalyType.length > 0) {
      dispatch(filterAnomalies(filters));
    }
  }, [dispatch, filters]);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
    setFilters(prev => ({ ...prev, page }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--theme-color)]"></div>
      </div>
    );
  }

  const anomaliesToDisplay = filters.shopId || filters.anomalyType.length > 0 
    ? filteredAnomalies 
    : anomalies;

  const formattedAnomalies = anomaliesToDisplay.map(anomaly => {
    const shop = shops.find(shop => shop.id === anomaly.shop_id);
    return {
      id: anomaly.anomaly_id,
      dateTime: new Date(anomaly.event_recorded_dt).toLocaleString(),
      shopName: shop?.name || 'Unknown Shop',
      cameraName: `Camera ${anomaly.camera_id}`,
      detectionType: anomaly.anomaly_type,
      anomalyName: anomaly.anomaly_name,
      videoLink: anomaly.video_link,
      userFeedback: anomaly.feedback,
      correctedLabel: anomaly.modified_by !== anomaly.created_by ? 'Corrected' : 'Unverified'
    };
  });

  const anomalyTypes = [...new Set(anomalies.map(anomaly => anomaly.anomaly_type))];

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-6 lg:p-4">
      <div className="max-w-screen mx-auto">
        <div className="bg-white mb-6 p-4 md:p-6 rounded-xl">
          {/* Search and Filter Row - EXACTLY as you had it, only made container responsive */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search anomalies..."
                className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--theme-color)]"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 border border-[var(--theme-color)] text-[var(--theme-color)] rounded-md hover:bg-[var(--theme-color)] hover:text-white transition-colors"
            >
              {showFilters ? 'Hide Filters' : 'Filters'}
            </button>
          </div>

          {showFilters && (
            <AnomalyFilter 
              shops={shops}
              anomalyTypes={anomalyTypes} 
              filters={filters}
              setFilters={setFilters}
            />
          )}
        </div>

        <AnomalyTable 
          anomalies={formattedAnomalies} 
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}