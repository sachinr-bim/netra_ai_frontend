import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchShopsByTenantAPI } from "../../../reduxToolkit/slices/shopSlice";
import { fetchCamerasByShopIdAPI } from "../../../reduxToolkit/slices/cameraSlice";
import { useNavigate } from "react-router-dom";
import AddShop from "./AddShop";
import { LocationIcon } from "../../../assets/icons/LocationIcon";

export default function ShopManagement() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shops, status, error } = useSelector((state) => state.shops);
  const { cameras } = useSelector((state) => state.cameras);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 8;

  useEffect(() => {
    dispatch(fetchShopsByTenantAPI());
  }, [dispatch]);

  useEffect(() => {
    if (shops?.id) {
      dispatch(fetchCamerasByShopIdAPI(shops.id));
    }
  }, [shops?.id, dispatch]);

  const handleOpenAdd = () => {
    setIsAddOpen(!isAddOpen);
  };

  const showShopDetails = (shopId) => {
  navigate(`/shopDetails/${shopId}`);
};

  // Filter shops based on search term
  const filteredShops = shops.filter(shop => 
    shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shop.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentShops = filteredShops.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredShops.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--theme-color)]"></div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="bg-white p-4 rounded-xl text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="bg-gray-100">
      <AddShop isOpen={isAddOpen} onClose={handleOpenAdd} />
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 md:p-6 rounded-xl mb-6 gap-4">
        <h1 className="text-xl md:text-2xl font-bold">Shop Management</h1>
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
          <input
            type="text"
            placeholder="Search shops..."
            className="border p-2 rounded-lg w-full md:w-64"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
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
      {filteredShops.length === 0 ? (
        <div className="bg-white p-8 rounded-xl text-center">
          <p className="text-gray-500 mb-4">
            {searchTerm ? "No shops match your search" : "No shops found"}
          </p>
          <button 
            className="bg-[var(--theme-color)] text-white px-4 py-2 rounded-lg hover:bg-white hover:text-[var(--theme-color)] hover:border hover:border-[var(--theme-color)] transition-colors duration-200"
            onClick={handleOpenAdd}
          >
            Add Your First Shop
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {currentShops.map((shop) => (
              <div 
                key={shop.id} 
                className="bg-white rounded-xl p-4 hover:shadow-md hover:border border-[var(--theme-color)] shadow-[var(--theme-color)] transition-shadow duration-200 cursor-pointer" 
                onClick={() => showShopDetails(shop.id)}
              >
                <div className="aspect-w-16 aspect-h-9 mb-4 overflow-hidden rounded-xl">
                  <img 
                    src="https://static.nike.com/a/images/f_auto/c8a2ec76-6665-4203-8852-f4ee668aaa7a/image.jpg"
                    alt="Shop" 
                    className="w-full h-40 sm:h-48 object-cover"
                    onError={(e) => {
                      e.target.src = "https://cdn-icons-png.freepik.com/256/869/869636.png?semt=ais_hybrid";
                      e.target.className = "w-full h-40 sm:h-48 object-contain p-4 bg-gray-100";
                    }}
                  />
                </div>
                
                <div className="flex justify-between items-start">
                  <h2 className="text-lg md:text-xl font-semibold mb-2 line-clamp-1">{shop.name}</h2>
                </div>
                
                <div className="space-y-1">
                  <p className="text-[var(--theme-color)] text-sm md:text-base flex items-center gap-1">
                    <LocationIcon size={16} width="1em" /> 
                    <span className="line-clamp-1">{shop.address}</span>
                  </p>
                  <p className="text-gray-600 text-sm md:text-base">Shop Admin: {shop.total_admin}</p>
                  <p className="text-gray-600 text-sm md:text-base">Total Camera: {cameras.length}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="inline-flex rounded-md shadow">
                <button
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-3 py-1 border-t border-b border-gray-300 text-sm font-medium ${
                      currentPage === number
                        ? 'bg-[var(--theme-color)] text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {number}
                  </button>
                ))}
                
                <button
                  onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
}