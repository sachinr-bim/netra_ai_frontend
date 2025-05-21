import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateTicketStatus } from '../../reduxToolkit/slices/ticketSlice';

export default function EditTicket() {
  const { ticketId } = useParams(); // Get ticketId from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tickets, loading, error } = useSelector((state) => state.tickets);
  
  // Find the ticket to edit
  const ticketToEdit = tickets.find(t => t.id === `${ticketId}`);
  
  // Form state
  const [formData, setFormData] = useState({
    issue_name: ticketToEdit?.info || '',
    status: ticketToEdit?.status || 'Open'
  });

  useEffect(() => {
    if (ticketToEdit) {
      setFormData({
        issue_name: ticketToEdit.info,
        status: ticketToEdit.status
      });
    }
  }, [ticketToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateTicketStatus({
        ticketId,
        updateData: formData
      })).unwrap();
      navigate('/support'); // Navigate back after successful update
    } catch (err) {
      console.error('Failed to update ticket:', err);
    }
  };

  if (!ticketToEdit) {
    return (
      <div className="max-w-screen mx-auto bg-white p-4 md:p-8 rounded-md font-sans">
        <h1 className="text-xl md:text-2xl font-semibold mb-4">Ticket not found</h1>
        <button 
          onClick={() => navigate('/support')}
          className="text-[var(--theme-color)] hover:underline"
        >
          Back to Support
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-screen mx-auto bg-white p-4 md:p-8 rounded-md font-sans">
      <h1 className="text-xl md:text-2xl font-semibold mb-1">Edit Support Ticket #{ticketId}</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error.message || 'Failed to update ticket'}
        </div>
      )}

      <form className="space-y-4 md:space-y-5" onSubmit={handleSubmit}>
        {/* Issue Name */}
        <div>
          <label className="block font-medium mb-1 text-sm md:text-base">
            Issue<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="issue_name"
            value={formData.issue_name}
            onChange={handleChange}
            className="w-full p-2 md:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--theme-color)] text-sm md:text-base"
            required
          />
        </div>

        {/* Status */}
        <div>
          <label className="block font-medium mb-2 text-sm md:text-base">
            Status<span className="text-red-500">*</span>
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 md:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--theme-color)] text-sm md:text-base"
            required
          >
            <option value="Open">Open</option>
            <option value="Pending">Pending</option>
            <option value="Need Reply">Need Reply</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
          <button
            type="button"
            onClick={() => navigate('/support')}
            className="w-full md:w-auto bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:opacity-90 transition-opacity text-sm md:text-base"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full md:w-auto bg-[var(--theme-color)] text-white px-6 py-3 rounded-md hover:opacity-90 transition-opacity text-sm md:text-base"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Ticket'}
          </button>
        </div>
      </form>
    </div>
  );
}