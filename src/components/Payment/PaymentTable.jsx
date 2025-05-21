import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteExistingPayment } from '../../reduxToolkit/slices/paymentSlice';
import PaymentDetails from './PaymentDetails';

export default function PaymentTable({ filteredPayments }) {
  const dispatch = useDispatch();
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [showDropdownId, setShowDropdownId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  // Calculate pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredPayments.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredPayments.length / recordsPerPage);

  const handleDelete = (paymentId) => {
    if (window.confirm("Are you sure you want to delete this payment?")) {
      dispatch(deleteExistingPayment(paymentId));
      // Reset to first page if the last record on current page is deleted
      if (currentRecords.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const toggleDropdown = (paymentId, e) => {
    e.stopPropagation();
    setShowDropdownId(showDropdownId === paymentId ? null : paymentId);
  };

  const closeDropdown = () => {
    setShowDropdownId(null);
  };

  useEffect(() => {
    const handleClickOutside = () => closeDropdown();
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Reset to first page when filteredPayments changes
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
      
      <div className="p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-semibold mb-4">Payment List</h1>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#fff5e7]">
                {["Invoice ID", "Payment Date", "Amount", "Method", "Status", "Action"].map(header => (
                  <th key={header} className="text-left p-3 md:p-4 text-sm md:text-base whitespace-nowrap">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentRecords.length > 0 ? (
                currentRecords.map((payment) => (
                  <tr key={payment.transaction_id} className="hover:bg-[#fff5e7]/50 border-t border-gray-100">
                    <td className="p-3 md:p-4 text-sm md:text-base whitespace-nowrap">{payment.transaction_id}</td>
                    <td className="p-3 md:p-4 text-sm md:text-base whitespace-nowrap">
                      {new Date(payment.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="p-3 md:p-4 text-sm md:text-base whitespace-nowrap">${payment.amount}</td>
                    <td className="p-3 md:p-4 text-sm md:text-base whitespace-nowrap">{payment.payment_method}</td>
                    <td className={`p-3 md:p-4 text-sm md:text-base font-medium whitespace-nowrap ${
                      payment.payment_status === 'Pending' ? 'text-orange-500' : 'text-green-500'
                    }`}>
                      {payment.payment_status}
                    </td>
                    <td className="p-3 md:p-4 text-gray-500 cursor-pointer text-xl relative">
                      <button 
                        onClick={(e) => toggleDropdown(payment.payment_id, e)}
                        className="text-xl hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center"
                      >
                        ⋮
                      </button>
                      
                      {showDropdownId === payment.payment_id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                          <button 
                            onClick={() => {
                              setSelectedPaymentId(payment.payment_id);
                              closeDropdown();
                            }}
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            View
                          </button>
                          <button 
                            onClick={() => {
                              handleDelete(payment.payment_id);
                              closeDropdown();
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">
                    No payments found matching your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {filteredPayments.length > recordsPerPage && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">
              Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredPayments.length)} of {filteredPayments.length} entries
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md border ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}`}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-md border ${currentPage === page ? 'bg-[#fff5e7] font-medium' : 'hover:bg-gray-100'}`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md border ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}`}
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