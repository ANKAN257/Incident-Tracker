import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function IncidentDetailPage() {
  const { id } = useParams(); 
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);
 const navigate = useNavigate();
 
  useEffect(() => {
    fetchIncident();
   
  }, []);

  const fetchIncident = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/incidents/${id}`, {
        withCredentials: true, 
      });
      setIncident(res.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching incident:", err);
      setLoading(false);
    }
  };

 
  const handleChange = (e) => {
    const { name, value } = e.target;

   
    if (name === "assignTo") {
      setIncident((prev) => ({ ...prev, assignTo: value }));
    } else {
      setIncident((prev) => ({ ...prev, [name]: value }));
    }
  };

 
  const handleUpdate = async () => {
    try {
    
      const payload = { ...incident };
      if (typeof payload.assignTo === "object") {
        payload.assignTo = payload.assignTo.email || "";
      }

      await axios.patch(`${import.meta.env.VITE_SERVER_URL}/api/incidents/${id}`, payload, {
        withCredentials: true,
      });
      alert("Incident updated successfully");
      fetchIncident(); 
    } catch (err) {
      console.error("Error updating incident:", err);
      alert("Failed to update incident");
    }
  };

 const handleCancel = () => {
    navigate("/"); 
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!incident) return <div className="p-6">Incident not found</div>;



  return (
    <div className="max-w-2xl mx-auto p-1 bg-white shadow rounded-xl mt-6">
     <div className="bg-gray-100 py-4 px-3 mb-1">
         <h2 className="text-xl font-semibold mb-4">Incident Details</h2>
     </div>

      <div className="grid gap-4">
      
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            name="title"
            value={incident.title}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

       
        <div>
          <label className="block text-sm font-medium mb-1">Service</label>
          <input
            name="service"
            value={incident.service}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

     
        <div>
          <label className="block text-sm font-medium mb-1">
            Assign To (email)
          </label>
          <input
            name="assignTo"
            value={
              typeof incident.assignTo === "object"
                ? incident.assignTo?.email || ""
                : incident.assignTo || ""
            }
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

      
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

      
        <div>
          <label className="block text-sm font-medium mb-1">Priority</label>
          <select
            name="priority"
            value={incident.priority || ""}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Select Priority</option>
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>

      
        <div>
          <label className="block text-sm font-medium mb-1">Summary</label>
          <textarea
            name="summary"
            value={incident.summary || ""}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            rows="4"
          />
        </div>

       
        <button
          onClick={handleUpdate}
          className="bg-gray-700 text-white px-4 py-2 rounded hover:opacity-90 cursor-pointer"
        >
          Update Incident
        </button>
      
        <button
         onClick={handleCancel}
          className="bg-gray-200 text-black text-semi-bold px-4 py-2 rounded hover:opacity-90 cursor-pointer"
        >
            Cancel
        </button>
      
      </div>
    </div>
  );
}

export default IncidentDetailPage;
