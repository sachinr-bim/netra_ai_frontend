import React from 'react';
import EditIcon from '../../../../assets/icons/EditIcon';

export default function EdgeDevice() {
  return (
    <div className="md:w-3/4 p-8 rounded-lg bg-white">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold">Edge Device</h3>
        <button className="border border-[var(--theme-color)] text-[var(--theme-color)] hover:bg-[var(--theme-color)] hover:text-white px-3 py-1 rounded-md flex items-center gap-1 transition-colors">
          Edit <EditIcon height={20} />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-4">
        <div className="col-span-4">
          <label className="block font-semibold">Camera 1 Model</label>
          <input type="text" value="NVIDIA Jetson AGX Orin" className="w-full border border-gray-300 p-2 rounded-md mt-1 bg-white" readOnly />
        </div>

        <div>
          <label className="block font-semibold">Ram</label>
          <input type="text" value="2 GB" className="w-full border border-gray-300 p-2 rounded-md mt-1 bg-white" readOnly />
        </div>

        <div>
          <label className="block font-semibold">CPU</label>
          <input type="text" value="4 Core" className="w-full border border-gray-300 p-2 rounded-md mt-1 bg-white" readOnly />
        </div>

        <div>
          <label className="block font-semibold">SSD</label>
          <input type="text" value="128 GB" className="w-full border border-gray-300 p-2 rounded-md mt-1 bg-white" readOnly />
        </div>
      </div>

      <div className="mt-4">
        <label className="block font-semibold">Configuration</label>
        <input type="text" value="NVIDIA Jetson with 256 CUDA Cores or Equivalent" className="w-full border border-gray-300 p-2 rounded-md mt-1 bg-white" readOnly />
      </div>
    </div>
  );
}