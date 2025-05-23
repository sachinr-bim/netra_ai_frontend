import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchShopByIdAPI } from "../../../reduxToolkit/slices/shopSlice";

// Components
import ShopDetailsMenu from "./ShopDetailsMenu/ShopDetailsMenu";
import Overview from "./ShopDetailsMenu/Overview";
import EdgeDevice from "./ShopDetailsMenu/EdgeDevice/EdgeDevice";
import Camera from './ShopDetailsMenu/Camera/Camera'
import AddCamera from "./ShopDetailsMenu/Camera/AddCamera";
import ShopCurrentPlan from "./ShopDetailsMenu/CurrentPlan/ShopCurrentPlan";
import DeleteShop from "./ShopDetailsMenu/DeleteShop";
import ShopMapView from "../ShopMapView";
import ShopAdmin from "./ShopDetailsMenu/ShopAdmin/ShopAdmin";
import ShopAnomaly from "./ShopDetailsMenu/ShopAnomaly/ShopAnomaly"

// Icons and Images
import { LocationIcon } from "../../../assets/icons/LocationIcon";
import MapPreview from '../../../assets/images/map.png';

const ShopDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedShop, status, error } = useSelector((state) => state.shops);
  const [activeTab, setActiveTab] = useState('overview');
  const [isMapOpen, setIsMapOpen] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchShopByIdAPI(id));
    }
  }, [id, dispatch]);

  const handleMapOpen = () => {
    setIsMapOpen(true);
  };

  const renderMenuContent = () => {
    switch(activeTab) {
      case 'overview':
        return <Overview selectedShop={selectedShop} />;
      case 'edgeDevice':
        return <EdgeDevice selectedShop={selectedShop} shopId={selectedShop.id} />;
      case 'cameraDetails':
        return <Camera selectedShop={selectedShop} />  
      case 'addCameraDetails':
        return <AddCamera id={selectedShop.id} />;
      case 'shopAnomalies':
        return <ShopAnomaly id={selectedShop.id} />;  
      case 'subscription':
        return <ShopCurrentPlan shopId={id} />;
      case 'shopAdmin':
        return <ShopAdmin shopId={selectedShop.id} />
      case 'deleteShop':
        return <DeleteShop selectedShop={selectedShop} setActiveTab={setActiveTab} id={selectedShop.id} />;
      default:
        return <Overview selectedShop={selectedShop} />;
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--theme-color)]"></div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="bg-white p-4 rounded-xl text-red-500 text-center mt-8">
        Error: {error || 'Failed to load shop details'}
      </div>
    );
  }

  if (!selectedShop) {
    return (
      <div className="bg-white p-4 rounded-xl text-center mt-8">
        Shop not found
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
      {isMapOpen && (
        <ShopMapView 
          onClose={() => setIsMapOpen(false)} 
          shops={[selectedShop]} 
          initialCenter={{
            lat: selectedShop.geo_latitude || 0,
            lng: selectedShop.geo_longitude || 0
          }}
        />
      )}

      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        {/* Shop Info Section */}
        <div className="relative rounded-lg overflow-hidden flex-4 min-h-80">
          {selectedShop.shop_pic ? (
            <img
              src={selectedShop.shop_pic}
              alt="Shop"
              className="w-full h-60 object-cover"
              onError={(e) => {
                e.target.src = "https://cdn-icons-png.freepik.com/256/869/869636.png?semt=ais_hybrid";
                e.target.className = "w-full h-60 object-contain p-4 bg-gray-100";
              }}
            />
          ) : (
            <div className="w-full h-60 bg-gray-100 flex items-center justify-center">
              <span className="text-6xl">No Image Available</span>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-sm p-4 md:p-6 rounded-t-lg">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold">{selectedShop.name}</h2>
                <p className="text-gray-600 line-clamp-1">{selectedShop.address}</p>
              </div>
              <div className="flex flex-col gap-1 text-sm md:text-base">
                <p className="text-[var(--theme-color)] flex items-center gap-1">
                  <LocationIcon size={16} width="1em" />
                  <span className="line-clamp-1">{selectedShop.address}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-lg p-4 flex-1">
          <h2 className="text-xl md:text-2xl font-bold mb-2">{selectedShop.name} Location</h2>
          <div className="flex flex-col h-60">
            <img
              src={MapPreview}
              alt="Map"
              className="w-full h-48 md:h-full object-cover rounded-lg flex-1"
            />
            <div className="flex justify-center mt-2">
              <button 
                className="bg-[var(--theme-color)] hover:bg-white border border-[var(--theme-color)] text-white hover:text-[var(--theme-color)] px-6 py-2 rounded-lg transition-colors"
                onClick={handleMapOpen}
              >
                View Map in Full Screen
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Shop Details Content */}
      <div className="bg-white rounded-lg p-4 md:flex">
        <ShopDetailsMenu 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          shopId={id}
        />
        
        <div className="flex-1 p-4">
          {renderMenuContent()}
        </div>
      </div>
    </div>
  );
};

export default ShopDetails;