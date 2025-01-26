"use client";
import React, { useState } from "react";
import axios from "axios";
import { ApiRoutes } from "../constant/url.js";

const DepartmentInteraction = () => {
  const [token, setToken] = useState("");
  const [beneficiary, setBeneficiary] = useState(null);
  const [status, setStatus] = useState("In Progress");
  const [remarks, setRemarks] = useState("");

  const handleFetchBeneficiary = async () => {
    if (!token || token.trim() === "") {
      alert("Please provide a valid token.");
      return;}
    try {
      const response = await axios.get(`${ApiRoutes.beneficary}/token/${token}`);
      setBeneficiary(response.data);
    } catch (error) {
      console.error("Error fetching beneficiary details:", error);
      alert("Failed to fetch beneficiary details. Please check the token.");
    }
  };

  const handleUpdateStatus = async () => {
    try {
      await axios.put(`${ApiRoutes.beneficary}/${beneficiary._id}`, {
        department: beneficiary.history[0]?.department || "General",
        status,
        remarks,
      });
      alert("Assistance status updated successfully.");
      setStatus("In Progress");
      setRemarks("");
      setBeneficiary(null);
    } catch (error) {
      console.error("Error updating assistance status:", error);
      alert("Failed to update assistance status.");
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6 text-center">Department Interaction</h1>
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
        {/* Token Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter or Scan Token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleFetchBeneficiary}
            className="mt-2 w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Fetch Beneficiary
          </button>
        </div>

        {/* Beneficiary Details */}
        {beneficiary && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-4">Beneficiary Details</h2>
            <p>
              <strong>Name:</strong> {beneficiary.name}
            </p>
            <p>
              <strong>CNIC:</strong> {beneficiary.cnic}
            </p>
            <p>
              <strong>Phone:</strong> {beneficiary.phone}
            </p>
            <p>
              <strong>Purpose:</strong> {beneficiary.purpose}
            </p>
            <h3 className="text-lg font-medium mt-4">History:</h3>
            <ul className="list-disc list-inside">
              {beneficiary.history.map((entry, index) => (
                <li key={index}>
                  <strong>Date:</strong> {new Date(entry.date).toLocaleDateString()} -{" "}
                  <strong>Status:</strong> {entry.status} -{" "}
                  <strong>Remarks:</strong> {entry.remarks || "N/A"}
                </li>
              ))}
            </ul>

            {/* Update Status */}
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
              <button
                onClick={handleUpdateStatus}
                className="mt-2 w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                Update Status
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentInteraction;