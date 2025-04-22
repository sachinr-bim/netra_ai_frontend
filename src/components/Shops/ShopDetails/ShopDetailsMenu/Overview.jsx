import React,{useState} from 'react'

// Icons
import EditIcon from '../../../../assets/icons/EditIcon'

export default function Overview() {

  const [editInfo,setEditInfo] = useState(false)

  const handleEditInfo = () => setEditInfo(!editInfo)

  return (
    <>
    <div className="md:w-3/4 p-8">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl">Overview</h3>
            <button className="border border-[var(--theme-color)] text-[var(--theme-color)] hover:bg-[var(--theme-color)] hover:text-white px-3 py-1 rounded-md flex items-center gap-1 transition-colors" onClick={handleEditInfo}>
              Edit <EditIcon height = {20} />
            </button>
          </div>

          <div className="mt-4">
            <label className="block font-semibold">Shop Name</label>
            <input
              type="text"
              value="Sailor Shop"
              className="w-full border border-gray-300 p-2 rounded-md mt-1 bg-white"
              readOnly = {!editInfo}
            />
          </div>

          <div className="mt-4">
            <label className="block font-semibold">Shop Owner Name</label>
            <input
              type="text"
              value="Mr. Kinley"
              className="w-full border border-gray-300 p-2 rounded-md mt-1 bg-white"
              readOnly = {!editInfo}
            />
          </div>

          <div className="mt-4">
            <label className="block font-semibold">Location</label>
            <input
              type="text"
              value="Sailor Shop"
              className="w-full border border-gray-300 p-2 rounded-md mt-1 bg-white"
              readOnly = {!editInfo}
            />
          </div>

          <div className="mt-4">
            <label className="block font-semibold">Bio</label>
            <textarea type="text" value="Mr. Kinley" className="w-full h-40 border border-gray-300 p-2 rounded-md mt-1 bg-white" readOnly ={!editInfo}></textarea>
          </div>

          <div className="mt-4">
            <label className="block font-semibold">Total Camera</label>
            <input type="text" value="4" className="w-full border border-gray-300 p-2 rounded-md mt-1 bg-white" readOnly = {!editInfo} />
          </div>
        </div>
    </>
  )
}
