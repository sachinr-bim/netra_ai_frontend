import React from 'react';

// Redux
import { useSelector } from 'react-redux';

// Packages and Libraries
import { useNavigate } from 'react-router-dom';

export default function Support() {

  const tickets = useSelector((state) => state.tickets.tickets)

  const navigate = useNavigate()

  const statusColor = {
    'Pending': 'text-yellow-500',
    'Need Reply': 'text-blue-500',
    'Resolved': 'text-green-500'
  };

  return (
    <div className="p-6 min-h-screen font-sans">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Support Requests</h1>
        <button className="text-[var(--theme-color)] text-lg font-semibold hover:underline" onClick={() => navigate('/supportRequest')}>+ Create Support Request</button>
      </div>

      <div className="bg-white mb-6 p-6 rounded-md">
        <div className="flex gap-8">
          <input
            type="text"
            placeholder="Search here..."
            className="w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--theme-color)]"
          />
          <button className="px-15 py-2 border border-[var(--theme-color)] text-[var(--theme-color)] rounded-md hover:bg-[var(--theme-color)] hover:text-white">Filter</button>
        </div>
      </div>

      {/* Card Headers */}
      <div className="grid grid-cols-7 bg-[#fff5e7] text-sm font-semibold text-gray-700 p-5 rounded-md mb-4">
        <div>#Tickets</div>
        <div>#Ticket Created Date & Time</div>
        <div className="col-span-2">Problem Info</div>
        <div>Status</div>
        <div>Resolved Date&Time</div>
        <div className="flex gap-3 justify-center text-md">
              <span className="cursor-pointer">View</span>
              <span className="cursor-pointer">Edit</span>
          </div>
      </div>

      {/* Ticket Cards */}
      <div className="space-y-4">
        {tickets.map((ticket, index) => (
          <div key={index} className="grid grid-cols-7 items-center bg-white p-5 rounded-md hover:bg-[#fff5e7] text-sm">
            <div>{ticket.id}</div>
            <div>{ticket.date}</div>
            <div className="col-span-2">{ticket.info}</div>
            <div className={`font-medium ${statusColor[ticket.status]}`}>{ticket.status}</div>
            <div>{ticket.date}</div>
            <div className="flex gap-3 justify-center text-[var(--theme-color)] text-md">
              <span className="cursor-pointer hover:underline">View</span>
              <span className="cursor-pointer hover:underline">Edit</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
