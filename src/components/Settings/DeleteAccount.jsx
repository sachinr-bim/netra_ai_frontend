import React from 'react'

// Icons
import EditIcon from '../../assets/icons/EditIcon'

export default function DeleteAccount({setActiveTab}) {
  return (
    <div className="flex-1 p-10">
      {/* Delete Shop Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Delete Account</h2>
        <p className='text-gray-500 text-sm font-semibold'>Pro plan for  a better result</p>
        <div className="bg-white shadow-lg rounded-lg p-5 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="https://images2.alphacoders.com/156/thumb-1920-156022.jpg" 
              alt="Profile Pic"
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <h3 className="text-lg font-medium text-gray-800">Mr. Kinley</h3>
              <p className="text-gray-500 text-sm">Shop owner of New York</p>
            </div>
          </div>
          <button className="bg-[var(--theme-color)] text-white hover:bg-white border border-[var(--theme-color)] hover:text-[var(--theme-color)] px-5 py-1 rounded-lg flex items-center gap-4 transition-colors" onClick={() =>  setActiveTab('accountSettings')}>
            Edit <EditIcon height={20} />
          </button>
        </div>
      </div>
      
      {/* Danger Zone */}
      <div className="bg-[#fff5e7] p-5 rounded-lg mt-10">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Danger Zone</h3>
          <div className="bg-white p-5 rounded-lg shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex-1">
              <h4 className="text-2xl font-medium text-gray-800">Suspend Account</h4>
              <p className="text-gray-500 text-sm mt-1">
                Delete this account and any exclusively owned organizations and services will be removed
              </p>
            </div>
            <button className="border border-red-500 text-red-500 hover:bg-red-50 px-6 py-2 rounded-lg transition-colors">
              Suspend
            </button>
          </div>
        </div>
    </div>
  )
}
