import React, { useState } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { createEdgeDeviceAPI,fetchEdgeDevicesByShopAPI } from '../../../../../reduxToolkit/slices/edgeDeviceSlice';

export default function AddEdgeDevice({ shopId, onClose }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    shop_id: shopId,
    name: '',
    ram: '',
    cpu: '',
    ssd: '',
    configuration: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {error} = useSelector(state => state.edgeDevice);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await dispatch(createEdgeDeviceAPI(formData)).unwrap();
      onClose();
      dispatch(fetchEdgeDevicesByShopAPI(shopId))
    } catch (error) {
      console.error('Failed to create edge device:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Add New Edge Device</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            X
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block font-semibold mb-1">Device Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">RAM (GB)</label>
              <input
                type="number"
                name="ram"
                value={formData.ram}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">CPU Cores</label>
              <input
                type="number"
                name="cpu"
                value={formData.cpu}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">SSD (GB)</label>
              <input
                type="number"
                name="ssd"
                value={formData.ssd}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="block font-semibold mb-1">Configuration</label>
              <input
                type="text"
                name="configuration"
                value={formData.configuration}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              />
            </div>
          </div>

          {error && (
            <div className="mt-2 text-red-500 text-sm">
              {error}
            </div>
          )}

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-[var(--theme-color)] hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-[var(--theme-color)] text-white rounded-md hover:bg-white hover:text-[var(--theme-color)] hover: border border-[var(--theme-color)] disabled:bg-blue-400"
            >
              {isSubmitting ? 'Adding...' : 'Add Device'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}