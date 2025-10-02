import React from "react";

export default function ErrorPopup({ message, isVisible, onClose }) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 relative">
        <button
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        <p className="text-red-600 text-center">{message}</p>
        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
