import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function IncidentsPageList() {
const navigate = useNavigate();
  const [filters, setFilters] = useState({
    service: "",
    severity: "",
    status: "",
    search: "",
  });

  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const [sortConfig, setSortConfig] = useState({
    sortBy: "createdAt",
    order: "desc",
  });

  
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1);
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, 500);

    return () => clearTimeout(timer);
  }, [filters.search]);


  const fetchIncidents = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/incidents`, {
        params: {
          service: filters.service,
          severity: filters.severity,
          status: filters.status,
          search: debouncedSearch,
          page,
          sortBy: sortConfig.sortBy,
          order: sortConfig.order,
        },
        withCredentials: true, // cookie auth
      });

      setIncidents(response.data.data);
      setPagination(response.data.pagination);
    } catch (err) {
      console.error("Error fetching incidents:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, [
    filters.service,
    filters.severity,
    filters.status,
    debouncedSearch,
    page,
    sortConfig,
  ]);

  
  const handleSort = (field) => {
    setSortConfig((prev) => ({
      sortBy: field,
      order: prev.sortBy === field && prev.order === "asc" ? "desc" : "asc",
    }));
  };





  return (
    <div className="max-w-7xl mx-auto px-4">
    
     <div className="bg-white shadow rounded-xl p-4 mb-6">
  <div className="flex flex-wrap gap-4 items-end">

    {/* Search */}
    <div className="flex flex-col text-sm">
      <label className="mb-1 font-medium">Search</label>
      <input
        type="text"
        name="search"
        placeholder="Search title..."
        value={filters.search}
        onChange={handleChange}
        className="border p-2 rounded min-w-[180px]"
      />
    </div>

    {/* Service */}
    <div className="flex flex-col text-sm">
      <label className="mb-1 font-medium">Service</label>
      <select
        name="service"
        value={filters.service}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option value="">All Services</option>
      </select>
    </div>

    {/* Status */}
    <div className="flex flex-col text-sm">
      <label className="mb-1 font-medium">Status</label>
      <select
        name="status"
        value={filters.status}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option value="">All Status</option>
        <option value="OPEN">Open</option>
        <option value="MITIGATED">Mitigated</option>
        <option value="RESOLVED">Resolved</option>
        <option value="CLOSED">Closed</option>
      </select>
    </div>

    {/* Severity */}
    <div className="flex flex-col text-sm">
      <label className="mb-1 font-medium">Severity</label>
      <div className="flex gap-2 flex-wrap">
        {["SEV1", "SEV2", "SEV3", "SEV4"].map((sev) => (
          <button
            key={sev}
            type="button"
            onClick={() => {
              setFilters(prev => ({
                ...prev,
                severity: prev.severity === sev ? "" : sev,
              }));
              setPage(1);
            }}
            className={`px-3 py-1 border rounded transition
              ${filters.severity === sev
                ? "bg-black text-white"
                : "bg-white text-gray-700"}`}
          >
            {filters.severity === sev && "✔ "}{sev}
          </button>
        ))}
      </div>
    </div>

  </div>
</div>


     
      <div className="bg-white shadow rounded-xl overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-xs uppercase">
            <tr>
              <th
              
                className="p-3 cursor-pointer"
              >
                Title
              </th>
                <th
               
                className="p-3 cursor-pointer"
              >
                service
              </th>
              <th
                
                className="p-3 cursor-pointer"
              >
                Severity
              </th>
              <th
                
                className="p-3 cursor-pointer"
              >
                Status
              </th>
              <th
                onClick={() => handleSort("createdAt")}
                className="p-3 cursor-pointer"
              >
                Created At
              </th>
              <th className="p-3">Assigned To</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center p-6">
                  Loading...
                </td>
              </tr>
            ) : incidents.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  No incidents found
                </td>
              </tr>
            ) : (
              incidents.map((incident) => (
                <tr key={incident.publicId} 
                onClick={() => navigate(`/incident/${incident.publicId}`)}
                className="cursor-pointer hover:bg-gray-200 transition">
                  <td className="p-3">{incident.title ? incident.title.split("-")[0] : ""}</td>
                  <td className="p-3">{incident.service}</td>
                  <td className="p-3">{incident.severity}</td>
                  <td className="p-3">{incident.status}</td>
                  <td className="p-3">
                    {new Date(incident.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    {incident.assignTo?.email || "Unassigned"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-6">
        <button
          disabled={!pagination.hasPrevPage}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {pagination.page} of {pagination.totalPages}
        </span>

        <button
          disabled={!pagination.hasNextPage}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default IncidentsPageList;
