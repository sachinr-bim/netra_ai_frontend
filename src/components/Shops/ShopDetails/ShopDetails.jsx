// React
import React, { useState } from "react";

// Redux
import { useSelector } from "react-redux";

// Components
import ShopDetailsMenu from "./ShopDetailsMenu/ShopDetailsMenu";
import Overview from "./ShopDetailsMenu/Overview";
import EdgeDevice from "./ShopDetailsMenu/EdgeDevice";
import AddCamera from "./ShopDetailsMenu/AddCamera";
import ShopCurrentPlan from "./ShopDetailsMenu/ShopCurrentPlan";
import DeleteShop from "./ShopDetailsMenu/DeleteShop";
import ShopMapView from "../ShopMapView";

// Images
import MapPreview from '../../../assets/images/map.png'

const ShopDetails = () => {

  const shops = useSelector((state) => state.shops.shops)

  const [activeTab,setActiveTab] = useState('overview')
  const [isMapOpen, setIsMapOpen] = useState(false)

  const handleMapOpen = () => {
    setIsMapOpen(true)
  }

  const renderMenuContent = () => {
    switch(activeTab) {
      case 'overview':
        return <Overview />;
      case 'edgeDevice':
        return <EdgeDevice />  
      case 'addCameraDetails':
        return <AddCamera />;
      case 'subscription':
        return <ShopCurrentPlan />;
      case 'deleteShop':
        return <DeleteShop />    
      default:
        return <Overview />;
    }
  };
  
  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">

    {isMapOpen && <ShopMapView onClose={() => setIsMapOpen(false)} shops={shops} />}

      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        
        <div className="relative rounded-lg overflow-hidden flex-4 min-h-80">
          {/* Shop Background Image */}
          <img
            src="https://i.redd.it/the-newly-renovated-sailor-moon-store-in-tokyo-v0-64ti7re36mjd1.jpg?width=4032&format=pjpg&auto=webp&s=bb96249bd51937f15589fbe4e05c43c0e985b0bc"
            alt="Shop"
            className="w-full h-60 object-cover"
          />
          
          {/* Overlay Card */}
          <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-sm p-4 md:p-6 rounded-t-lg">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <h2 className="text-xl md:text-2xl font-bold">Sailor Shop</h2>
                <p className="text-gray-600">Modern & stylish clothes for you</p>
              </div>
              <div className="flex flex-wrap gap-2 md:gap-4 text-sm md:text-base text-[var(--theme-color)] mt-2 md:mt-0">
                <p>Location: New York Street, America</p>
                <p>Shop Admin: 10 members</p>
                <p>Total Cameras: 4</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section (now right side) */}
        <div className="bg-white rounded-lg p-4 flex-1">
          <h2 className="text-4xl font-bold mb-2 ">Sailor Shop Map</h2>
          <div className="flex flex-col h-60">
            <img
              src={MapPreview}
              alt="Map"
              className="w-75 h-48 md:h-full object-cover rounded-lg flex-1 "
            />
            <div className="flex justify-center">
              <button className="bg-[var(--theme-color)] hover:bg-white border border-[var(--theme-color)] text-white hover:text-[var(--theme-color)] px-6 py-2 rounded-lg transition-colors" onClick={handleMapOpen}>
                View Map in Full Screen
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Shop Details With Menu */}
      <div className="bg-white rounded-lg p-4 md:flex">
        
        <ShopDetailsMenu activeTab={activeTab} setActiveTab={setActiveTab} />

        {renderMenuContent()}
        
      </div>
    </div>
  );
};

export default ShopDetails;