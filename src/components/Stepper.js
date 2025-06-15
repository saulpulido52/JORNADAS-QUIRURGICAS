import React from 'react';

const Stepper = ({ currentStep, steps }) => {
  return (
    <div className="mb-5">
      <ul className="list-unstyled d-flex justify-content-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <li key={index} className="text-center w-100">
              <div 
                className={`rounded-circle mx-auto d-flex align-items-center justify-content-center ${isCompleted ? 'bg-success text-white' : isActive ? 'bg-primary text-white' : 'bg-secondary text-white'}`} 
                style={{ width: '40px', height: '40px' }}
              >
                {stepNumber}
              </div>
              <p className={`mt-2 ${isActive ? 'fw-bold' : 'text-muted'}`}>{step}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Stepper;