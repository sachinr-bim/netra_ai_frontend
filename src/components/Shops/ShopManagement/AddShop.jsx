import { useState } from "react";

// Redux
import { useDispatch } from "react-redux";
import { createShopAPI } from "../../../reduxToolkit/slices/shopSlice";

export default function AddShop({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    adminCount: "",
    cameras: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Prepare the data for API
      const shopData = {
        name: formData.name,
        location: formData.location,
        admin_count: parseInt(formData.adminCount),
        camera_count: parseInt(formData.cameras),
        // Add other required fields as per your API requirements
      };

      // Dispatch the API call
      const resultAction = await dispatch(createShopAPI(shopData));
      
      if (createShopAPI.fulfilled.match(resultAction)) {
        onClose(); // Close the modal on success
      } else if (createShopAPI.rejected.match(resultAction)) {
        setError(resultAction.payload || "Failed to create shop");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md md:max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 md:p-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">Add Shop Profile</h2>
          </div>

          {/* Error message display */}
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="flex flex-col items-center mb-4">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              <span className="text-2xl">📷</span>
            </div>
            <button className="mt-2 px-2 py-1 md:px-3 md:py-1 text-xs md:text-sm border rounded-md hover:bg-gray-100">
              Upload new picture
            </button>
            <button className="mt-2 px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm bg-gray-500 text-white rounded-full hover:bg-gray-600">
              Delete
            </button>
          </div>

          <form onSubmit={handleAdd}>
            <div className="mb-3">
              <label htmlFor="name" className="block text-sm md:text-base lg:text-xl font-semibold mb-1">Shop Name</label>  
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                placeholder="Shop Name" 
                className="w-full h-10 md:h-12 p-2 border rounded-lg text-sm md:text-base" 
                onChange={handleChange} 
                required
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="location" className="block text-sm md:text-base lg:text-xl font-semibold mb-1">Location</label>
              <input 
                type="text" 
                id="location" 
                name="location" 
                value={formData.location} 
                placeholder="Location" 
                className="w-full h-10 md:h-12 p-2 border rounded-lg text-sm md:text-base" 
                onChange={handleChange} 
                required
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="cameras" className="block text-sm md:text-base lg:text-xl font-semibold mb-1">Total Camera</label>
              <input 
                type="number" 
                id="cameras" 
                name="cameras" 
                value={formData.cameras} 
                placeholder="Total Camera" 
                className="w-full h-10 md:h-12 p-2 border rounded-lg text-sm md:text-base" 
                onChange={handleChange} 
                min="0"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="adminCount" className="block text-sm md:text-base lg:text-xl font-semibold mb-1">Total Admin</label>
              <input 
                type="number" 
                id="adminCount" 
                name="adminCount" 
                value={formData.adminCount} 
                placeholder="Total Admin" 
                className="w-full h-10 md:h-12 p-2 border rounded-lg text-sm md:text-base" 
                onChange={handleChange} 
                min="0"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
              <button 
                type="button" 
                className="px-3 py-1 md:px-4 md:py-2 border border-[var(--theme-color)] text-[var(--theme-color)] rounded-lg hover:bg-[var(--theme-color)] hover:text-white transition-colors text-sm md:text-base"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-3 py-1 md:px-4 md:py-2 bg-[var(--theme-color)] text-white rounded-lg hover:bg-white hover:text-[var(--theme-color)] hover:border hover:border-[var(--theme-color)] transition-colors text-sm md:text-base"
                disabled={isLoading}
              >
                {isLoading ? 'Creating...' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}