import React from 'react'

export default function AnomalyFilter({shops,detectionTypes,showFilters,selectedShopName,setSelectedShopName,filters,setFilters}) {
  return (
    <>
    {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Shop</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-[var(--theme-color)] focus:border-[var(--theme-color)]"
                value={selectedShopName}
                onChange={e => setSelectedShopName(e.target.value)}
              >
                <option value="">All Shops</option>
                {shops.map(shop => <option key={shop.id} value={shop.name}>{shop.name}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Detection Type</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-[var(--theme-color)] focus:border-[var(--theme-color)]"
                value={filters.detectionType}
                onChange={e => setFilters({...filters, detectionType: e.target.value})}
              >
                <option value="">All Types</option>
                {detectionTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Feedback Status</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-[var(--theme-color)] focus:border-[var(--theme-color)]"
                value={filters.feedbackStatus}
                onChange={e => setFilters({...filters, feedbackStatus: e.target.value})}
              >
                <option value="">All</option>
                <option value="withFeedback">With Feedback</option>
                <option value="withoutFeedback">Without Feedback</option>
              </select>
            </div>
          </div>
        )}
    </>
  )
}
