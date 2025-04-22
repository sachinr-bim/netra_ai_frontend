import React from 'react'

export default function AnomalyTable({filteredAnomalies}) {
  return (
    <div className="mx-auto bg-white rounded-xl overflow-hidden">
        <div className="p-4 md:p-6">
          <h1 className="text-xl md:text-2xl font-semibold mb-4">Anomaly List</h1>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#fff5e7]">
                  {["Date & Time", "Shop Name", "Camera Name", "Detection Type", "User Feedback", 
                    "Corrected Label", "Additional Notes", "Action"].map(header => (
                    <th key={header} className="text-left p-3 md:p-4 text-sm md:text-base">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredAnomalies.length > 0 ? (
                  filteredAnomalies.map((ele, index) => (
                    <tr key={index} className="hover:bg-[#fff5e7]/50 border-t border-gray-100">
                      <td className="p-3 md:p-4 text-sm md:text-base">{ele.dateTime}</td>
                      <td className="p-3 md:p-4 text-sm md:text-base">{ele.shopName}</td>
                      <td className="p-3 md:p-4 text-sm md:text-base">{ele.cameraName}</td>
                      <td className="p-3 md:p-4 text-sm md:text-base">{ele.detectionType}</td>
                      <td className="p-3 md:p-4 text-sm md:text-base">
                        {ele.userFeedback || <span className="text-gray-400">No feedback</span>}
                      </td>
                      <td className="p-3 md:p-4 text-sm md:text-base">
                        {ele.correctedLabel || <span className="text-gray-400">-</span>}
                      </td>
                      <td className="p-3 md:p-4 text-sm md:text-base">
                        {ele.additionalNotes || <span className="text-gray-400">-</span>}
                      </td>
                      <td className="p-3 md:p-4 text-gray-500 cursor-pointer text-xl">⋮</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="p-4 text-center text-gray-500">
                      No anomalies found matching your filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  )
}
