// src/components/LoanCalculator.js
import React, { useState } from 'react';
import { Input, Form, Button, Typography } from 'antd';

const { Title, Text } = Typography;

function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [repaymentYears, setRepaymentYears] = useState(0);
  const [emi, setEmi] = useState(0);

  const calculateEMI = () => {
    const P = parseFloat(loanAmount);
    const R = parseFloat(interestRate) / 12 / 100;
    const N = parseFloat(repaymentYears) * 12;

    const monthlyEMI = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    setEmi(monthlyEMI.toFixed(2));
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg mt-8">
      <Title level={3} className="text-center mb-6">Loan EMI Calculator</Title>
      <Form layout="vertical" onFinish={calculateEMI}>
        <Form.Item label="Loan Amount" required>
          <Input 
            type="number" 
            onChange={(e) => setLoanAmount(e.target.value)} 
            placeholder="Enter loan amount"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </Form.Item>
        <Form.Item label="Interest Rate (%) per annum" required>
          <Input 
            type="number" 
            onChange={(e) => setInterestRate(e.target.value)} 
            placeholder="Enter interest rate"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </Form.Item>
        <Form.Item label="Repayment Period (Years)" required>
          <Input 
            type="number" 
            onChange={(e) => setRepaymentYears(e.target.value)} 
            placeholder="Enter repayment period"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </Form.Item>
        <Button 
          type="primary" 
          htmlType="submit" 
          block 
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
        >
          Calculate EMI
        </Button>
      </Form>
      {emi > 0 && (
        <div className="mt-6 bg-gray-100 p-4 rounded-md text-center">
          <Text>Your Estimated Monthly EMI is:</Text>
          <Title level={4} className="text-blue-500 mt-2">Rs.{emi}</Title>
        </div>
      )}
    </div>
  );
}

export default LoanCalculator;
