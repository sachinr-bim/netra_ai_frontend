import React, { useState } from 'react';

// Packages and Libraries
import { useNavigate } from 'react-router-dom';

export default function SupportRequest() {

    const navigate = useNavigate()

  const [priority, setPriority] = useState('Low');

  return (
    <div className="max-w-screen mx-auto bg-white p-4 md:p-8 rounded-md font-sans">
      {/* Header */}
      <h1 className="text-xl md:text-2xl font-semibold mb-1">Support Request Form</h1>
      <p className="text-xs md:text-sm text-gray-500 mb-4 md:mb-6">
        Welcome to our support request page. Please complete the following Support Request Form to contact our support
        team. You will receive an answer within maximum 2 business days. For urgent matters please call us on 111-111-1111.
      </p>

      {/* Form Starts */}
      <form className="space-y-4 md:space-y-5">
        {/* Name */}
        <div>
          <label className="block font-medium mb-1 text-sm md:text-base">Name<span className="text-red-500">*</span></label>
          <input
            type="text"
            placeholder="Mr. Kinley"
            className="w-full p-2 md:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--theme-color)] text-sm md:text-base"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium mb-1 text-sm md:text-base">Email Address<span className="text-red-500">*</span></label>
          <input
            type="email"
            placeholder="kinley43@gmail.com"
            className="w-full p-2 md:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--theme-color)] text-sm md:text-base"
          />
        </div>

        {/* Mobile */}
        <div>
          <label className="block font-medium mb-1 text-sm md:text-base">Mobile number<span className="text-red-500">*</span></label>
          <div className="flex gap-2 md:gap-3">
            <select className="p-2 md:p-3 border border-gray-300 rounded-md text-sm md:text-base">
              <option>BD +880</option>
              <option>IN +91</option>
              <option>US +1</option>
            </select>
            <input
              type="tel"
              placeholder="1254367598"
              className="flex-1 p-2 md:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--theme-color)] text-sm md:text-base"
            />
          </div>
        </div>

        {/* Shop Dropdown */}
        <div>
          <label className="block font-medium mb-1 text-sm md:text-base">Choose Shop</label>
          <select className="w-full p-2 md:p-3 border border-gray-300 rounded-md text-sm md:text-base">
            <option>Sailor Shop</option>
            <option>Oceanic Mart</option>
            <option>Wave Depot</option>
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
                onClick={() => setPriority(level)}
                className={`flex items-center gap-1 md:gap-2 px-8 md:px-6 py-2 md:py-3 border rounded-md transition-all flex-1 md:flex-none min-w-[100px] justify-center
                  ${priority === level
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
            placeholder="Type problem here…."
            className="w-full p-2 md:p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-[var(--theme-color)] text-sm md:text-base"
          />
        </div>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
          <button
            type="submit"
            className="w-full md:w-auto bg-[var(--theme-color)] text-white px-6 py-3 rounded-md hover:opacity-90 transition-opacity text-sm md:text-base"
            onClick={() => navigate('/support')}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full md:w-auto bg-[var(--theme-color)] text-white px-6 py-3 rounded-md hover:opacity-90 transition-opacity text-sm md:text-base"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}