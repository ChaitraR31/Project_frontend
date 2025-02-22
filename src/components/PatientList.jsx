import axios from "axios";
import React, { useState, useEffect } from "react";
import PatientCard from "./PatientCard";
import ReactPaginate from "react-paginate";
import "./Pagination.css";
import PatientSearch2 from "./PatientSearch2";
const fetchPatients = async (page) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3232/treatments", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Calculate the starting index for the current page
    const startIndex = (page - 1) * 15;
    return {
      data: response.data.slice(startIndex, startIndex + 15),
      total: response.data.length,
    };
  } catch (error) {
    console.log("Error fetching the data");
    return { data: [], total: 0 };
  }
};
function PatientList() {
  const [patientArr, setPatientArr] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const getPatients = async () => {
      const { data, total } = await fetchPatients(currentPage);
      setPatientArr(data);
      setPageCount(Math.ceil(total / 15));
    };
    getPatients();
  }, [currentPage]);
  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
  };
  return (
    <div >
      {/* Pass patientArr instead of patients */}
      <PatientSearch2 patientsData={patientArr}
      hoveredId={hoveredId} 
      setHoveredId={setHoveredId} 
      
      
      />
      {/* <PatientCard patienta={patient} isHovered={hoveredId === patient.id} /> */}

      {/* <h1 className="text-center mb-4">Patient Records</h1>
      <div className="row">
        {patientArr.map((patient) => (
          <div
            className="col-md-4 mb-3"
            key={patient.id}
            onMouseEnter={() => setHoveredId(patient.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <PatientCard patient={patient} isHovered={hoveredId === patient.id} />
          </div>
        ))}
      </div> */}
      <div className="d-flex justify-content-center">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
}
export default PatientList;

// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import PatientCard from "./PatientCard";
// import ReactPaginate from "react-paginate";
// import "./Pagination.css";

// const fetchPatients = async (page) => {
//   try {
//     const token = localStorage.getItem("token");
//     const response = await axios.get("http://localhost:3232/treatments", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     // Calculate the starting index for the current page
//     const startIndex = (page - 1) * 15;
//     return {
//       data: response.data.slice(startIndex, startIndex + 15),
//       total: response.data.length,
//     };
//   } catch (error) {
//     console.log("Error fetching the data");
//     return { data: [], total: 0 };
//   }
// };

// function PatientList() {
//   const [patientArr, setPatientArr] = useState([]);
//   const [hoveredId, setHoveredId] = useState(null);
//   const [pageCount, setPageCount] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     const getPatients = async () => {
//       const { data, total } = await fetchPatients(currentPage);
//       setPatientArr(data);
//       setPageCount(Math.ceil(total / 15));
//     };
//     getPatients();
//   }, [currentPage]);

//   const handlePageClick = (data) => {
//     setCurrentPage(data.selected + 1);
//   };

//   return (
//     <div className="container mt-4">
//       <h1 className="text-center mb-4">Patient Records</h1>
//       <div className="row">
//         {patientArr.map((patient) => (
//           <div
//             className="col-md-4 mb-3"
//             key={patient.id}
//             onMouseEnter={() => setHoveredId(patient.id)}
//             onMouseLeave={() => setHoveredId(null)}
//           >
//             <PatientCard patient={patient} isHovered={hoveredId === patient.id} />
//           </div>
//         ))}
//       </div>
//       <div className="d-flex justify-content-center">
//         <ReactPaginate
//           previousLabel={"previous"}
//           nextLabel={"next"}
//           breakLabel={"..."}
//           breakClassName={"break-me"}
//           pageCount={pageCount}
//           marginPagesDisplayed={2}
//           pageRangeDisplayed={5}
//           onPageChange={handlePageClick}
//           containerClassName={"pagination"}
//           subContainerClassName={"pages pagination"}
//           activeClassName={"active"}
//         />
//       </div>
//     </div>
//   );
// }

// export default PatientList;
