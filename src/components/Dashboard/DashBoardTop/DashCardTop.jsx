// React
import { useState } from "react";

//Redux
import { useSelector } from "react-redux";

// Icons
import ShopIcon from "../../../assets/icons/ShopIcon";

// Libraries
import "react-circular-progressbar/dist/styles.css";

// Images
import MapPreview from "../../../assets/images/map.png"

// Components
import ShopMapView from "../../Shops/ShopMapView";

export default function DashCardTop({navigateManageShops}){

  const shops = useSelector((state) => state.shops.shops)

  const [isMapOpen, setIsMapOpen] = useState(false)

  const handleMapOpen = () => {
    setIsMapOpen(true)
  }

  return(
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-4 md:mt-8">

          {isMapOpen && <ShopMapView onClose={() => setIsMapOpen(false)} shops={shops} />}

          {/* Total Shops Card */}
          <div className="bg-white p-4 md:p-20 rounded-xl md:rounded-2xl flex flex-col items-start gap-3 w-full md:w-2/2">
              <div className="flex items-center gap-3">
                  <div className="bg-[#79c6d9] p-2 md:p-3 rounded-lg md:rounded-xl text-white">
                      <ShopIcon size={20} md:size={24} />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-gray-800">Total Shops</h3>
              </div>
              <p className="text-gray-500 text-sm md:text-base">Five shops</p>
              <p className="text-gray-500 text-sm md:text-base">You (the shopowner) have five shops. You can manage your shops here.</p>
              <button 
                  className="bg-[#79c6d9] px-3 py-1.5 md:px-4 md:py-2 text-white rounded-lg mt-2 w-full text-sm md:text-base font-medium hover:bg-white border border-[#79c6d9] hover:text-[#79c6d9]" 
                  onClick={navigateManageShops}
              >
                  Manage Shop
              </button>
          </div>

        {/* Shop Locations Map Card */}
        <div className="bg-white p-4 md:p-6 rounded-lg w-full lg:w-2/2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <h1 className="text-base md:text-4xl font-semibold font-mono">Map View</h1>
            <button className={`bg-[var(--theme-color)] text-white text-xs md:text-sm px-3 py-1 md:px-4 md:py-2 rounded-md hover:bg-white border border-[var(--theme-color)] hover:text-[var(--theme-color)]` } onClick={handleMapOpen}>
              View Map
            </button>
          </div>
          {!isMapOpen &&  <img src={MapPreview} alt="Map Preview" className="w-full h-75" />}
        </div>
      </div>
  )
}