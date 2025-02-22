import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import './PatientCard.css'; 

function PatientCard({ patient, isHovered }) {
  const navigate = useNavigate(); // Using useNavigate hook for navigation
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('username'); // Get the username from localStorage (after login)
  const [isBookmarked, setIsBookmarked] = useState(false); // State to track if the patient is bookmarked

  useEffect(() => {
    // Fetch current user's bookmarks when component mounts
    if (userName && token) {
      const checkBookmarkStatus = async () => {
        try {
          // Fetch existing bookmarks
          const response = await axios.get(
            `http://localhost:8085/bookmark/get/${userName}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          
          // Check if this patient is already bookmarked
          const isAlreadyBookmarked = response.data.some(
            (bookmark) => bookmark.id === patient.id
          );
          
          // Set the bookmark status
          setIsBookmarked(isAlreadyBookmarked);
        } catch (err) {
          console.error('Error fetching bookmarks:', err);
        }
      };
      checkBookmarkStatus();
    }
  }, [userName, token, patient.id]); // Re-run the check if the user or patient changes

  // Function to add bookmark to the database
  const addToBookMark = async (patient) => {
    if (!userName) {
      // If not logged in, redirect to login page
      localStorage.setItem('redirectAfterLogin', 'true'); // Flag to handle redirection after login
      localStorage.setItem('patientToBookmark', JSON.stringify(patient)); // Store patient data to bookmark after login
      navigate('/login'); // Redirect to login page
      return;
    }

    // If already bookmarked, show a toast message
    if (isBookmarked) {
      toast.info("This patient is already bookmarked!");
      return;
    }

    try {
      // Proceed to add the bookmark if it doesn't already exist
      const response = await axios.post(
        'http://localhost:8085/bookmark/add_bookmark',
        {
          age: patient.age,
          gender: patient.gender,
          bloodType: patient.blood_type,
          medicalCondition: patient.medical_Condition,
          dateAdmission: patient.date_admission,
          doctor: patient.doctor,
          hospital: patient.hospital,
          insuranceProvider: patient.insurance_provider,
          billingAmount: patient.billing_amount,
          roomNumber: patient.room_number,
          admissionType: patient.admission_type,
          dischargeDate: patient.discharge_date,
          medication: patient.medication,
          testResult: patient.test_results,
          userName: userName,
          id: patient.id // Use the username from localStorage
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Bookmark added successfully", response.data);  // Log the response to see the data
      toast.success("Patient bookmarked successfully!");
      setIsBookmarked(true); // Update the state to indicate that the patient has been bookmarked
    } catch (err) {
      console.error("Error adding bookmark:", err);  // Log the error for debugging
      toast.error(`Error: ${err.response?.data?.message || 'Failed to add bookmark'}`);
    }
  };

  return patient ? (
    <div className={`card shadow-lg patient-card ${isHovered ? 'highlight' : 'dim'}`}>
      <div className="card-body">
        <h5 className="card-title" color='black'>{patient.medical_Condition.toUpperCase()}</h5>
        <p className="card-text"><strong>Age:</strong> {patient.age}</p>
        <p className="card-text"><strong>Hospital:</strong> {patient.hospital}</p>
        <p className="card-text"><strong>Doctor:</strong> {patient.doctor}</p>
        <p className="card-text"><strong>Insurance Provider:</strong> {patient.insurance_provider}</p>
        <p className="card-text"><strong>Medical Condition:</strong> {patient.medical_Condition}</p>

        <div>
          <button 
            className="btn btn-primary" 
            onClick={() => addToBookMark(patient)}
            disabled={isBookmarked} // Disable the button if the patient is already bookmarked
          >
            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
           
           
          </button>
        </div>
      </div>
     </div>
  ) : (
    <div>No patient data available</div>
  );
}

<ToastContainer />
export default PatientCard;
