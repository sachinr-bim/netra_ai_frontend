// React
import { useState } from "react";

// Redux
import { useSelector,useDispatch } from "react-redux";
import { selectShop } from "../../../reduxToolkit/slices/shopSlice";

// Packages and Libraries
import { useNavigate } from "react-router-dom";

// Components
import AddShop from "./AddShop";

// Icons
import { LocationIcon } from "../../../assets/icons/LocationIcon";

export default function ShopManagement() {

  const dispatch = useDispatch()
  const shops = useSelector((state) => state.shops.shops);
  
  const navigate = useNavigate()

  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleOpenAdd = () => {
    setIsAddOpen(!isAddOpen);
  };

  const showShopDetails = (id) => {
    const shop = shops.find(shop => shop.id === id);
    if (shop) {
      dispatch(selectShop(shop));
    }
    navigate(`/shopDetails/${id}`);
  }

  return (
    <div className="bg-gray-100">
      {/* Modal */}
      <AddShop isOpen={isAddOpen} onClose={handleOpenAdd} />
      {/* Modal End */}

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 md:p-6 rounded-xl mb-6 gap-4">
        <h1 className="text-xl md:text-2xl font-bold">Shop Management</h1>
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
          <input
            type="text"
            placeholder="Search shops..."
            className="border p-2 rounded-lg w-full md:w-64"
          />
          <button 
            className="bg-[var(--theme-color)] hover:bg-white text-white px-4 py-2 rounded-lg hover:text-[var(--theme-color)] hover:border hover:border-[var(--theme-color)] transition-colors duration-200 whitespace-nowrap"
            onClick={handleOpenAdd}
          >
            Add Shop
          </button>
        </div>
      </div>

      {/* Shops Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {shops.map((shop, index) => (
          <div key={index} className="bg-white rounded-xl p-4 hover:shadow-md hover:border border-[var(--theme-color)] shadow-[var(--theme-color)] transition-shadow duration-200" onClick={()=> showShopDetails(shop.id)} >
            <div className="aspect-w-16 aspect-h-9 mb-4 overflow-hidden rounded-xl">
              {shop.image ? (
                <img 
                  src={shop.image} 
                  alt={shop.name} 
                  className="w-full h-40 sm:h-48 object-cover"
                />
              ) : (
                <img 
                  src="https://cdn-icons-png.freepik.com/256/869/869636.png?semt=ais_hybrid" 
                  alt={shop.name} 
                  className="w-full h-40 sm:h-48 object-contain p-4 bg-gray-100"
                />
              )}
            </div>
            
            <div className="flex justify-between items-start">
              <h2 className="text-lg md:text-xl font-semibold mb-2 line-clamp-1">{shop.name}</h2>
              <button className="text-xl md:text-2xl font-semibold">⋮</button>
            </div>
            
            <div className="space-y-1">
              <p className="text-[var(--theme-color)] text-sm md:text-base flex items-center gap-1">
                <LocationIcon size={16} width="1em" /> 
                <span className="line-clamp-1">{shop.location}</span>
              </p>
              <p className="text-gray-600 text-sm md:text-base">Shop Admin: {shop.adminCount}</p>
              <p className="text-gray-600 text-sm md:text-base">Total Camera: {shop.cameras.length} cameras</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}