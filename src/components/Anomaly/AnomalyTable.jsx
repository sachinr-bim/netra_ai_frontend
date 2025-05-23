export default function AnomalyTable({ 
  anomalies, 
  pagination, 
  onPageChange 
}) {
  return (
    <div className="mx-auto bg-white rounded-xl overflow-hidden">
      <div className="p-3 xs:p-4 sm:p-4 md:p-6">
        <h1 className="text-lg xs:text-xl sm:text-xl md:text-2xl font-semibold mb-3 xs:mb-4">Anomaly List</h1>
        <div className="overflow-x-auto">
          {anomalies.length > 0 ? (
            <>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#fff5e7]">
                    {["Date & Time", "Shop", "Camera", "Type", "Anomaly", "Video", "Feedback", "Action"].map(header => (
                      <th key={header} className="text-left p-2 xs:p-3 sm:p-3 md:p-4 text-xs xs:text-sm sm:text-sm md:text-base whitespace-nowrap">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {anomalies.map(anomaly => (
                    <tr key={anomaly.id} className="hover:bg-[#fff5e7]/50 border-t border-gray-100">
                      <td className="p-2 xs:p-3 sm:p-3 md:p-4 text-xs xs:text-sm sm:text-sm md:text-base whitespace-nowrap">
                        {new Date(anomaly.dateTime).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="p-2 xs:p-3 sm:p-3 md:p-4 text-xs xs:text-sm sm:text-sm md:text-base">
                        <span className="truncate max-w-[80px] xs:max-w-[100px] sm:max-w-none inline-block">
                          {anomaly.shopName}
                        </span>
                      </td>
                      <td className="p-2 xs:p-3 sm:p-3 md:p-4 text-xs xs:text-sm sm:text-sm md:text-base whitespace-nowrap">
                        {anomaly.cameraName}
                      </td>
                      <td className="p-2 xs:p-3 sm:p-3 md:p-4 text-xs xs:text-sm sm:text-sm md:text-base">
                        <span className="truncate max-w-[60px] xs:max-w-[80px] sm:max-w-none inline-block">
                          {anomaly.detectionType}
                        </span>
                      </td>
                      <td className="p-2 xs:p-3 sm:p-3 md:p-4 text-xs xs:text-sm sm:text-sm md:text-base">
                        <span className="truncate max-w-[80px] xs:max-w-[100px] sm:max-w-none inline-block">
                          {anomaly.anomalyName}
                        </span>
                      </td>
                      <td className="p-2 xs:p-3 sm:p-3 md:p-4 text-xs xs:text-sm sm:text-sm md:text-base whitespace-nowrap">
                        <a 
                          href={anomaly.videoLink} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-blue-500 hover:underline text-xs xs:text-sm"
                        >
                          View
                        </a>
                      </td>
                      <td className="p-2 xs:p-3 sm:p-3 md:p-4 text-xs xs:text-sm sm:text-sm md:text-base">
                        <span className="truncate max-w-[60px] xs:max-w-[80px] sm:max-w-none inline-block">
                          {anomaly.userFeedback || 'None'}
                        </span>
                      </td>
                      <td className="p-2 xs:p-3 sm:p-3 md:p-4 text-gray-500 cursor-pointer text-lg xs:text-xl">⋮</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {pagination.totalPages > 1 && (
                <div className="flex flex-col xs:flex-row items-center justify-between gap-2 xs:gap-0 mt-4">
                  <div className="text-xs xs:text-sm text-gray-500 mb-2 xs:mb-0">
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </div>
                  <div className="flex flex-wrap justify-center gap-1 xs:gap-2">
                    <button
                      onClick={() => onPageChange(Math.max(1, pagination.currentPage - 1))}
                      disabled={pagination.currentPage === 1}
                      className={`px-2 xs:px-3 py-1 rounded-md border text-xs xs:text-sm ${
                        pagination.currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'
                      }`}
                    >
                      Prev
                    </button>
                    
                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                      if (pagination.totalPages <= 5) return i + 1;
                      if (pagination.currentPage <= 3) return i + 1;
                      if (pagination.currentPage >= pagination.totalPages - 2) return pagination.totalPages - 4 + i;
                      return pagination.currentPage - 2 + i;
                    }).map(number => (
                      <button
                        key={number}
                        onClick={() => onPageChange(number)}
                        className={`px-2 xs:px-3 py-1 rounded-md border text-xs xs:text-sm ${
                          pagination.currentPage === number
                            ? 'bg-[var(--theme-color)] text-white'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {number}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => onPageChange(Math.min(pagination.totalPages, pagination.currentPage + 1))}
                      disabled={pagination.currentPage === pagination.totalPages}
                      className={`px-2 xs:px-3 py-1 rounded-md border text-xs xs:text-sm ${
                        pagination.currentPage === pagination.totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white p-4 xs:p-6 rounded-xl text-center">
              <p className="text-gray-500 text-sm xs:text-base">No Anomalies Found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}