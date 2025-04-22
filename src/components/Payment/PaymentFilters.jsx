import React from 'react'

export default function PaymentFilters({hasActiveFilters,clearFilters,showFilters,dateFilter,setDateFilter}) {
  return (
    <div>
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-[var(--theme-color)] focus:border-[var(--theme-color)] text-sm md:text-base"
                value={dateFilter.startDate}
                onChange={e => setDateFilter({...dateFilter, startDate: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-[var(--theme-color)] focus:border-[var(--theme-color)] text-sm md:text-base"
                value={dateFilter.endDate}
                onChange={e => setDateFilter({...dateFilter, endDate: e.target.value})}
              />
            </div>
            
            {hasActiveFilters && (
              <div className="md:col-span-2 flex justify-end">
                <button 
                  onClick={clearFilters}
                  className="px-4 py-2 text-gray-600 rounded-md hover:bg-gray-100 transition-colors text-sm md:text-base"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}
    </div>
  )
}
