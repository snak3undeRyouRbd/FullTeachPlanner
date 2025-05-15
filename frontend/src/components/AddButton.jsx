import React from 'react';

const AddButton = ({ text, onClick }) => (
  <button
    className="btn btn-gray-800 d-inline-flex align-items-center me-2"
    onClick={onClick}
  >
    <svg
      className="icon icon-xs me-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
    {text}
  </button>
);

export default AddButton;