import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createTicket } from '../../reduxToolkit/slices/ticketSlice';

export default function SupportRequest() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.tickets);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: 'BD +880',
    mobile: '',
    shopId: '',
    priority: 'Low',
    issue: ''
  });

  const [shops, setShops] = useState([
    { id: 1, name: 'Sailor Shop' },
    { id: 2, name: 'Oceanic Mart' },
    { id: 3, name: 'Wave Depot' }
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePriorityChange = (priority) => {
    setFormData(prev => ({
      ...prev,
      priority
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare ticket data for API
    const ticketData = {
      shop_id: formData.shopId,
      issue_name: formData.issue,
      // Add other fields as needed by your API
      priority: formData.priority,
      contact_info: {
        name: formData.name,
        email: formData.email,
        phone: `${formData.countryCode} ${formData.mobile}`
      }
    };

    try {
      await dispatch(createTicket(ticketData)).unwrap();
      navigate('/support'); // Navigate after successful submission
    } catch (err) {
      console.error('Failed to create ticket:', err);
      // Handle error (show toast/message)
    }
  };

  return (
    <div className="max-w-screen mx-auto bg-white p-4 md:p-8 rounded-md font-sans">
      {/* Header */}
      <h1 className="text-xl md:text-2xl font-semibold mb-1">Support Request Form</h1>
      <p className="text-xs md:text-sm text-gray-500 mb-4 md:mb-6">
        Welcome to our support request page. Please complete the following Support Request Form to contact our support
        team. You will receive an answer within maximum 2 business days. For urgent matters please call us on 111-111-1111.
      </p>

      {/* Error message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error.message || 'Failed to submit ticket'}
        </div>
      )}

      {/* Form Starts */}
      <form className="space-y-4 md:space-y-5" onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label className="block font-medium mb-1 text-sm md:text-base">Name<span className="text-red-500">*</span></label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Mr. Kinley"
            className="w-full p-2 md:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--theme-color)] text-sm md:text-base"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium mb-1 text-sm md:text-base">Email Address<span className="text-red-500">*</span></label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="kinley43@gmail.com"
            className="w-full p-2 md:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--theme-color)] text-sm md:text-base"
            required
          />
        </div>

        {/* Mobile */}
        <div>
          <label className="block font-medium mb-1 text-sm md:text-base">Mobile number<span className="text-red-500">*</span></label>
          <div className="flex gap-2 md:gap-3">
            <select 
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              className="p-2 md:p-3 border border-gray-300 rounded-md text-sm md:text-base"
            >
              <option value="BD +880">BD +880</option>
              <option value="IN +91">IN +91</option>
              <option value="US +1">US +1</option>
            </select>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="1254367598"
              className="flex-1 p-2 md:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--theme-color)] text-sm md:text-base"
              required
            />
          </div>
        </div>

        {/* Shop Dropdown */}
        <div>
          <label className="block font-medium mb-1 text-sm md:text-base">Choose Shop</label>
          <select 
            name="shopId"
            value={formData.shopId}
            onChange={handleChange}
            className="w-full p-2 md:p-3 border border-gray-300 rounded-md text-sm md:text-base"
          >
            <option value="">Select a shop</option>
            {shops.map(shop => (
              <option key={shop.id} value={shop.id}>{shop.name}</option>
            ))}
          </select>
        </div>

        {/* Priority */}
        <div>
          <label className="block font-medium mb-2 text-sm md:text-base">Priority Level<span className="text-red-500">*</span></label>
          <div className="flex gap-2 md:gap-4 flex-wrap">
            {['Low', 'Medium', 'High'].map((level) => (
              <button
                type="button"
                key={level}
                onClick={() => handlePriorityChange(level)}
                className={`flex items-center gap-1 md:gap-2 px-8 md:px-6 py-2 md:py-3 border rounded-md transition-all flex-1 md:flex-none min-w-[100px] justify-center
                  ${formData.priority === level
                    ? 'border-[var(--theme-color)]'
                    : 'border-gray-300 hover:border-gray-400'}
                `}
              >
                <span
                  className={`w-2 md:w-3 h-2 md:h-3 rounded-full ${
                    level === 'Low' ? 'bg-cyan-600' :
                    level === 'Medium' ? 'bg-orange-400' :
                    'bg-red-600'
                  }`}
                />
                <span className="text-xs md:text-sm">{level}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Problem Input */}
        <div>
          <label className="block font-medium mb-1 text-sm md:text-base">Type Problem<span className="text-red-500">*</span></label>
          <textarea
            rows={4}
            name="issue"
            value={formData.issue}
            onChange={handleChange}
            placeholder="Type problem here…."
            className="w-full p-2 md:p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-[var(--theme-color)] text-sm md:text-base"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
          <button
            type="button"
            className="w-full md:w-auto bg-[var(--theme-color)] text-white px-6 py-3 rounded-md hover:opacity-90 transition-opacity text-sm md:text-base"
            onClick={() => navigate('/support')}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full md:w-auto bg-[var(--theme-color)] text-white px-6 py-3 rounded-md hover:opacity-90 transition-opacity text-sm md:text-base"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
}