import React from "react";
import { useNavigate } from "react-router-dom";
import IncidentsPageList from "../components/IncidentsPageList";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 py-6">
      
   <div className="max-w-7xl mx-auto flex items-center justify-between mb-6">
     
     <button onClick={()=> navigate("/login")} 
          className="bg-gray-600 text-white 
               px-3 sm:px-4 py-2 rounded-lg 
               hover:bg-gray-500 transition text-sm sm:text-base"
     >
      Login
    </button>
  <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800">
    Incident Tracker
  </h1>

  <button
    onClick={() => navigate("/incident/new")}
    className="bg-gray-600 text-white 
               px-3 sm:px-4 py-2 rounded-lg 
               hover:bg-gray-500 transition text-sm sm:text-base"
  >
    + New Incident
  </button>

</div>

   
      <div className="max-w-7xl mx-auto">
        <IncidentsPageList />
      </div>

    </div>
  );
}

export default HomePage;
