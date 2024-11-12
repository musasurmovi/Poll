import React from 'react';

const Summary = ({ selectedOptions }) => {
  return (
    <div className="p-8 bg-white shadow-lg rounded-lg animate__animated animate__fadeIn animate__delay-1s">
      <h2 className="text-2xl font-bold mb-4">Summary</h2>
      <ul>
        {selectedOptions.map((option, index) => (
          <li key={index} className="mb-2">
            <span className="font-semibold">Step {index + 1}:</span> {option?.label || 'No selection'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Summary;
