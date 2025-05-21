import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCamerasByShopIdAPI, deleteCameraAPI, updateCameraAPI } from '../../../../../reduxToolkit/slices/cameraSlice';
import EditIcon from '../../../../../assets/icons/EditIcon';

// Components
import AddCamera from './AddCamera';
import CameraDetails from './CameraDetails';

export default function Camera({ selectedShop }) {
  const dispatch = useDispatch();
  const { cameras, status, error } = useSelector((state) => state.cameras);
  const [ addCamera, setAddCamera ] = useState(false)
  const [editMode, setEditMode] = useState(false);
  const [selectedCameras, setSelectedCameras] = useState([]);

  useEffect(() => {
    if (selectedShop?.id) {
      dispatch(fetchCamerasByShopIdAPI(selectedShop.id));
    }
  }, [selectedShop?.id, dispatch]);

  const handleCheckboxChange = (cameraId) => {
    setSelectedCameras(prev =>
      prev.includes(cameraId)
        ? prev.filter(id => id !== cameraId)
        : [...prev, cameraId]
    );
  };

  const handleDeleteSelected = () => {
    if (selectedCameras.length === 0) {
      alert('Please select at least one camera to delete');
      return;
    }

    if (window.confirm('Are you sure you want to delete the selected cameras?')) {
      selectedCameras.forEach(cameraId => {
        dispatch(deleteCameraAPI(cameraId));
      });
      dispatch(fetchCamerasByShopIdAPI(selectedShop.id));
      setSelectedCameras([]);
      setEditMode(false);
    }
  };

  const handleSaveChanges = async () => {
  try {
    // 1. Get all camera forms
    const forms = document.querySelectorAll('form');
    
    // 2. Prepare all update requests
    const updatePromises = Array.from(forms).map(form => {
      const formData = new FormData(form);
      const cameraId = form.dataset.cameraid;
      
      return dispatch(updateCameraAPI({
        cameraId,
        cameraData: {
          name: formData.get('name'),
          number: formData.get('number'),
          location: formData.get('location'),
          ip_address: formData.get('ipAddress'),
          manufacturer: formData.get('manufacturer'),
          camera_model_number: formData.get('modelNumber'),
          camera_model_year: formData.get('modelYear')
        }
      })).unwrap(); // unwrap() gives us the actual action payload
    });

    // 3. Execute all updates in parallel
    await Promise.all(updatePromises);
    
    // 4. Optional: Refresh data if needed (comment out if using Redux state updates)
    await dispatch(fetchCamerasByShopIdAPI(selectedShop.id)).unwrap();

    // 5. Exit edit mode
    setEditMode(false);
    setSelectedCameras([]);

    // Optional: Show success message
    alert('Camera details updated successfully!');
    
  } catch (error) {
    // 6. Handle any errors
    console.error('Update failed:', error);
    alert(`Update failed: ${error.message}`);
    
    // 7. Stay in edit mode if there's an error
    setEditMode(true);
  }
};

   if (status === 'loading') {
    return (
      <div className="md:w-3/4 p-8 rounded-lg bg-white">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--theme-color)]"></div>
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="md:w-3/4 p-8 rounded-lg bg-white">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="md:w-3/4 p-8 rounded-lg bg-white">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold">Camera Details</h3>
        <div className='flex gap-2'>
          <button 
            type="submit"
            className="border border-[var(--theme-color)] text-[var(--theme-color)] hover:bg-[var(--theme-color)] hover:text-white px-3 py-1 rounded-md items-center transition-colors"
            onClick={() => setAddCamera(true)}
          >
            Add Camera
          </button>
          {cameras.length > 0 && (
            <button 
              className="border border-[var(--theme-color)] text-[var(--theme-color)] hover:bg-[var(--theme-color)] hover:text-white px-3 py-1 rounded-md flex items-center gap-1 transition-colors" 
              onClick={() => setEditMode(!editMode)}
            >
              Edit <EditIcon height={20} />
            </button>
          )}
        </div>
      </div>
      
      <div className="mt-6 space-y-4">
        {cameras.length > 0 ? (
          cameras.map((camera, index) => (
            <CameraDetails
              key={camera.camera_id}
              id={camera.camera_id}
              serialNumber={index + 1}
              name={camera.name}
              number={camera.number}
              location={camera.location}
              ipAddress={camera.ip_address}
              manufacturer={camera.manufacturer}
              modelNumber={camera.camera_model_number}
              modelYear={camera.camera_model_year}
              editMode={editMode}
              isSelected={selectedCameras.includes(camera.camera_id)}
              onCheckboxChange={handleCheckboxChange}
            />
          ))
        ) : (
          <div className="text-gray-500 text-center py-4">
            No cameras found for this shop
          </div>
        )}
      </div>

      {editMode && (
        <div className="mt-4 flex justify-end gap-2">
          <button 
            className='border border-red-400 text-red-400 hover:bg-red-400 hover:text-white px-3 py-1 rounded-md gap-1 transition-colors'
            onClick={handleDeleteSelected}
          >
            Delete Selected
          </button>
          <button 
            className='bg-[var(--theme-color)] text-white px-3 py-1 rounded-md gap-2 hover:bg-white hover:border border-[var(--theme-color)] hover:text-[var(--theme-color)] transition-colors'
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
          <button 
            className='bg-gray-300 text-black px-3 py-1 rounded-md gap-2 hover:bg-white hover:border border-[var(--theme-color)] hover:text-[var(--theme-color)] transition-colors' 
            onClick={() => {
              setEditMode(false);
              setSelectedCameras([]);
            }}
          >
            Cancel
          </button>    
        </div>
      )}
      {addCamera && <AddCamera setAddCamera={setAddCamera} selectedShop={selectedShop} /> }
    </div>
  );
}