import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCameraAPI,fetchCamerasByShopIdAPI } from '../../../../../reduxToolkit/slices/cameraSlice';
import Swal from 'sweetalert2';

export default function AddCamera({ selectedShop, setAddCamera }) {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.cameras);
  const [formData, setFormData] = useState({
    shop_id: selectedShop.id || "",
    name: "",
    number: "",
    location: "",
    ip_address: "",
    manufacturer: "",
    camera_model_number: "",
    camera_model_year: ""
  });

  console.log('Addin Camera', formData)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.shop_id) {
      Swal.fire('Error', 'Shop ID is required', 'error');
      return;
    }

    try {
      const result = await dispatch(createCameraAPI(formData));
      
      if (createCameraAPI.fulfilled.match(result)) {
        Swal.fire('Success', 'Camera added successfully!', 'success');
        setFormData({
          shop_id: selectedShop.id || "",
          name: "",
          number: "",
          location: "",
          ip_address: "",
          manufacturer: "",
          camera_model_number: "",
          camera_model_year: ""
        });
        setAddCamera(false)
        dispatch(fetchCamerasByShopIdAPI(selectedShop.id))

      } else {
        throw new Error(result.payload || "Failed to add camera");
      }
    } catch (err) {
      Swal.fire('Error', err.message || 'Failed to add camera', 'error');
    }
  };

  return (
     <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold">Add Camera Details</h3>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="col-span-4">
            <label className="block font-semibold">Camera Name*</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md mt-1 bg-white" 
              required
              placeholder='"e.g. Entrance Camera'
            />
          </div>

          <div className="col-span-2">
            <label className="block font-semibold">Camera Number*</label>
            <input 
              type="text" 
              name="number"
              value={formData.number}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md mt-1 bg-white" 
              required
              placeholder="e.g. CAM-001"
            />
          </div>

          <div className="col-span-2">
            <label className="block font-semibold">Location*</label>
            <input 
              type="text" 
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md mt-1 bg-white" 
              required
              placeholder="e.g. Main Entrance"
            />
          </div>

          <div>
            <label className="block font-semibold">IP Address*</label>
            <input 
              type="text" 
              name="ip_address"
              value={formData.ip_address}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md mt-1 bg-white" 
              required
              placeholder="e.g. 192.168.1.101"
            />
          </div>

          <div>
            <label className="block font-semibold">Manufacturer*</label>
            <input 
              type="text" 
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md mt-1 bg-white" 
              required
              placeholder="e.g. Hikvision"
            />
          </div>

          <div>
            <label className="block font-semibold">Model Number</label>
            <input 
              type="text" 
              name="camera_model_number"
              value={formData.camera_model_number}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md mt-1 bg-white" 
              placeholder="e.g. DS-2CD2087G2-L"
            />
          </div>

          <div>
            <label className="block font-semibold">Model Year</label>
            <input 
              type="text" 
              name="camera_model_year"
              value={formData.camera_model_year}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md mt-1 bg-white" 
              placeholder="e.g. 2023"
            />
          </div>
        </div>

        {/* <div className="mt-4">
          <label className="block font-semibold">Configuration</label>
          <input 
            type="text" 
            className="w-full border border-gray-300 p-2 rounded-md mt-1 bg-white" 
            readOnly 
          />
        </div> */}

          <div className='flex gap-2 justify-end' >
            <button 
            type="submit"
            className="mt-4 border border-[var(--theme-color)] text-[var(--theme-color)] hover:bg-[var(--theme-color)] hover:text-white px-3 py-1 rounded-md flex items-center gap-1 transition-colors"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Adding...' : 'Add Camera'}
          </button>
          <button
            className="mt-4 border border-[var(--theme-color)] text-[var(--theme-color)] hover:bg-[var(--theme-color)] hover:text-white px-3 py-1 rounded-md flex items-center gap-1 transition-colors"
            disabled={status === 'loading'}
            onClick={() => setAddCamera(false)}
          >
            Cancel
          </button>
          </div>
      </form>
    </div>
  );
}