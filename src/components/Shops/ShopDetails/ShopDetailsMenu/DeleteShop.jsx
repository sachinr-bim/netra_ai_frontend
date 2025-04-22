import React from "react";

// Icons
import EditIcon from "../../../../assets/icons/EditIcon";

export default function DeleteShop() {
  return (
    <div className="md:w-3/4 p-8">
      {/* Delete Shop Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Delete Shop</h2>
        <div className="bg-white shadow-lg rounded-lg p-5 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="https://i.redd.it/the-newly-renovated-sailor-moon-store-in-tokyo-v0-64ti7re36mjd1.jpg?width=4032&format=pjpg&auto=webp&s=bb96249bd51937f15589fbe4e05c43c0e985b0bc" 
              alt="Shop Thumbnail"
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <h3 className="text-lg font-medium text-gray-800">Sailor Shop</h3>
              <p className="text-gray-500 text-sm">Newyork Street, America</p>
            </div>
          </div>
          <button className="bg-[var(--theme-color)] text-white hover:bg-white border border-[var(--theme-color)] hover:text-[var(--theme-color)] px-5 py-1 rounded-lg flex items-center gap-4 transition-colors">
            Edit <EditIcon height={20} />
          </button>
        </div>
      </div>
      
      {/* Danger Zone */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 mt-6">Danger Zone</h3>
        <div className="bg-amber-50 p-5 rounded-lg border border-amber-200">
          <div className="bg-white p-5 rounded-lg shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex-1">
              <h4 className="text-lg font-medium text-gray-800">Delete Shop</h4>
              <p className="text-gray-500 text-sm mt-1">
                Delete this shop and any exclusively owned organizations and services will be removed
              </p>
            </div>
            <button className="border border-red-500 text-red-500 hover:bg-red-50 px-6 py-2 rounded-lg transition-colors">
              Delete Shop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}