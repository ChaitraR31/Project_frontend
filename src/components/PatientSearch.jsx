import React, { useState } from "react";
import PatientCard from "./PatientCard";
import { FaBars, FaTimes } from "react-icons/fa"; // For sidebar toggle icons

const PatientSearch = ({ patientsData }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [insuranceFilter, setInsuranceFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  // Extract Unique Insurance Providers
  const uniqueInsuranceProviders = [
    ...new Set(patientsData.map((patient) => patient.insurance_provider)),
  ];

  // Filter patients based on search and filters
  const filteredPatients = patientsData.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.insurance_provider
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesInsurance = insuranceFilter
      ? patient.insurance_provider === insuranceFilter
      : true;
    const matchesGender = genderFilter ? patient.gender === genderFilter : true;

    const admissionDate = new Date(patient.admission_date);
    const matchesDateRange =
      (!startDate || admissionDate >= new Date(startDate + "T00:00:00")) &&
      (!endDate || admissionDate <= new Date(endDate + "T23:59:59"));

    return (
      matchesSearch && matchesInsurance && matchesGender && matchesDateRange
    );
  });

  // Toggle Sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="container mt-4" style={{ display: "flex" }}>
      {/* Sidebar */}
      <div
        className={`sidebar${isSidebarVisible ? " active" : ""}`}
        style={{
          position: "fixed",
          top: 0,
          left: isSidebarVisible ? 0 : "-250px", // Slide effect
          width: "250px",
          height: "100vh",
          backgroundColor: "#ff66b2", // Light pink
          transition: "all 0.3s ease",
          zIndex: 1000,
          padding: "20px",
          boxShadow: "2px 0 5px rgba(0, 0, 0, 0.2)",
        }}
      >
        <button
          className="btn btn-danger mb-3"
          onClick={toggleSidebar}
          style={{ position: "absolute", top: 10, right: 10 }}
        >
          <FaTimes />
        </button>

        {/* Search & Filter Inputs */}
        <div className="row mb-3">
          <div className="col-md-12">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Search by Name or Insurance Provider"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Insurance Filter */}
          <div className="col-md-12">
            <select
              className="form-control mb-2"
              value={insuranceFilter}
              onChange={(e) => setInsuranceFilter(e.target.value)}
            >
              <option value="">All Insurance</option>
              {uniqueInsuranceProviders.map((provider) => (
                <option key={provider} value={provider}>
                  {provider}
                </option>
              ))}
            </select>
          </div>

          {/* Gender Filter */}
          <div className="col-md-12">
            <select
              className="form-control mb-2"
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
            >
              <option value="">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Date Range Filter */}
          <div className="col-md-12 mb-2">
            <input
              type="date"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="col-md-12">
            <input
              type="date"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        className="btn btn-primary"
        onClick={toggleSidebar}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 999,
        }}
      >
        <FaBars />
      </button>

      {/* Main Content */}
      <div
        className="main-content"
        style={{
          marginLeft: isSidebarVisible ? "250px" : "0",
          transition: "margin-left 0.3s ease",
          width: "100%",
        }}
      >
        {/* Display Filtered Patients */}
        <div className="row">
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => (
              <div key={patient.id} className="col-md-4 mb-3">
                <PatientCard patient={patient} />
              </div>
            ))
          ) : (
            <p className="text-center">
              No patients found matching the criteria.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientSearch;
