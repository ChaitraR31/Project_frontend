import axios from "axios";
import React, { useState, useEffect } from "react";
import PatientCard from "./PatientCard";
import ReactPaginate from "react-paginate";
import PatientSearch2 from "./PatientSearch2";
import { Carousel } from "react-bootstrap"; // Import Carousel from react-bootstrap
import { Container } from "react-bootstrap";
import "./Pagination.css";
import InsuranceCards from "./InsuranceCards";

const fetchPatients = async (page) => {
  try {
    const token = sessionStorage.getItem("token");
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

  const isLoggedIn = sessionStorage.getItem("token"); // Check if user is logged in by checking the token

  useEffect(() => {
    const getPatients = async () => {
      const { data, total } = await fetchPatients(currentPage);
      setPatientArr(data);
      // setPageCount(Math.ceil(total / 15));
    };
    getPatients();
  }, [currentPage]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
  };

  return (
    <div className="patient-list-container">
      {/* Carousel component with fixed size and 70% vertical height */}
      {!isLoggedIn && (
      <Carousel className="mb-4 carousel-container">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Welcome to the Treatment Portal</h3>
            <p>Your health records are in safe hands!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Track Your Treatment</h3>
            <p>Stay updated with your treatment progress and appointments.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1583324113626-70df0f4deaab?auto=format&fit=crop&q=80&w=1200"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Manage Your Bookings</h3>
            <p>Manage and view all your treatment and doctor appointments in one place.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      )}

      {/* Patient Search and List */}
      <InsuranceCards/>
      <PatientSearch2
        patientsData={patientArr}
        hoveredId={hoveredId}
        setHoveredId={setHoveredId}
      />
      
      <div className="row">
        {patientArr.map((patient) => (
          <div
            className="col-md-4 mb-3"
            key={patient.id}
            onMouseEnter={() => setHoveredId(patient.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            
            {/* Add a card here */}
            {/* <PatientCard
              patient={patient}
              isHovered={hoveredId === patient.id}
            /> */}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {/* <div className="d-flex justify-content-center">
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
      </div> */}

      {/* Inline CSS for Carousel, body, and cards */}
      <style jsx>{`
        /* Carousel container with fixed size */
        .carousel-container {
          height: 70vh; /* Set the height to 70% of the vertical height */
          overflow: hidden; /* Hide any overflow if image doesn't fit */
        }

        .carousel-item img {
          object-fit: cover; /* Ensure the image scales well to fit the container */
          height: 100%; /* Set the image height to fill the container */
        }

        /* Body styling */
        .patient-list-container {
          background-color: white; /* Set the background color to white */
          color: black; /* Set the text color to black */
          
        }

        /* Pagination styling */
        .pagination {
          background-color: transparent;
        }

        /* Styling for Patient Cards */
        .patient-card {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Improved shadow */
          border-radius: 8px;
          background-color: white;
          transition: transform 0.3s ease-in-out;
        }

        .patient-card:hover {
          transform: translateY(-5px); /* Add a little hover effect for interaction */
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15); /* Enhanced shadow on hover */
        }

        /* Other styling adjustments */
        .pagination .active {
          background-color: #007bff;
          color: white;
        }
      `}</style>
    </div>
  );
}

export default PatientList;
