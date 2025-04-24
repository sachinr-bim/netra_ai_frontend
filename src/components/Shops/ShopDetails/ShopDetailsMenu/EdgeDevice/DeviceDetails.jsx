import React from 'react'

export default function DeviceDetails({id,deviceModel,RAM,CPU,SSD,configuration}) {
  return (
    <>
    <form className='mb-10'>
        <div className="grid grid-cols-4 gap-4 mt-4">
        <div className="col-span-4">
          <label className="block font-semibold">Camera {id} Model</label>
          <input type="text" value={deviceModel} className="w-full border border-gray-300 p-2 rounded-md mt-1 bg-white" readOnly />
        </div>

        <div>
          <label className="block font-semibold">Ram</label>
          <input type="text" value={RAM} className="w-full border border-gray-300 p-2 rounded-md mt-1 bg-white" readOnly />
        </div>

        <div>
          <label className="block font-semibold">CPU</label>
          <input type="text" value={CPU} className="w-full border border-gray-300 p-2 rounded-md mt-1 bg-white" readOnly />
        </div>

        <div>
          <label className="block font-semibold">SSD</label>
          <input type="text" value={SSD} className="w-full border border-gray-300 p-2 rounded-md mt-1 bg-white" readOnly />
        </div>
      </div>

      <div className="mt-4">
        <label className="block font-semibold">Configuration</label>
        <input type="text" value={configuration} className="w-full border border-gray-300 p-2 rounded-md mt-1 bg-white" readOnly />
      </div>
    </form>
    </>
  )
}
