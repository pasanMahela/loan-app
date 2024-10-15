import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Select, Button, Typography, notification } from 'antd';
import { motion } from 'framer-motion';
import axios from 'axios';
import BankCard from './BankCard';
import BankDetailsModal from './BankDetailsModal';
import ComparePopup from './ComparePopup';
import PageTitle from '../Components/PageTitle';
import emailjs from '@emailjs/browser';
import LoanCalculator from './LoanCalculator';

const { Title } = Typography;
const { Option } = Select;

function ApplyLoan() {
  const navigate = useNavigate();
  const [selectedBank, setSelectedBank] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [universities, setUniversities] = useState([
  {
    id: 1,
    name: 'University of Melbourne',
    country: 'Australia',
    programs: [
      { id: 1, name: 'Master of Engineering', totalFee: 13000000, registrationFee: 325000 },
      { id: 2, name: 'Bachelor of Science', totalFee: 12350000, registrationFee: 292500 }
    ]
  },
  {
    id: 2,
    name: 'University of Oxford',
    country: 'United Kingdom',
    programs: [
      { id: 3, name: 'Master of Business Administration (MBA)', totalFee: 21125000, registrationFee: 390000 },
      { id: 4, name: 'Bachelor of Law (LLB)', totalFee: 10400000, registrationFee: 357500 }
    ]
  },
  {
    id: 3,
    name: 'University of Toronto',
    country: 'Canada',
    programs: [
      { id: 5, name: 'Master of Computer Science', totalFee: 14625000, registrationFee: 487500 },
      { id: 6, name: 'Bachelor of Arts', totalFee: 13650000, registrationFee: 455000 }
    ]
  }
]);

  
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [form] = Form.useForm();

  // Sample dataset for student information
  const sampleStudents = [
    {
      studentId: 'GR2020', 
      firstName: 'Pasan', 
      lastName: 'Mahela', 
      address: 'Pittugala, Malabe', 
      email: 'pasancp2000@gmail.com',
      phoneNumber: '0785358448',
      birthDate: '2000-10-01', 
      nicNumber: '200028100323' 
    },
    {
      studentId: 'GR2021', 
      firstName: 'Ashen', 
      lastName: 'Mayuranga', 
      address: 'New town, Anuradhapua', 
      email: 'ashen.ayuranga@gmail.com', 
      phoneNumber: '0785358448', 
      birthDate: '1999-05-12',
      nicNumber: '998765414V' 
    },
    {
      studentId: 'GR2022',
      firstName: 'Dinith',
      lastName: 'Maduranga',
      address: 'Panadura, Galle Road',
      email: 'dinith.gsw@gmail.com',
      phoneNumber: '0785358448',
      birthDate: '2001-03-22',
      nicNumber: '200135600612'
    },
    {
      studentId: 'GR2023',
      firstName: 'Hirumi',
      lastName: 'Navodya',
      address: 'Kandy Road, Peradeniya',
      email: 'cat861483@gmail.com',
      phoneNumber: '0785358448',
      birthDate: '1998-11-15',
      nicNumber: '981131345V'
    },
    {
      studentId: 'GR2024',
      firstName: 'Senitha',
      lastName: 'Tharaka',
      address: 'Main Street, Gampaha',
      email: 'senithrockz@gmail.com',
      phoneNumber: '0785358448',
      birthDate: '2000-09-30',
      nicNumber: '200038290734'
    },
    {
      studentId: 'GR2025',
      firstName: 'Jayangi',
      lastName: 'Jayawardena',
      address: 'Matara, Walgama',
      email: 'jayangizasso@gmail.com',
      phoneNumber: '0785358448',
      birthDate: '2002-06-25',
      nicNumber: '200245678912'
    }
  ];
  
  
  // State to store bank data fetched from the backend
  const [banks, setBanks] = useState([]);

  const [abroadDate, setAbroadDate] = useState(null); // State to store abroad date


  // Fetch banks data from backend when component mounts
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/banks/list');
        setBanks(response.data);
      } catch (error) {
        console.error('Error fetching bank data:', error);
      }
    };

    fetchBanks();
  }, []);

  const handleUniversityChange = (universityId) => {
    const university = universities.find((uni) => uni.id === universityId);
    if (university) {
      setPrograms(university.programs);
      setSelectedUniversity(universityId);
      form.setFieldsValue({ program: undefined, totalProgramFee: '', registrationFee: '', totalLoanAmount: '' });
    }
  };

  const handleProgramChange = (programId) => {
    const program = programs.find((prog) => prog.id === programId);
    if (program) {
      form.setFieldsValue({
        totalProgramFee: program.totalFee,
        registrationFee: program.registrationFee,
        totalLoanAmount: program.totalFee + program.registrationFee
      });
      setSelectedProgram(programId);
    }
  };

  const handleViewClick = (bank) => {
    setSelectedBank(bank);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBank(null);
  };

  const handleOpenCompare = () => {
    setIsCompareOpen(true);
  };

  const handleCloseCompare = () => {
    setIsCompareOpen(false);
  };

  // Send email after successful submission
  const sendEmail = async (payload) => {
    const serviceId = 'service_sgojxrq';
    const templateId = 'template_fdwp84n';
    const publicKey = 'gqgwN25yZzv5oiipv';
  
    const templateParams = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      studentId: payload.studentId,
      university: payload.university,
      program: payload.program,
      totalProgramFee: payload.totalProgramFee,
      registrationFee: payload.registrationFee,
      totalLoanAmount: payload.totalLoanAmount,
      selectedBank: payload.selectedBank,
      status: "Documenting",
      reply_to: "pasanmahela73@gmail.com",
      email: payload.email,
    };
  
    console.log('Template Params:', templateParams);  // Debugging line
  
    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);  // Enhanced error logging
    }
  };
  
  const sendSMS = async (payload) => {
    const smsBody = `Hello ${payload.firstName}, your loan application for ${payload.university} has been submitted. Total Loan Amount: Rs.${payload.totalLoanAmount}.00 and selected bank is ${payload.selectedBank}.Application Status : Processing`;
    const to = payload.phoneNumber.startsWith('0') ? '+94' + payload.phoneNumber.slice(1) : payload.phoneNumber;
    
    try {
      await axios.post('http://localhost:5000/send-sms', { body: smsBody, to });
      console.log('SMS sent successfully!');
    } catch (error) {
      console.error('Error sending SMS:', error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const universityName = universities.find(uni => uni.id === selectedUniversity)?.name || '';
      const program = programs.find(prog => prog.id === selectedProgram);
      const programName = program?.name || '';
      const bankName = values.selectedBank || '';
  
      const totalProgramFee = program?.totalFee || 0;
      const registrationFee = program?.registrationFee || 0;
      const totalLoanAmount = values.totalLoanAmount || 
      (program?.totalFee || 0) + (program?.registrationFee || 0);
      const nic = values.nicNumber;  // Use the correct key for NIC
  
      const payload = {
        ...values,
        university: universityName,
        program: programName,
        selectedBank: bankName,
        abroadDate, // Add abroad date
        totalProgramFee,  // Adding required field
        registrationFee,  // Adding required field
        totalLoanAmount,  // Adding required field
        nic,  // Adding required field
      };
  
      console.log('Payload:', payload);
  
      const response = await axios.post('http://localhost:5000/loan-applications/add', payload);
  
      console.log('Response:', response.data);

      // Send email
      await sendEmail(payload);

      // Send SMS
    await sendSMS(payload);

      // Show success notification
      notification.success({
        message: 'Success',
        description: 'Loan application submited successfully.',
      });
      
      // alert('Loan application submitted successfully!');
      navigate('/loan-app-list');
    } catch (error) {
      // console.error('Error submitting loan application:', error.response ? error.response.data : error.message);
      // alert('An error occurred. Please try again.');
      // Show error notification
      notification.error({
        message: 'Error',
        description: 'LAn error occurred. Please try again.',
      });
    }
  };

  // Function to search for student information by Student ID
  const handleSearchStudent = () => {
    const studentId = form.getFieldValue('studentId');
    const student = sampleStudents.find(s => s.studentId === studentId);

    if (student) {
      form.setFieldsValue({
        firstName: student.firstName,
        lastName: student.lastName,
        address: student.address,
        email: student.email,
        phoneNumber: student.phoneNumber,
        birthDate: student.birthDate,
        nicNumber: student.nicNumber
      });
      notification.success({
        message: 'Student Found',
        description: `Student data for ${studentId} loaded successfully.`,
      });
    } else {
      notification.error({
        message: 'Student Not Found',
        description: `No student found with ID: ${studentId}.`,
      });
    }
  };

  const handleUploadDocument = () => {
    navigate('/upload-do');
  };

  const handleCancel = () => {
    navigate('/loan-app-list');
  };

  return (
    <div className="my-3 p-8 rounded border border-gray-200 lg:mx-10">
      <PageTitle title="Student Loan Application" />
      <div className="bg-gray-50 min-h-screen flex flex-col items-center p-8">
        <div className="flex flex-col md:flex-row w-full max-w-7xl">
          <div className="w-full md:w-1/2 p-4">
            <Form
              onFinish={handleSubmit}
              className="bg-white p-10 rounded-xl shadow-lg"
              layout="vertical"
              form={form}
            >
              <Title level={2} className="text-2xl font-bold text-gray-800 mb-6">
                Student Information
              </Title>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Student ID */}
  <Form.Item
    name="studentId"
    label="Student ID"
    rules={[{ required: true, message: 'Please enter Student ID' }]}
  >
    <Input placeholder="Student ID" />
  </Form.Item>
  {/* Search Student */}
  <motion.div className="mt-8" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Button onClick={handleSearchStudent}>Search Student</Button>
  </motion.div>
  
  {/* First Name */}
  <Form.Item
    name="firstName"
    label="First Name"
    rules={[
      { required: true, message: 'Please enter First Name' },
      { pattern: /^[A-Z][a-z]*$/, message: 'Start with a capital letter' }
    ]}
  >
    <Input placeholder="First Name" disabled />
  </Form.Item>
  {/* Last Name */}
  <Form.Item
    name="lastName"
    label="Last Name"
    rules={[
      { required: true, message: 'Please enter Last Name' },
      { pattern: /^[A-Z][a-z]*$/, message: 'Start with a capital letter' }
    ]}
  >
    <Input placeholder="Last Name" disabled />
  </Form.Item>

  {/* Address */}
  <Form.Item
    name="address"
    label="Address"
    rules={[{ required: true, message: 'Please enter Address' }]}
  >
    <Input placeholder="Address" />
  </Form.Item>
  {/* Email */}
  <Form.Item
    name="email"
    label="Email"
    rules={[
      { required: true, message: 'Please enter Email' },
      { type: 'email', message: 'Please enter a valid Email' }
    ]}
  >
    <Input placeholder="Email" />
  </Form.Item>

  {/* Phone Number */}
  <Form.Item
    name="phoneNumber"
    label="Phone Number"
    rules={[
      { required: true, message: 'Please enter Phone Number' },
      { pattern: /^07\d{8}$/, message: 'Phone Number must start with 07 and be 10 digits long' }
    ]}
  >
    <Input placeholder="Phone Number" />
  </Form.Item>
  {/* Birth Date */}
  <Form.Item
    name="birthDate"
    label="Birth Date"
    rules={[{ required: true, message: 'Please enter Birth Date' }]}
  >
    <Input 
      placeholder="Birth Date" 
      type="date" 
      disabled
      max={new Date(new Date().setFullYear(new Date().getFullYear() - 16)).toISOString().split('T')[0]} 
    />
  </Form.Item>

  {/* NIC Number */}
  <Form.Item
    name="nicNumber"
    label="NIC Number"
    rules={[
      { required: true, message: 'Please enter NIC Number' },
      { pattern: /^(\d{9}[vV]|\d{12})$/, message: 'Enter valid NIC number' }
    ]}
  >
    <Input placeholder="NIC Number" disabled />
  </Form.Item>
</div>


              <Title level={2} className="text-2xl font-bold text-gray-800 mb-6 mt-10">
                Course Information
              </Title>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* University */}
  <Form.Item name="university" label="University" rules={[{ required: true }]}>
    <Select placeholder="Select University" onChange={handleUniversityChange}>
      {universities.map((uni) => (
        <Option key={uni.id} value={uni.id}>
          {uni.name}
        </Option>
      ))}
    </Select>
  </Form.Item>

  {/* Program */}
  <Form.Item name="program" label="Program" rules={[{ required: true }]}>
    <Select 
      placeholder="Select Program" 
      onChange={handleProgramChange} 
      disabled={!selectedUniversity}
    >
      {programs.map((prog) => (
        <Option key={prog.id} value={prog.id}>
          {prog.name}
        </Option>
      ))}
    </Select>
  </Form.Item>

  {/* Total Program Fee */}
  <Form.Item name="totalProgramFee" label="Total Program Fee">
    <Input placeholder="Total Program Fee" disabled />
  </Form.Item>

  {/* Registration Fee */}
  <Form.Item name="registrationFee" label="Registration Fee">
    <Input placeholder="Registration Fee" disabled />
  </Form.Item>

  {/* Total Loan Amount */}
  <Form.Item name="totalLoanAmount" label="Total Loan Amount">
    <Input placeholder="Total Loan Amount" />
  </Form.Item>
