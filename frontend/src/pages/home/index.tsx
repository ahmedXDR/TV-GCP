import React, { useState } from 'react';

const HomePage = () => {
  const [showForm, setShowForm] = useState(false);
  const [reason, setReason] = useState('');

  const handleRequestClick = () => {
    setShowForm(true);
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can send the reason to the server or perform any other desired action
    console.log('Reason:', reason);
    // Reset the form
    setReason('');
    setShowForm(false);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-8">
      {!showForm && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleRequestClick}
        >
          Request for Elevating Permissions
        </button>
      )}
      {showForm && (
        <form className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-6">Request for Elevating Permissions</h3>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="reason">
              Reason:
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={handleReasonChange}
              rows={4}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Please describe the reason for requesting elevated permissions..."
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default HomePage;
