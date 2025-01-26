"use client"
import React, { useState } from 'react';
import axios from 'axios';

import { ApiRoutes } from "../constant/url.js";

const CreateBeneficiary = () => {
  const [cnic, setCnic] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [purpose, setPurpose] = useState('');
  const [department, setDepartment] = useState('');


  const handleCreateBeneficiary = async () => {
    if (!cnic || !name || !phone || !address || !purpose || !department) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    try {
      await axios.post(ApiRoutes.beneficary, {
        name,
        cnic,
        phone,
        address,
        purpose,
        department
      });




      alert('Beneficiary created successfully!');
      setCnic('');
      setName('');
      setPhone('');
      setAddress('');
      setPurpose('');
      setDepartment("")


    } catch (error) {
      console.error('Error creating beneficiary:', error);
      // alert('Failed to create beneficiary.');
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6 text-center">Create Beneficiary</h1>
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Enter Beneficiary Details</h2>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Enter CNIC"
            value={cnic}
            onChange={(e) => setCnic(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

<input
            type="text"
            placeholder="Enter Purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />


      <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                 
                </label>
                <select
                  id="role" 
                  name="role"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)} // Handle role selection
                  className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select department</option>
                  <option value="financial aid">financial aid</option>
                  <option value="medical assistance">medical assistance</option>
                
                </select>
              </div>
          <button
            onClick={handleCreateBeneficiary}
            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Create Beneficiary
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBeneficiary;
