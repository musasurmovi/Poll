import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion'; 
import pollSteps from './utils/pollConfig';
import Summary from './components/Summary';
import Sidebar from './components/PollSideBar';
import Step from './components/Steps';

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(Array(pollSteps.length).fill(null));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleSelectOption = (stepIndex, optionIndex) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[stepIndex] = pollSteps[stepIndex].options[optionIndex];
    setSelectedOptions(updatedOptions);

    if (stepIndex === pollSteps.length - 1) {
      submitPoll(updatedOptions);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const submitPoll = async (selectedOptions) => {
    try {
      const response = await mockApiRequest(selectedOptions);
      if (response.status === 201) {
        setIsSubmitted(true);
        setSubmissionMessage('Thank you for completing the poll!');
      } else {
        throw new Error('Failed to submit poll');
      }
    } catch (error) {
      setIsSubmitted(false);
      setSubmissionMessage('Something went wrong. Please try again later.');
    }
  };

  const mockApiRequest = (data) => {
    console.log(data);
    return fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Poll Submission',
        body: JSON.stringify(data),
        userId: 1,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Poll Submitted:', data);
        return { status: 201 };
      })
      .catch((error) => {
        console.error('Error:', error);
        throw error;
      });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar currentStep={currentStep} pollSteps={pollSteps} />
      <div className="flex-1 flex items-center justify-center p-4">
        <AnimatePresence> 
          {isSubmitted ? (
            <div className="p-8 bg-white shadow-lg rounded-lg">
              <h2 className="text-2xl font-bold mb-4">{submissionMessage}</h2>
            </div>
          ) : currentStep < pollSteps.length ? (
            <Step
              key={currentStep}  
              step={pollSteps[currentStep]}
              onSelectOption={(optionIndex) => handleSelectOption(currentStep, optionIndex)}
              selectedOption={selectedOptions[currentStep]}
            />
          ) : (
            <Summary selectedOptions={selectedOptions} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
