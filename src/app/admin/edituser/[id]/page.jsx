"use client";
import React, { useState,useEffect, useRef } from "react";
import axios from "axios";
import {QRCodeCanvas } from "qrcode.react"; // Import the QR code library
import { ApiRoutes } from "../../../constant/url.js";
import { toast } from "react-toastify";
import { useParams } from 'next/navigation';

const EditBeneficiary = () => {
  const [cnic, setCnic] = useState("");
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [address, setAddress] = useState("");
  const [purpose, setPurpose] = useState("");
  const [department, setDepartment] = useState("");
  const [beneficiaryData, setBeneficiaryData] = useState([]);
  const [remarks, setRemarks] = useState(""); // State to store the generated token
  const [status, setStatus] = useState(""); // State to store the generated token
  const [token, setToken] = useState(""); // State to store the generated token
  const printRef = useRef(null); // Reference for the printable section

  const [qrReady, setQrReady] = useState(false);

  useEffect(() => {
    if (printRef.current) {
      setQrReady(true); // QR Code has rendered
    }
  }, [token]);

  const params = useParams(); // No need to unwrap in client components
  const id = params?.id;
   


  const fetchBeneficiarybyid=async()=>{
    try {
     const beneDAta= await axios.get(`${ApiRoutes.beneficary}/${id}`)
       console.log("beneficiaryData",beneDAta);
       setBeneficiaryData(beneDAta)
    } catch (error) {
        console.log(error);
        
    }
  }

 

useEffect(()=>{
     
  fetchBeneficiarybyid()

},[id])

useEffect(() => {
  setCnic(beneficiaryData?.data?.cnic || "");
  setName(beneficiaryData?.data?.name || "");
  setemail(beneficiaryData?.data?.email || "");
  setAddress(beneficiaryData?.data?.address || "");
  setPurpose(beneficiaryData?.data?.purpose || "");
  // setDepartment(beneficiaryData?.data?.department || "");
}, [beneficiaryData]);


  const handleUpdateBeneficiary = async () => {
    if (!cnic || !name || !email || !address || !purpose || !department ||!status || !remarks) {
      toast.error("Please fill in all fields before submitting.",{
        position:'top-center'
      });
      return;
    }
    
  

    try {
      // Step 1: Send data to backend to create beneficiary
      await axios.put(`${ApiRoutes.beneficary}/admin/${id}`, {
        cnic,
        name,
        email,
        address,
        purpose,
        remarks,
        status,
        department,
      });

      // Step 2: Generate a token using beneficiary details
      const tokenData = {
        name,
        cnic,
        email,
        address,
        purpose,
        department,
        timestamp: Date.now(), // Include a timestamp for uniqueness
      };
      const generatedToken = btoa(JSON.stringify(tokenData)); // Encode the data as base64
        
      setToken(generatedToken); // Set the token in state

      // Reset form fields
    toast.success("Beneficiary Updated successfully!",{
      position: 'top-center'
    });
      setCnic("");
      setName("");
      setemail("");
      setAddress("");
      setPurpose("");
      setDepartment("");
    } catch (error) {
      toast.error( error?.response?.data);
    }
  };

  const handlePrint = () => {
    // const content = printRef.current;
    const qrCanvas = document.querySelector('canvas'); // Select the QR code canvas
    if (!qrReady) {
       toast.error("QR Code is not ready yet! Please wait.");
      return;
    }

    // Convert the QR code canvas to an image (Base64)
    const qrImage = qrCanvas.toDataURL("image/png");
    if(!qrImage){
      return toast.error("click one more")
   }
    // Open a new window for printing
    const windowToPrint = window.open('', '', 'width=800,height=600');
  
    // Write the content including the QR code image
    windowToPrint.document.write(`
      <html>
        <head>
          <title>Print QR Code</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
            }
            .qr-code {
              text-align: center;
              margin-bottom: 20px;
            }
            .details {
              font-size: 14px;
              line-height: 1.6;
            }
          </style>
        </head>
        <body>
          <h2 style="text-align: center;">Beneficiary QR Code</h2>
          <div class="qr-code">
            <img src="${qrImage && qrImage}" alt="QR Code" />
          </div>
        </body>
      </html>
    `);
  
    // Close the document and trigger the print
    setTimeout(() => {
      windowToPrint.print();
      windowToPrint.close();
    }, 500);
  };
  

  return (
    <div className="p-6 flex flex-col items-center text-black " >
      <h1 className="text-2xl font-bold mb-6 text-center">Create Beneficiary</h1>
   {!token &&   <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
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
            placeholder="Enter email "
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Enter Home Address"
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
              htmlFor="department"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select Department
            </label>
            <select
              id="department"
              name="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)} // Handle department selection
              className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select department</option>
              <option value="financial aid">Financial Aid</option>
              <option value="medical assistance">Medical Assistance</option>
            </select>
          </div>

          <h3 className="text-lg font-medium mt-4">History:</h3>
            <ul className="list-disc list-inside">
              {beneficiaryData?.data?.history.map((entry, index) => (
                <li key={index}>
                  <strong>Date:</strong> {new Date(entry.date).toLocaleDateString()} -{" "}
                  <strong>Status:</strong> {entry.status} -{" "}
                 <br /> <strong className="">Remarks:</strong> {entry.remarks || "N/A"}
                </li>
              ))}
            </ul>

          <div className="mt-6">
              <h3 className="text-lg font-medium">Update Assistance Status</h3>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <textarea
                placeholder="Enter Remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
              />
           
            </div>
          <button
            onClick={handleUpdateBeneficiary}
            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Update Beneficiary !
          </button>
        </div>

        {/* Display QR Code if token is generated */}
       
      </div>}
        
      {token && (
          <>
             <div className="bg-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg" ref={printRef}>
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Beneficiary QR Code</h2>
        
        {/* QR Code Section */}
        <div className="flex justify-center mb-6">
          <div className="border-4 border-green-500 p-4 rounded-lg shadow-xl">
            <QRCodeCanvas value={token} size={200} level="H" />
          </div>
        </div>

        {/* Print Button */}
        <button
          onClick={handlePrint}
          className="w-full mt-6 py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition ease-in-out duration-300"
        >
          Print QR Code
        </button>
      </div>
    </div>
          </>
        )}
           
    </div>
    
  );
};

export default EditBeneficiary;
