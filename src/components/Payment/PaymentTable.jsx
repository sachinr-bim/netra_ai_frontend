import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteExistingPayment } from '../../reduxToolkit/slices/paymentSlice';
import PaymentDetails from './PaymentDetails';

export default function PaymentTable({ filteredPayments }) {
  const dispatch = useDispatch();
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [showDropdownId, setShowDropdownId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5; // Reduced for better mobile experience

  // Calculate pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredPayments.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredPayments.length / recordsPerPage);

  const handleDelete = (paymentId) => {
    if (window.confirm("Are you sure you want to delete this payment?")) {
      dispatch(deleteExistingPayment(paymentId));
      if (currentRecords.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const toggleDropdown = (paymentId, e) => {
    e.stopPropagation();
    setShowDropdownId(showDropdownId === paymentId ? null : paymentId);
  };

  useEffect(() => {
    const handleClickOutside = () => setShowDropdownId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredPayments]);

  return (
    <div className="mx-auto bg-white rounded-xl overflow-hidden">
      {selectedPaymentId && (
        <PaymentDetails
          paymentId={selectedPaymentId} 
          onClose={() => setSelectedPaymentId(null)} 
        />
      )}
      
      <div className="p-3 xs:p-4 sm:p-4 md:p-6">
        <h1 className="text-lg xs:text-xl sm:text-xl md:text-2xl font-semibold mb-3 xs:mb-4">Payment List</h1>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#fff5e7]">
                {["Transaction ID", "Date", "Amount", "Method", "Status"].map(header => (
                  <th key={header} className="text-left p-2 xs:p-3 sm:p-3 md:p-4 text-xs xs:text-sm sm:text-sm md:text-base whitespace-nowrap">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentRecords.length > 0 ? (
                currentRecords.map((payment) => (
                  <tr 
                    key={payment.transaction_id} 
                    className="hover:bg-[#fff5e7]/50 border-t border-gray-100"
                    onClick={() => setSelectedPaymentId(payment.id)}
                  >
                    <td className="p-2 xs:p-3 sm:p-3 md:p-4 text-xs xs:text-sm sm:text-sm md:text-base whitespace-nowrap">
                      <span className="truncate max-w-[80px] xs:max-w-[120px] sm:max-w-[150px] md:max-w-none inline-block">
                        {payment.transaction_id}
                      </span>
                    </td>
                    <td className="p-2 xs:p-3 sm:p-3 md:p-4 text-xs xs:text-sm sm:text-sm md:text-base whitespace-nowrap">
                      {new Date(payment.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: currentPage > 1 ? undefined : 'numeric'
                      })}
                    </td>
                    <td className="p-2 xs:p-3 sm:p-3 md:p-4 text-xs xs:text-sm sm:text-sm md:text-base whitespace-nowrap">${payment.amount}</td>
                    <td className="p-2 xs:p-3 sm:p-3 md:p-4 text-xs xs:text-sm sm:text-sm md:text-base whitespace-nowrap">
                      {payment.payment_method.replace(/Payment|Method/gi, '').trim()}
                    </td>
                    <td className={`p-2 xs:p-3 sm:p-3 md:p-4 text-xs xs:text-sm sm:text-sm md:text-base font-medium whitespace-nowrap ${
                      payment.payment_status === 'Pending' ? 'text-orange-500' : 'text-green-500'
                    }`}>
                      {payment.payment_status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">
                    No payments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {filteredPayments.length > recordsPerPage && (
          <div className="flex flex-col xs:flex-row items-center justify-between gap-3 mt-4">
            <div className="text-xs xs:text-sm text-gray-500">
              Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredPayments.length)} of {filteredPayments.length}
            </div>
            <div className="flex flex-wrap justify-center gap-1 xs:gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-2 xs:px-3 py-1 rounded-md border text-xs xs:text-sm ${
                  currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'
                }`}
              >
                Prev
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                if (totalPages <= 5) return i + 1;
                if (currentPage <= 3) return i + 1;
                if (currentPage >= totalPages - 2) return totalPages - 4 + i;
                return currentPage - 2 + i;
              }).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-2 xs:px-3 py-1 rounded-md border text-xs xs:text-sm ${
                    currentPage === page ? 'bg-[#fff5e7] font-medium' : 'hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-2 xs:px-3 py-1 rounded-md border text-xs xs:text-sm ${
                  currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}