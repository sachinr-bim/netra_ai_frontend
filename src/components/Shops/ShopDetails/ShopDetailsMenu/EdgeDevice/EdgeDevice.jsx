import React from 'react';

// Icons
import EditIcon from '../../../../../assets/icons/EditIcon';

// Components
import DeviceDetails from './DeviceDetails';

export default function EdgeDevice({selectedShop}) {

  return (
    <div className="md:w-3/4 p-8 rounded-lg bg-white">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold">Edge Device</h3>
        <button className="border border-[var(--theme-color)] text-[var(--theme-color)] hover:bg-[var(--theme-color)] hover:text-white px-3 py-1 rounded-md flex items-center gap-1 transition-colors">
          Edit <EditIcon height={20} />
        </button>
      </div>
      {/* Displaying the list of camera as form */}
      {selectedShop.cameras.map((ele,i) => <DeviceDetails key={i} id={ele.id} deviceModel={ele.deviceModel} RAM={ele.RAM} CPU={ele.CPU} SSD={ele.SSD} configuration={ele.configuration}  />)}
    </div>
  );
}