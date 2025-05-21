import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPaymentDetails } from '../../reduxToolkit/slices/paymentSlice';

export default function PaymentDetails({ paymentId, onClose }) {
  const dispatch = useDispatch();
  const { currentPayment, detailsStatus, detailsError } = useSelector(state => state.payments);

  useEffect(() => {
    if (paymentId) {
      dispatch(fetchPaymentDetails(paymentId));
    }
  }, [paymentId, dispatch]);

  if (!paymentId) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Payment Details</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              &times;
            </button>
          </div>

          {detailsStatus === 'loading' ? (
            <p>Loading...</p>
          ) : detailsError ? (
            <p className="text-red-500">Error loading payment details</p>
          ) : currentPayment ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Invoice ID</p>
                  <p className="font-medium">{currentPayment.payment_id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment Date</p>
                  <p className="font-medium">
                    {new Date(currentPayment.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Amount</p>
                <p className="font-medium">${currentPayment.amount}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Method</p>
                  <p className="font-medium">{currentPayment.payment_method}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className={`font-medium ${
                    currentPayment.payment_status === 'Pending' ? 'text-orange-500' : 'text-green-500'
                  }`}>
                    {currentPayment.payment_status}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p>No payment details found</p>
          )}
        </div>
        <div className="bg-gray-50 px-6 py-3 flex justify-end rounded-b-lg">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}