export default function CameraDetails({
  id,
  serialNumber,
  name,
  number,
  location,
  ipAddress,
  manufacturer,
  modelNumber,
  modelYear,
  editMode,
  isSelected,
  onCheckboxChange
}) {
  return (
    <form data-cameraid={id} className='mb-10'>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {editMode && (
          <div className="col-span-1 flex justify-center">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onCheckboxChange(id)}
              className="h-5 w-5"
            />
          </div>
        )}
        <h2 className="text-xl font-semibold">Camera {serialNumber} Model</h2>
        
        <div className="col-span-4">
          <label className="block font-semibold">Camera Name*</label>
          <input 
            type="text" 
            name="name"
            defaultValue={name}
            className="w-full border border-gray-300 p-2 rounded-md mt-1 bg-white" 
            required
            readOnly={!editMode}
          />
        </div>

        <div className="col-span-2">
          <label className="block font-semibold">Camera Number*</label>
          <input 
            type="text" 
            name="number"
            defaultValue={number}
            className="w-full border border-gray-300 p-2 rounded-md mt-1 bg-white" 
            required
            readOnly={!editMode}
          />
        </div>

        <div className="col-span-2">
          <label className="block font-semibold">Location*</label>
          <input 
            type="text" 
            name="location"
            defaultValue={location}
            className="w-full border border-gray-300 p-2 rounded-md mt-1 bg-white" 
            required
            readOnly={!editMode}
          />
        </div>

        <div>
          <label className="block font-semibold">IP Address*</label>
          <input 
            type="text" 
            name="ipAddress"
            defaultValue={ipAddress}
            className="w-full border border-gray-300 p-2 rounded-md mt-1 bg-white" 
            required
            readOnly={!editMode}
          />
        </div>

        <div>
          <label className="block font-semibold">Manufacturer*</label>
          <input 
            type="text" 
            name="manufacturer"
            defaultValue={manufacturer}
            className="w-full border border-gray-300 p-2 rounded-md mt-1 bg-white" 
            required
            readOnly={!editMode}
          />
        </div>

        <div>
          <label className="block font-semibold">Model Number</label>
          <input 
            type="text" 
            name="modelNumber"
            defaultValue={modelNumber}
            className="w-full border border-gray-300 p-2 rounded-md mt-1 bg-white" 
            readOnly={!editMode}
          />
        </div>

        <div>
          <label className="block font-semibold">Model Year</label>
          <input 
            type="text" 
            name="modelYear"
            defaultValue={modelYear}
            className="w-full border border-gray-300 p-2 rounded-md mt-1 bg-white" 
            readOnly={!editMode}
          />
        </div>
      </div>
    </form>
  );
}