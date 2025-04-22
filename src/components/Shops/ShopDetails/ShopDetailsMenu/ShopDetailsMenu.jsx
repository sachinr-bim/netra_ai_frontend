import React from 'react';

export default function ShopDetailsMenu({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'overview', name: 'Overview' },
    { id: 'edgeDevice', name: 'Edge Device Details' },
    { id: 'addCameraDetails', name: 'Add Camera Details'},
    { id: 'subscription', name: 'Subscription' },
    { id: 'deleteShop', name: 'Delete Shop' }
  ];

  return (
    <div className="md:w-1/4 border-r">
      <h3 className="text-4xl font-bold p-6">Shop Details</h3>
      <ul className="space-y-2 p-5">
        {menuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`p-2 px-6 rounded-md cursor-pointer transition-colors ${
              activeTab === item.id
                ? 'bg-[var(--theme-color)] text-white' 
                : 'text-gray-600 hover:bg-[var(--theme-color)] hover:text-white'
            }`}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}