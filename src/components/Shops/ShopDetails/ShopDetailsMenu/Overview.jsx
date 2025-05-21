import React, { useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { updateShopAPI } from '../../../../reduxToolkit/slices/shopSlice.js';
import { getCurrentUser } from '../../../../reduxToolkit/slices/authSlice.js'
import EditIcon from '../../../../assets/icons/EditIcon'

export default function Overview({ selectedShop }) {
  
  const { userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  
  const [editInfo, setEditInfo] = useState(false);
  const [formData, setFormData] = useState({
    name: selectedShop.name,
    address: selectedShop.address,
    total_cameras: selectedShop.total_cameras
  });

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const handleEditInfo = () => {
    if (editInfo) {
      // Save changes
      dispatch(updateShopAPI({
        shopId: selectedShop.id,
        shopData: {
          ...selectedShop,
          ...formData,
          coordinates: {
            lat: selectedShop.geo_latitude || 0,
            lng: selectedShop.geo_longitude || 0
          }
        }
      }));
    }
    setEditInfo(!editInfo);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="md:w-3/4 p-8">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl">Overview</h3>
        <button 
          className="border border-[var(--theme-color)] text-[var(--theme-color)] hover:bg-[var(--theme-color)] hover:text-white px-3 py-1 rounded-md flex items-center gap-1 transition-colors" 
          onClick={handleEditInfo}
        >
          {editInfo ? 'Save' : 'Edit'} <EditIcon height={20} />
        </button>
      </div>

      <div className="mt-4">
        <label className="block font-semibold">Shop Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md mt-1 bg-white"
          readOnly={!editInfo}
        />
      </div>

      <div className="mt-4">
        <label className="block font-semibold">Shop Owner Name</label>
        <input
          type="text"
          value={`Mr. ${userInfo.firstname} ${userInfo.lastname}`}
          className="w-full border border-gray-300 p-2 rounded-md mt-1 bg-white"
          readOnly
        />
      </div>

      <div className="mt-4">
        <label className="block font-semibold">Location</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md mt-1 bg-white"
          readOnly={!editInfo}
        />
      </div>

      <div className="mt-4">
        <label className="block font-semibold">Bio</label>
        <textarea 
          type="text" 
          value={userInfo.location ? userInfo.location : 'No Bio Available'} 
          className="w-full h-40 border border-gray-300 p-2 rounded-md mt-1 bg-white" 
          readOnly 
        />
      </div>

      <div className="mt-4">
        <label className="block font-semibold">Total Camera</label>
        <input 
          type="text" 
          name="total_cameras"
          value={formData.total_cameras}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md mt-1 bg-white" 
          readOnly={!editInfo} 
        />
      </div>
    </div>
  )
}