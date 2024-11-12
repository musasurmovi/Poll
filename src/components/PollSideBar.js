import React from 'react';

const Sidebar = ({ currentStep, pollSteps }) => {
  return (
    <div className="w-1/4 p-6 bg-blue-600 text-white flex flex-col items-start">
      <div className="flex flex-row justify-start space-x-4 items-center h-full">
        <div className="flex flex-col items-center space-y-2">
          {pollSteps.map((step, index) => (
            <div key={index} className="flex items-center">
              <span
                className={`w-2 h-2 rounded-full ${
                  currentStep === index ? 'border-2 border-white' : 'bg-white'
                } transition-all duration-300 ease-in-out`}
              ></span>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-center flex-grow">
          <span className="text-2xl font-semibold text-white animate__animated animate__fadeIn">
            {pollSteps[currentStep].title}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
