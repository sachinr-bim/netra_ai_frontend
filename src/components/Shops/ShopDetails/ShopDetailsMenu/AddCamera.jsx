import React from 'react'

export default function AddCamera() {
  return (
    <div className="md:w-3/4 p-8 rounded-lg bg-white">
      <form>
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold">Add Camera Details</h3>
        <button className="border border-[var(--theme-color)] text-[var(--theme-color)] hover:bg-[var(--theme-color)] hover:text-white px-3 py-1 rounded-md flex items-center gap-1 transition-colors">
          Add Camera
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-4">
        <div className="col-span-4">
          <label className="block font-semibold">Camera Model</label>
          <input type="text" className="w-full border border-gray-300 p-2 rounded-md mt-1 bg-white" readOnly />
        </div>

        <div>
          <label className="block font-semibold">Ram</label>
          <input type="text" className="w-full border border-gray-300 p-2 rounded-md mt-1 bg-white" readOnly />
        </div>

        <div>
          <label className="block font-semibold">CPU</label>
          <input type="text" className="w-full border border-gray-300 p-2 rounded-md mt-1 bg-white" readOnly />
        </div>

        <div>
          <label className="block font-semibold">SSD</label>
          <input type="text" className="w-full border border-gray-300 p-2 rounded-md mt-1 bg-white" readOnly />
        </div>
      </div>

      <div className="mt-4">
        <label className="block font-semibold">Configuration</label>
        <input type="text" className="w-full border border-gray-300 p-2 rounded-md mt-1 bg-white" readOnly />
      </div>
      </form>
    </div>
  )
}
