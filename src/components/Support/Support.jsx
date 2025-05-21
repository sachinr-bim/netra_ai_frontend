import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchTicketsByShop } from '../../reduxToolkit/slices/ticketSlice';
import TicketDetails from './TicketDetails';

export default function Support() {
  const dispatch = useDispatch();
  const { tickets, loading, error } = useSelector((state) => state.tickets);
  const navigate = useNavigate();

  const shopId = 2; 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    dispatch(fetchTicketsByShop(shopId));
  }, [dispatch, shopId]);

  const statusColor = {
    'Open': 'text-blue-500',
    'Pending': 'text-yellow-500',
    'Need Reply': 'text-orange-500',
    'Resolved': 'text-green-500',
    'Closed': 'text-gray-500'
  };

  const handleDeleteSuccess = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
    dispatch(fetchTicketsByShop(shopId)); // Refresh list after delete
  };

  if (loading && !tickets.length) {
    return (
      <div className="p-6 min-h-screen font-sans flex justify-center items-center">
        <div className="text-xl">Loading tickets...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 min-h-screen font-sans">
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
          Error loading tickets: {error.message || 'Unknown error'}
        </div>
        <button 
          onClick={() => dispatch(fetchTicketsByShop(shopId))}
          className="px-4 py-2 bg-[var(--theme-color)] text-white rounded-md"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen font-sans">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Support Requests</h1>
        <button 
          className="text-[var(--theme-color)] text-lg font-semibold hover:underline" 
          onClick={() => navigate('/supportRequest')}
        >
          + Create Support Request
        </button>
      </div>

      <div className="bg-white mb-6 p-6 rounded-md">
        <div className="flex gap-8">
          <input
            type="text"
            placeholder="Search here..."
            className="w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--theme-color)]"
          />
          <button className="px-15 py-2 border border-[var(--theme-color)] text-[var(--theme-color)] rounded-md hover:bg-[var(--theme-color)] hover:text-white">
            Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 bg-[#fff5e7] text-sm font-semibold text-gray-700 p-5 rounded-md mb-4">
        <div>Ticket ID</div>
        <div>Created Date</div>
        <div className="col-span-2">Issue</div>
        <div>Status</div>
        <div>Last Updated</div>
        <div className="flex gap-3 justify-center">Actions</div>
      </div>

      <div className="space-y-4">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <div key={ticket.ticket_id || ticket.id} className="grid grid-cols-7 items-center bg-white p-5 rounded-md hover:bg-[#fff5e7] text-sm">
              <div>{`#${ticket.id}`}</div>
              <div>{new Date(ticket.createdAt || ticket.date).toLocaleString()}</div>
              <div className="col-span-2">{ticket.issue_name || ticket.info}</div>
              <div className={`font-medium ${statusColor[ticket.status] || 'text-gray-500'}`}>
                {ticket.status}
              </div>
              <div>
                {ticket.updatedAt ? new Date(ticket.updatedAt).toLocaleString() : 'N/A'}
              </div>
              <div className="flex gap-3 justify-center text-[var(--theme-color)]">
                <span 
                  className="cursor-pointer hover:underline"
                  onClick={() => {
                    setSelectedTicket(ticket);
                    setIsModalOpen(true);
                  }}
                >
                  View
                </span>
                <span 
                  className="cursor-pointer hover:underline"
                  onClick={() => navigate(`/editTicket/${ticket.id}`)}
                >
                  Edit
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-5 rounded-md text-center">
            No tickets found
          </div>
        )}
      </div>

      {isModalOpen && selectedTicket && (
        <TicketDetails 
          ticketData={selectedTicket}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTicket(null);
          }}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  );
}