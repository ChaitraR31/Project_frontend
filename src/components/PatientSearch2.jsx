import React, { useState } from "react";
import PatientCard from "./PatientCard";
import "./PatientSearch2.css"; // Import custom styles
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome CSS
import InsuranceChart from "./InsuranceChart";

const PatientSearch = ({ patientsData }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false); // State to toggle advanced search
  const [insuranceFilter, setInsuranceFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [ageRange, setAgeRange] = useState([0, 100]);
  const [diseaseFilter, setDiseaseFilter] = useState("");
  const [sortBy, setSortBy] = useState("none");
  const [bloodTypeFilter, setBloodTypeFilter] = useState("");
  const [hoveredId, setHoveredId] = useState(null); // Track hovered patient ID

  const uniqueInsuranceProviders = [...new Set(patientsData.map((p) => p.insurance_provider))];
  const uniqueDiseases = [...new Set(patientsData.map((p) => p.medical_Condition))];
  const uniqueBloodTypes = [...new Set(patientsData.map((p) => p.blood_type))];

  // Filtered patients based on search and filters
  const filteredPatients = patientsData
    .filter((patient) => {
      const matchesSearch = patient.medical_Condition.toLowerCase().includes(searchQuery.toLowerCase());
        

      const matchesInsurance = insuranceFilter ? patient.insurance_provider === insuranceFilter : true;
      const matchesGender = genderFilter ? patient.gender === genderFilter : true;
      const matchesDisease = diseaseFilter ? patient.medical_Condition === diseaseFilter : true;
      const matchesBloodType = bloodTypeFilter ? patient.blood_type === bloodTypeFilter : true;

      const matchesAge = patient.age >= ageRange[0] && patient.age <= ageRange[1];

      const admissionDate = new Date(patient.admission_date);
      const matchesDateRange =
        (!startDate || admissionDate >= new Date(startDate)) &&
        (!endDate || admissionDate <= new Date(endDate));

      return matchesSearch && matchesInsurance && matchesGender && matchesDisease && matchesBloodType && matchesAge && matchesDateRange;
    })
    .sort((a, b) => {
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      if (sortBy === "date-asc") return new Date(a.admission_date) - new Date(b.admission_date);
      if (sortBy === "date-desc") return new Date(b.admission_date) - new Date(a.admission_date);
      return 0;
    });

  return (
    <div className="container mt-4 patient-search">
      <h2 className="mb-4 text-center">🔍 Patient Search</h2>

      {/* Basic Search Section */}
      <div className="row g-3">
        <div className="col-md-6">
          <label>
            <i className="fas fa-search"></i> Search by Disease
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Disease"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* If there's a search query, show Advanced Search */}
        {searchQuery && (
          <div className="col-md-6">
            <button
              className="btn btn-info"
              onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
            >
              {showAdvancedSearch ? "Hide Advanced Search" : "Show Advanced Search"}
            </button>
          </div>
        )}
      </div>

      {/* Advanced Search Section */}
      {showAdvancedSearch && (
        <div className="row g-3 mt-4">
          <div className="col-md-3">
            <label>
              <i className="fas fa-briefcase-medical"></i> Insurance Provider
            </label>
            <select className="form-control" value={insuranceFilter} onChange={(e) => setInsuranceFilter(e.target.value)}>
              <option value="">All Providers</option>
              {uniqueInsuranceProviders.map((provider) => (
                <option key={provider} value={provider}>
                  {provider}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-2">
            <label>
              <i className="fas fa-venus-mars"></i> Gender
            </label>
            <select className="form-control" value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
              <option value="">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="col-md-3">
            <label>
              <i className="fas fa-virus"></i> Disease/Condition
            </label>
            <select className="form-control" value={diseaseFilter} onChange={(e) => setDiseaseFilter(e.target.value)}>
              <option value="">All</option>
              {uniqueDiseases.map((disease) => (
                <option key={disease} value={disease}>
                  {disease}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-2">
            <label>
              <i className="fas fa-tint"></i> Blood Type
            </label>
            <select className="form-control" value={bloodTypeFilter} onChange={(e) => setBloodTypeFilter(e.target.value)}>
              <option value="">All</option>
              {uniqueBloodTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3 d-flex">
            <div className="me-2">
              <label>
                <i className="fas fa-birthday-cake"></i> Min Age
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Min"
                value={ageRange[0]}
                onChange={(e) => setAgeRange([+e.target.value, ageRange[1]])}
              />
            </div>
            <div>
              <label>
                <i className="fas fa-birthday-cake"></i> Max Age
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Max"
                value={ageRange[1]}
                onChange={(e) => setAgeRange([ageRange[0], +e.target.value])}
              />
            </div>
          </div>

          <div className="col-md-3">
            <label>
              <i className="fas fa-sort"></i> Sort By
            </label>
            <select className="form-control" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="none">None</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="date-asc">Admission Date (Oldest)</option>
              <option value="date-desc">Admission Date (Newest)</option>
            </select>
          </div>
        </div>
      )}

      {/* Display Filtered Patients */}
      <div className="row mt-4">
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => (
            <div
              key={patient.id}
              className="col-md-4"
              onMouseEnter={() => setHoveredId(patient.id)}  // Set hover on mouse enter
              onMouseLeave={() => setHoveredId(null)}  // Remove hover on mouse leave
            >
              {/* <PatientCard patient={patient} isHovered={hoveredId === patient.id} /> */}
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No patients found matching the criteria.</p>
        )}
      </div>
        {/* Display the Insurance Chart based on filtered patients */}
      {filteredPatients.length > 0 && <InsuranceChart patientsData={filteredPatients} searchQuery={searchQuery} />}

    </div>
  );
};

export default PatientSearch;

// import React, { useState } from "react";
// import PatientCard from "./PatientCard";
// import "./PatientSearch2.css"; // Import custom styles

// const PatientSearch = ({ patientsData }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showAdvancedSearch, setShowAdvancedSearch] = useState(false); // State to toggle advanced search
//   const [insuranceFilter, setInsuranceFilter] = useState("");
//   const [genderFilter, setGenderFilter] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [ageRange, setAgeRange] = useState([0, 100]);
//   const [diseaseFilter, setDiseaseFilter] = useState("");
//   const [sortBy, setSortBy] = useState("none");
//   const [bloodTypeFilter, setBloodTypeFilter] = useState("");

//   const uniqueInsuranceProviders = [...new Set(patientsData.map((p) => p.insurance_provider))];
//   const uniqueDiseases = [...new Set(patientsData.map((p) => p.medical_Condition))];
//   const uniqueBloodTypes = [...new Set(patientsData.map((p) => p.blood_type))];

//   // Filtered patients based on search and filters
//   const filteredPatients = patientsData
//     .filter((patient) => {
//       const matchesSearch =
//         patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         patient.insurance_provider.toLowerCase().includes(searchQuery.toLowerCase());

//       const matchesInsurance = insuranceFilter ? patient.insurance_provider === insuranceFilter : true;
//       const matchesGender = genderFilter ? patient.gender === genderFilter : true;
//       const matchesDisease = diseaseFilter ? patient.medical_Condition === diseaseFilter : true;
//       const matchesBloodType = bloodTypeFilter ? patient.blood_type === bloodTypeFilter : true;

//       const matchesAge = patient.age >= ageRange[0] && patient.age <= ageRange[1];

//       const admissionDate = new Date(patient.admission_date);
//       const matchesDateRange =
//         (!startDate || admissionDate >= new Date(startDate)) &&
//         (!endDate || admissionDate <= new Date(endDate));

//       return matchesSearch && matchesInsurance && matchesGender && matchesDisease && matchesBloodType && matchesAge && matchesDateRange;
//     })
//     .sort((a, b) => {
//       if (sortBy === "name-asc") return a.name.localeCompare(b.name);
//       if (sortBy === "name-desc") return b.name.localeCompare(a.name);
//       if (sortBy === "date-asc") return new Date(a.admission_date) - new Date(b.admission_date);
//       if (sortBy === "date-desc") return new Date(b.admission_date) - new Date(a.admission_date);
//       return 0;
//     });

//   return (
//     <div className="container mt-4 patient-search">
//       <h2 className="mb-4 text-center">🔍 Patient Search</h2>

//       {/* Basic Search Section */}
//       <div className="row g-3">
//         <div className="col-md-6">
//           <label>🔎 Search by Name / Insurance</label>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Enter name or insurance provider..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>

//         {/* If there's a search query, show Advanced Search */}
//         {searchQuery && (
//           <div className="col-md-6">
//             <button
//               className="btn btn-info"
//               onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
//             >
//               {showAdvancedSearch ? "Hide Advanced Search" : "Show Advanced Search"}
//             </button>
//           </div>
//         )}
//       </div>
      

//       {/* Advanced Search Section */}
//       {showAdvancedSearch && (
//         <div className="row g-3 mt-4">
//           <div className="col-md-3">
//             <label>🏥 Insurance Provider</label>
//             <select className="form-control" value={insuranceFilter} onChange={(e) => setInsuranceFilter(e.target.value)}>
//               <option value="">All Providers</option>
//               {uniqueInsuranceProviders.map((provider) => (
//                 <option key={provider} value={provider}>
//                   {provider}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="col-md-2">
//             <label>⚧️ Gender</label>
//             <select className="form-control" value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
//               <option value="">All</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//             </select>
//           </div>

//           <div className="col-md-3">
//             <label>🦠 Disease/Condition</label>
//             <select className="form-control" value={diseaseFilter} onChange={(e) => setDiseaseFilter(e.target.value)}>
//               <option value="">All</option>
//               {uniqueDiseases.map((disease) => (
//                 <option key={disease} value={disease}>
//                   {disease}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="col-md-2">
//             <label>🩸 Blood Type</label>
//             <select className="form-control" value={bloodTypeFilter} onChange={(e) => setBloodTypeFilter(e.target.value)}>
//               <option value="">All</option>
//               {uniqueBloodTypes.map((type) => (
//                 <option key={type} value={type}>
//                   {type}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="col-md-3 d-flex">
//             <div className="me-2">
//               <label>🔢 Min Age</label>
//               <input
//                 type="number"
//                 className="form-control"
//                 placeholder="Min"
//                 value={ageRange[0]}
//                 onChange={(e) => setAgeRange([+e.target.value, ageRange[1]])}
//               />
//             </div>
//             <div>
//               <label>🔢 Max Age</label>
//               <input
//                 type="number"
//                 className="form-control"
//                 placeholder="Max"
//                 value={ageRange[1]}
//                 onChange={(e) => setAgeRange([ageRange[0], +e.target.value])}
//               />
//             </div>
//           </div>

          

//           <div className="col-md-3">
//             <label>🔽 Sort By</label>
//             <select className="form-control" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//               <option value="none">None</option>
//               <option value="name-asc">Name (A-Z)</option>
//               <option value="name-desc">Name (Z-A)</option>
//               <option value="date-asc">Admission Date (Oldest)</option>
//               <option value="date-desc">Admission Date (Newest)</option>
//             </select>
//           </div>
//         </div>
//       )}

//       {/* Display Filtered Patients */}
//       <div className="row mt-4">
//         {filteredPatients.length > 0 ? (
//           filteredPatients.map((patient) => (
//             <div key={patient.id} className="col-md-4">
//               <PatientCard patient={patient} />
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-muted">No patients found matching the criteria.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PatientSearch;