</div>


  <Form.Item
    name="selectedBank"
    label="Select Bank"
    rules={[{ required: true, message: 'Please select a bank' }]}
  >
    <Select placeholder="Select Bank">
      {banks.map((bank) => (
        <Option key={bank._id} value={bank.bankName}>
          {bank.bankName}
        </Option>
      ))}
    </Select>
  </Form.Item>

  {/* Abroad Study Date */}
<Form.Item
  name="abroadDate"
  label="Date You Plan to Abroad"
  rules={[
    { required: true, message: 'Please select the date' },
    {
      validator: (_, value) => {
        const today = new Date();
        const oneMonthLater = new Date(today.setMonth(today.getMonth() + 1));
        
        if (!value || new Date(value) >= oneMonthLater) {
          return Promise.resolve();
        }
        
        return Promise.reject(new Error('The date must be at least one month from today.'));
      },
    },
  ]}
>
  <Input
    type="date"
    onChange={(e) => setAbroadDate(e.target.value)}
    placeholder="Select the date"
  />
</Form.Item>


              <div className="flex flex-wrap justify-between mt-10">
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Button type="primary" htmlType="submit" className="w-full md:w-auto">
      Submit Application
    </Button>
  </motion.div>

  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Button onClick={handleCancel} className="w-full md:w-auto">
      Cancel
    </Button>
  </motion.div>

  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Button onClick={handleOpenCompare} className="w-full md:w-auto">
      Compare Banks
    </Button>
  </motion.div>

  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Button onClick={handleUploadDocument} className="w-full md:w-auto">
      Upload Documents
    </Button>
  </motion.div>
</div>

            </Form>
          </div>
          <div className="w-full lg:w-1/2 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {banks.map((bank) => (
              <motion.div
                key={bank._id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleViewClick(bank)}  // Pass the bank data here
              >
                <BankCard
                  bankName={bank.bankName}
                  rank={bank.rank}
                  logo={`http://localhost:5000${bank.bankIcon}`}
                  onViewClick={() => handleViewClick(bank)}  // Passing the function to open the modal
                />
              </motion.div>
            ))}
          </div>
          <LoanCalculator />

          </div>
        </div>
      </div>

      {/* Modals */}
      {isModalOpen && selectedBank && (
        <BankDetailsModal bank={selectedBank} onClose={handleCloseModal} />
      )}
      {isCompareOpen && (
        <ComparePopup onClose={handleCloseCompare} />
      )}

    </div>
  );
}

export default ApplyLoan;
