import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEdgeDevicesByShopAPI } from '../../../../../reduxToolkit/slices/edgeDeviceSlice';
import EditIcon from '../../../../../assets/icons/EditIcon';
import AddEdgeDevice from './AddEdgeDevice';
import DeviceDetails from './DeviceDetails';

export default function EdgeDevice({ shopId }) {
  const dispatch = useDispatch();
  const [addDevice, setAddDevice] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { devices, fetchStatus, fetchError } = useSelector(state => state.edgeDevice);

  useEffect(() => {
    if (shopId) {
      dispatch(fetchEdgeDevicesByShopAPI(shopId));
    }
  }, [dispatch, shopId]);

  console.log('Edge Devices',devices)

  return (
    <div className="md:w-3/4 p-8 rounded-lg bg-white">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold">Edge Device</h3>
        <div className='flex gap-4'>
          <button 
            className="border border-[var(--theme-color)] text-[var(--theme-color)] hover:bg-[var(--theme-color)] hover:text-white px-3 py-1 rounded-md flex items-center gap-1 transition-colors" 
            onClick={() => setAddDevice(true)}
          >
            Add +
          </button>
          <button 
            className="border border-[var(--theme-color)] text-[var(--theme-color)] hover:bg-[var(--theme-color)] hover:text-white px-3 py-1 rounded-md flex items-center gap-1 transition-colors"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? 'Cancel' : 'Edit'} <EditIcon height={20} />
          </button>
        </div>
      </div>

      {fetchStatus === 'loading' && <div className="mt-4">Loading devices...</div>}
      {fetchError && <div className="mt-4 text-red-500">Error: {fetchError}</div>}

      {/* Displaying the list of devices */}
      {devices.map((device) => (
        <DeviceDetails 
          key={device.device_id} 
          shopId={shopId}
          id={device.device_id}
          deviceModel={device.name}
          RAM={device.ram}
          CPU={device.cpu}
          SSD={device.ssd}
          configuration={device.configuration}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      ))}

      {devices.length === 0 && fetchStatus === 'succeeded' && (
        <div className="mt-4 text-gray-500">No edge devices found for this shop</div>
      )}

      {addDevice && <AddEdgeDevice shopId={shopId} onClose={() => setAddDevice(false)} />}
    </div>
  );
}