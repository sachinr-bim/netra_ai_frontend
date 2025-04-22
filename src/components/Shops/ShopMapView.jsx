import React, { useState } from "react";
import { X, Search } from "lucide-react";

const ShopMapView = ({ onClose, shops = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter shops based on search query
  const filteredShops = shops.filter(shop => 
    shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shop.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-white z-50 p-4 flex flex-col p-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">Full Map View</h1>
        <button 
          onClick={onClose} 
          className="p-2 text-[#414141] hover:bg-gray-200 rounded-full"
          aria-label="Close map"
        >
          <X size={44} />
        </button>
      </div>

      {/* Enhanced Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search size={24} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search shops..."
          className="border border-gray-300 rounded-lg pl-14 pr-10 py-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        )}
      </div>

      {/* Search Results (temporary) */}
      {searchQuery && (
        <div className="mb-6 bg-blue-50 p-4 rounded-lg">
          <h3 className="text-xl font-medium mb-3">
            {filteredShops.length} {filteredShops.length === 1 ? 'shop' : 'shops'} found
          </h3>
          <ul className="space-y-3">
            {filteredShops.map(shop => (
              <li key={shop.id} className="p-3 hover:bg-blue-100 rounded-lg transition-colors">
                <p className="text-lg font-medium">{shop.name}</p>
                <p className="text-gray-600">{shop.location}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Map Container */}
      <div className="flex-grow rounded-xl overflow-hidden border-2 border-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24156.496325067134!2d-74.0123857!3d40.7038036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259af5c2386db%3A0x43797921df73aa5f!2sBrooklyn%2C%20NY%2011225!5e0!3m2!1sen!2sus!4v1712647053624!5m2!1sen!2sus"
          width="100%"
          height="100%"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
          title="Shop Locations Map"
        />
      </div>

      <p className="text-sm text-gray-500 text-center mt-4">
        By embedding this map, you agree to the{' '}
        <a 
          href="https://www.google.com/intl/en-US_US/help/terms_maps/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="underline hover:text-blue-600"
        >
          Google Terms of Service
        </a>.
      </p>
    </div>
  );
};

export default ShopMapView;