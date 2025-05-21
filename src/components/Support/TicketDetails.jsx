import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTicket } from '../../reduxToolkit/slices/ticketSlice';

const TicketDetails = ({ ticketData, onClose, onDeleteSuccess }) => {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const statusColors = {
    'Open': 'bg-blue-100 text-blue-800',
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Need Reply': 'bg-orange-100 text-orange-800',
    'Resolved': 'bg-green-100 text-green-800',
    'Closed': 'bg-gray-100 text-gray-800'
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await dispatch(deleteTicket(ticketData.ticket_id || ticketData.id.replace('#', ''))).unwrap();
      onDeleteSuccess();
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            Ticket #{ticketData.ticket_id || ticketData.id.replace('#', '')}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
            disabled={isDeleting}
          >
            &times;
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Shop ID</h3>
                <p className="mt-1 text-sm">{ticketData.shop_id}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Issue</h3>
                <p className="mt-1 text-sm">{ticketData.issue_name || ticketData.info}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  statusColors[ticketData.status] || 'bg-gray-100 text-gray-800'
                }`}>
                  {ticketData.status}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Created At</h3>
                <p className="mt-1 text-sm">
                  {new Date(ticketData.createdAt || ticketData.date).toLocaleString()}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
                <p className="mt-1 text-sm">
                  {ticketData.updatedAt 
                    ? new Date(ticketData.updatedAt).toLocaleString() 
                    : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t p-4 flex justify-between">
          <div>
            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-4 py-2 text-red-700 border border-red-700 rounded-md hover:bg-red-50"
                disabled={isDeleting}
              >
                Delete Ticket
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-700">Confirm deletion?</span>
                <button
                  onClick={handleDelete}
                  className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Deleting...
                    </span>
                  ) : 'Confirm'}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-3 py-1.5 text-sm bg-gray-200 rounded-md hover:bg-gray-300"
                  disabled={isDeleting}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              disabled={isDeleting}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;