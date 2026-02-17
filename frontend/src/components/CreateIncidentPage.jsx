import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateIncidentPage() {
  const navigate = useNavigate();
  const [incident, setIncident] = useState({
    title: "",
    service: "",
    assignTo: "",
    severity: "SEV1",
    status: "OPEN",
    summary: "",
    priority:"MEDIUM",
  });

  const handleChange = (e) => {
    setIncident({ ...incident, [e.target.name]: e.target.value });
  };

 const handleSubmit = async () => {
   
  try {

    await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/incidents`,
      {
        ...incident,
        severity: incident.severity.toUpperCase(),
        status: incident.status.toUpperCase(),
      },
      {
        withCredentials: true, 
      }
    );
    alert("Incident created successfully!");
    navigate("/"); 
  } catch (err) {
    console.error(err.response || err);
    alert("Failed to create incident: " + (err.response?.data?.message || err.message));
  }
};


  const handleCancel = () => {
    navigate("/"); 
  };



  

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-xl mt-6">
      <h2 className="text-xl font-semibold mb-4">Create New Incident</h2>

      <div className="grid gap-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            name="title"
            value={incident.title}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Service */}
        <div>
          <label className="block text-sm font-medium mb-1">Service</label>
          <input
            name="service"
            value={incident.service}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Assign To */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Assign Email (optional)
          </label>
          <input
            name="assignTo"
            value={incident.assignTo}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Severity */}
        <div>
          <label className="block text-sm font-medium mb-1">Severity</label>
          <select
            name="severity"
            value={incident.severity}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="SEV1">SEV1</option>
            <option value="SEV2">SEV2</option>
            <option value="SEV3">SEV3</option>
            <option value="SEV4">SEV4</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            value={incident.status}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="OPEN">Open</option>
            <option value="MITIGATED">Mitigated</option>
            <option value="RESOLVED">Resolved</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>

         {/* Priority */}
        <div>
          <label className="block text-sm font-medium mb-1">Priority</label>
          <select
            name="severity"
            value={incident.priority}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
            <option value="CRITICAL">CRITICAL</option>
          </select>
        </div>

        {/* Summary */}
        <div>
          <label className="block text-sm font-medium mb-1">Summary</label>
          <textarea
            name="summary"
            value={incident.summary}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            rows="4"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleSubmit}
            className="bg-black text-white px-4 py-2 rounded hover:opacity-90"
          >
            Create
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-200 text-black px-4 py-2 rounded hover:opacity-90"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateIncidentPage;
