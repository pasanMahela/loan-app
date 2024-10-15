import banner from "../Images/service.jpg"; // Import the image
import React, { useState } from 'react';
import { FaCalculator } from 'react-icons/fa'; // Import the calculator icon

function ServicesBanner() {
  const [showCalculator, setShowCalculator] = useState(false);
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [emi, setEmi] = useState(null);

  // EMI Calculation function
  const calculateEMI = () => {
    const P = parseFloat(loanAmount); // Principal or loan amount
    const r = parseFloat(interestRate); // Monthly interest rate
    const n = parseInt(tenure); // Loan tenure in months

    if (P && r && n) {
      const emiValue = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setEmi(emiValue.toFixed(2)); // Set EMI value rounded to two decimal places
    } else {
      setEmi('Please fill all the fields correctly.');
    }
  };

  return (
    <div 
      className="relative h-96 bg-cover bg-center" 
      style={{ backgroundImage: `url(${banner})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Text Content */}
      <div className="absolute left-10 top-1/2 transform -translate-y-1/2 flex flex-col">
        <h1 className="text-white text-4xl font-bold">Education Loan</h1>
        <div className="w-12 h-1 bg-red-600 mt-4"></div>
      </div>

      {/* Button */}
      <div className="absolute right-10 top-1/2 transform -translate-y-1/2 flex flex-col">
        <button 
          className="bg-yellow-400 text-black font-semibold py-2 px-4 my-4 rounded-md shadow-lg hover:bg-yellow-500 transition duration-300 flex items-center"
          onClick={() => setShowCalculator(true)} // Toggle calculator
        >
          <FaCalculator className="mr-2" />
          Calculator
        </button>
        <button 
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-lg hover:bg-blue-800 transition duration-300"
          onClick={() => window.location.href = './loan-app-list'} // Navigate to loan app list
        >
          Application List
        </button>
      </div>

      {/* Calculator Modal */}
      {showCalculator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Loan EMI Calculator</h2>

            {/* Input Fields */}
            <div className="mb-4">
              <label className="block mb-2">Loan Amount (LKR):</label>
              <input 
                type="number" 
                className="border px-4 py-2 w-full" 
                value={loanAmount} 
                onChange={(e) => setLoanAmount(e.target.value)} 
                placeholder="Enter loan amount" 
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Interest Rate (% p.a.):</label>
              <input 
                type="number" 
                className="border px-4 py-2 w-full" 
                value={interestRate} 
                onChange={(e) => setInterestRate(e.target.value)} 
                placeholder="Enter annual interest rate" 
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Tenure (months):</label>
              <input 
                type="number" 
                className="border px-4 py-2 w-full" 
                value={tenure} 
                onChange={(e) => setTenure(e.target.value)} 
                placeholder="Enter loan tenure in months" 
              />
            </div>

            {/* Calculate Button */}
            <button 
              onClick={calculateEMI} 
              className="bg-yellow-400 text-black font-semibold py-2 px-4 rounded-md shadow-lg hover:bg-yellow-500 transition duration-300 w-full mb-4"
            >
              Calculate EMI
            </button>

            {/* Display EMI Result */}
            {emi && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">
                  Equated Monthly Instalment (EMI):
                </h3>
                <p className="text-2xl font-bold">Rs. {emi}</p>
              </div>
            )}

            {/* Close Button */}
            <button 
              onClick={() => setShowCalculator(false)} 
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ServicesBanner;
