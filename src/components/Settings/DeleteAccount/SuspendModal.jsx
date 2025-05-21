import React, { useState } from 'react';

export default function SuspendModal({ isOpen, onClose, onConfirm, userEmail }) {
  const [email, setEmail] = useState('');
  const [isEmailMatch, setIsEmailMatch] = useState(false);

  if (!isOpen) return null;

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsEmailMatch(value === userEmail);
  };

  const handleConfirm = () => {
    if (isEmailMatch) {
      onConfirm(email);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl w-[90%] max-w-md shadow-xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Confirm Account Deletion
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          The account, along with any exclusively owned organizations and services will be permanently removed.
        </p>

        <div className="mb-4">
          <p className="text-sm text-gray-600">Your account email:</p>
          <p className="font-medium">{userEmail}</p>
        </div>

        <label className="block text-gray-700 font-medium mb-1" htmlFor="email">
          Type your email to confirm
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Type your email..."
          className={`w-full border ${isEmailMatch ? 'border-green-500' : 'border-gray-300'} rounded-lg px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-[var(--theme-color)]`}
        />
        {email && !isEmailMatch && (
          <p className="text-red-500 text-sm mb-4">Email does not match your account email</p>
        )}

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[var(--theme-color)] text-white hover:bg-white hover:border border-[var(--theme-color)] hover:text-[var(--theme-color)]"
          >
            Cancel
          </button>
          <button
            disabled={!isEmailMatch}
            onClick={handleConfirm}
            className={`px-4 py-2 rounded-lg ${
              isEmailMatch ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}