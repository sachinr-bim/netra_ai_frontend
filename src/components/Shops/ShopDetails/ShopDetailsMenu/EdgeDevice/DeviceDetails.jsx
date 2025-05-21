import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteEdgeDeviceAPI, updateEdgeDeviceAPI, fetchEdgeDevicesByShopAPI } from '../../../../../reduxToolkit/slices/edgeDeviceSlice';

export default function DeviceDetails({
  id,
  shopId,
  deviceModel,
  RAM,
  CPU,
  SSD,
  configuration,
  editMode,
  setEditMode
}) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: deviceModel,
    ram: RAM,
    cpu: CPU,
    ssd: SSD,
    configuration: configuration
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this device?')) {
      setIsDeleting(true);
      try {
        await dispatch(deleteEdgeDeviceAPI(id)).unwrap();
        dispatch(fetchEdgeDevicesByShopAPI(shopId));
      } catch (error) {
        console.error('Failed to delete device:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await dispatch(updateEdgeDeviceAPI({
        deviceId: id,
        deviceData: formData
      })).unwrap();
      setEditMode(false)
      dispatch(fetchEdgeDevicesByShopAPI(shopId));
    } catch (error) {
      console.error('Failed to update device:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form className='mb-10'>
      <div className="grid grid-cols-4 gap-4 mt-4">
        <div className="col-span-4">
          <label className="block font-semibold">Device Model</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md mt-1 bg-white"
            readOnly={!editMode}
          />
        </div>

        <div>
          <label className="block font-semibold">Ram (GB)</label>
          <input
            type="number"
            name="ram"
            value={formData.ram}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md mt-1 bg-white"
            readOnly={!editMode}
          />
        </div>

        <div>
          <label className="block font-semibold">CPU Cores</label>
          <input
            type="number"
            name="cpu"
            value={formData.cpu}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md mt-1 bg-white"
            readOnly={!editMode}
          />
        </div>

        <div>
          <label className="block font-semibold">SSD (GB)</label>
          <input
            type="number"
            name="ssd"
            value={formData.ssd}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md mt-1 bg-white"
            readOnly={!editMode}
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block font-semibold">Configuration</label>
        <input
          type="text"
          name="configuration"
          value={formData.configuration}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md mt-1 bg-white"
          readOnly={!editMode}
        />
      </div>

      {editMode && (
        <div className="mt-4 flex gap-2 justify-end">
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className={`px-4 py-2 bg-red-500 text-white rounded-md hover:bg-white hover:text-red-700 border ${
              isDeleting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className={`px-4 py-2 bg-[var(--theme-color)] text-white rounded-md hover:bg-white hover:text-[var(--theme-color)] border ${
              isSaving ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      )}
    </form>
  );
}