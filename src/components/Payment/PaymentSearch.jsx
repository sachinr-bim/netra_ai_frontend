import React from 'react'

// Icons
import PdfIcon from "../../assets/icons/PdfIcon";
import ExcelIcon from "../../assets/icons/ExcelIcon";
import SearchIcon from "../../assets/icons/SearchIcon";

export default function PaymentSearch({searchTerm,setSearchTerm}) {
  return (
    <div>
        <div className="flex flex-col md:flex-row gap-3 md:gap-4">
          <div className="relative flex-grow">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search here..."
              className="w-full pl-9 md:pl-10 pr-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--theme-color)] text-sm md:text-base"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 md:gap-3">
            <button className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 border bg-[var(--theme-color)] text-white rounded-md hover:bg-white hover:text-[var(--theme-color)] transition-colors whitespace-nowrap text-sm md:text-base">
              <PdfIcon height={20} className="flex-shrink-0" />
              <span>Export To PDF</span>
            </button>
            
            <button className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 border bg-[var(--theme-color)] text-white rounded-md hover:bg-white hover:text-[var(--theme-color)] transition-colors whitespace-nowrap text-sm md:text-base">
              <ExcelIcon height={20} className="flex-shrink-0" />
              <span>Export To Excel</span>
            </button>
          </div>
        </div>
    </div>
  )
}
