import React, { useEffect, useState } from 'react';
import { Form, Input, DatePicker, Select, Typography, Modal } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import PageTitle from '../Components/PageTitle';

const { Title } = Typography;
const { Option } = Select;

const EditLoanApplication = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();

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
  
  const [banks, setBanks] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const banksResponse = await axios.get('http://localhost:5000/banks/list');
        setBanks(banksResponse.data);

        const response = await axios.get(`http://localhost:5000/loan-applications/view/${id}`);
        const loanApplication = response.data;

        setPrograms(loanApplication.programs || []);
        form.setFieldsValue({
          ...loanApplication,
          birthDate: dayjs(loanApplication.birthDate),
          abroadDate: loanApplication.abroadDate ? dayjs(loanApplication.abroadDate) : null, // Initialize abroad date
        });
        setSelectedUniversity(loanApplication.university);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id, form]);

  const handleUniversityChange = value => {
    const selectedUni = universities.find(uni => uni.name === value);
    setPrograms(selectedUni ? selectedUni.programs : []);
    setSelectedUniversity(value);
    
    // Clear the program selection when the university changes
    form.setFieldsValue({ program: undefined, totalProgramFee: undefined, registrationFee: undefined, totalLoanAmount: undefined });
  };

  const handleProgramChange = value => {
    const selectedProgram = programs.find(prog => prog.id === value);
    if (selectedProgram) {
        form.setFieldsValue({
            program: selectedProgram.name, // Set program name
            totalProgramFee: selectedProgram.totalFee,
            registrationFee: selectedProgram.registrationFee,
            totalLoanAmount: selectedProgram.totalLoanAmount,
        });
    }
};


  const handleSubmit = async values => {
    Modal.confirm({
      title: 'Are you sure you want to update the application?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: async () => {
        try {
          const formattedValues = {
            ...values,
            birthDate: values.birthDate.format('YYYY-MM-DD'),
            abroadDate: values.abroadDate.format('YYYY-MM-DD'), // Format abroad date
          };
          await axios.put(`http://localhost:5000/loan-applications/update/${id}`, formattedValues);
          navigate('/loan-app-list');
        } catch (error) {
          console.error('Error updating loan application:', error);
        }
      },
    });
  };

  const handleCancel = () => {
    Modal.confirm({
      title: 'Are you sure you want to cancel?',
      content: 'Any unsaved changes will be lost.',
      okText: 'Yes, Cancel',
      cancelText: 'No',
      onOk: () => {
        navigate('/loan-app-list');
      },
    });
  };

  return (
    <div className="my-3 p-8 rounded border border-gray-200 lg:mx-10">
      <PageTitle title="Edit Loan Application" />
      <div className="bg-gray-50 min-h-screen flex flex-col items-center p-8">
        <div className="flex flex-col md:flex-row w-full max-w-7xl">
          <div className="w-full p-4">
            <Form
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
              className="bg-white p-10 rounded-xl shadow-lg"
            >
              <Title level={2} className="text-2xl font-bold text-gray-800 mb-6">
                Student Information
              </Title>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item name="studentId" label="Student ID" rules={[{ required: true }]}>
                  <Input placeholder="Student ID" disabled />
                </Form.Item>
                <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
                  <Input placeholder="First Name" disabled />
                </Form.Item>
                <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
                  <Input placeholder="Last Name" disabled />
                </Form.Item>
                <Form.Item name="address" label="Address" rules={[{ required: true }]}>
                  <Input placeholder="Address" />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                  <Input placeholder="Email" />
                </Form.Item>
                <Form.Item name="phoneNumber" label="Phone Number" rules={[{ required: true }]}>
                  <Input placeholder="Phone Number" />
                </Form.Item>
                <Form.Item name="birthDate" label="Birth Date" rules={[{ required: true }]}>
                  <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} disabled />
                </Form.Item>
                <Form.Item name="nic" label="NIC Number" rules={[{ required: true }]}>
                  <Input placeholder="NIC Number" disabled />
                </Form.Item>
              </div>

              <Title level={2} className="text-2xl font-bold text-gray-800 mb-6 mt-10">
                Course Information
              </Title>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item name="university" label="University" rules={[{ required: true }]}>
                  <Select placeholder="Select University" onChange={handleUniversityChange}>
                    {universities.map(uni => (
                      <Option key={uni.id} value={uni.name}>
                        {uni.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="program" label="Program" rules={[{ required: true }]}>
                  <Select
                    placeholder="Select Program"
                    onChange={handleProgramChange}
                    disabled={!selectedUniversity}
                  >
                    {programs.map(prog => (
                      <Option key={prog.id} value={prog.id}> {/* Use program ID as value */}
                        {prog.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="totalProgramFee" label="Total Program Fee">
                  <Input placeholder="Total Program Fee" disabled />
                </Form.Item>
                <Form.Item name="registrationFee" label="Registration Fee">
                  <Input placeholder="Registration Fee" disabled />
                </Form.Item>
                <Form.Item name="totalLoanAmount" label="Total Loan Amount">
                  <Input placeholder="Total Loan Amount" />
                </Form.Item>
                <Form.Item
  name="abroadDate"
  label="Date You Plan to Abroad"
  rules={[
    { required: true, message: 'Please select the date' },
    {
      validator: (_, value) => {
        const today = dayjs();
        const oneMonthLater = today.add(1, 'month');

        // Ensure value is a Day.js object
        if (!value || !dayjs(value).isValid() || dayjs(value).isBefore(oneMonthLater)) {
          return Promise.reject(new Error('The date must be at least one month from today.'));
        }

        return Promise.resolve();
      },
    },
  ]}
>
  <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
</Form.Item>


              </div>

              <Form.Item name="selectedBank" label="Select Bank" rules={[{ required: true }]}>
                <Select placeholder="Select a Bank">
                  {banks.map(bank => (
                    <Option key={bank.id} value={bank.bankName}>
                      {bank.bankName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <div className="flex justify-between mt-6">
                <motion.button
                  type="button"
                  onClick={handleCancel}
                  className="bg-red-500 text-white py-2 px-16 rounded-full text-lg font-semibold shadow-lg"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.1 }}
                  className="bg-grNavTextHov hover:bg-grNavText text-white py-2 px-8 rounded-full text-lg font-semibold shadow-lg"
                >
                  Update Application
                </motion.button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditLoanApplication;
