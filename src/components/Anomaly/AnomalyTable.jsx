export default function AnomalyTable({ 
  anomalies, 
  pagination, 
  onPageChange 
}) {
  return (
    <div className="mx-auto bg-white rounded-xl overflow-hidden">
      <div className="p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-semibold mb-4">Anomaly List</h1>
        <div className="overflow-x-auto">
          {anomalies.length > 0 ? (
            <>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#fff5e7]">
                    {["Date & Time", "Shop Name", "Camera", "Anomaly Type", "Anomaly Name", 
                      "Video", "User Feedback", "Action"].map(header => (
                      <th key={header} className="text-left p-3 md:p-4 text-sm md:text-base">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {anomalies.map(anomaly => (
                    <tr key={anomaly.id} className="hover:bg-[#fff5e7]/50 border-t border-gray-100">
                      <td className="p-3 md:p-4 text-sm md:text-base">{anomaly.dateTime}</td>
                      <td className="p-3 md:p-4 text-sm md:text-base">{anomaly.shopName}</td>
                      <td className="p-3 md:p-4 text-sm md:text-base">{anomaly.cameraName}</td>
                      <td className="p-3 md:p-4 text-sm md:text-base">{anomaly.detectionType}</td>
                      <td className="p-3 md:p-4 text-sm md:text-base">{anomaly.anomalyName}</td>
                      <td className="p-3 md:p-4 text-sm md:text-base">
                        <a 
                          href={anomaly.videoLink} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-blue-500 hover:underline"
                        >
                          View Video
                        </a>
                      </td>
                      <td className="p-3 md:p-4 text-sm md:text-base">
                        {anomaly.userFeedback || 'No feedback'}
                      </td>
                      <td className="p-3 md:p-4 text-gray-500 cursor-pointer text-xl">⋮</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {pagination.totalPages > 1 && (
                <div className="flex justify-center mt-4">
                  <nav className="inline-flex rounded-md shadow">
                    <button
                      onClick={() => onPageChange(Math.max(1, pagination.currentPage - 1))}
                      disabled={pagination.currentPage === 1}
                      className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(number => (
                      <button
                        key={number}
                        onClick={() => onPageChange(number)}
                        className={`px-3 py-1 border-t border-b border-gray-300 text-sm font-medium ${
                          pagination.currentPage === number
                            ? 'bg-[var(--theme-color)] text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {number}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => onPageChange(Math.min(pagination.totalPages, pagination.currentPage + 1))}
                      disabled={pagination.currentPage === pagination.totalPages}
                      className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white p-6 rounded-xl text-center">
              <p className="text-gray-500">No Anomalies Found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}