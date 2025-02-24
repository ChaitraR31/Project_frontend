import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { FaHeart, FaHospital, FaUserMd, FaMedkit } from 'react-icons/fa';
import './PatientCard.css'; // Custom CSS for styling

function PatientCard({ patient, isHovered }) {
  const navigate = useNavigate(); 
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('username');
  const [isBookmarked, setIsBookmarked] = useState(false); 

  useEffect(() => {
    if (userName && token) {
      const checkBookmarkStatus = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8085/bookmark/get/${userName}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const isAlreadyBookmarked = response.data.some(
            (bookmark) => bookmark.id === patient.id
          );
          setIsBookmarked(isAlreadyBookmarked);
        } catch (err) {
          console.error('Error fetching bookmarks:', err);
        }
      };
      checkBookmarkStatus();
    }
  }, [userName, token, patient.id]);

  const addToBookMark = async (patient) => {
    if (!userName) {
      localStorage.setItem('redirectAfterLogin', 'true');
      localStorage.setItem('patientToBookmark', JSON.stringify(patient));
      navigate('/login');
      return;
    }

    if (isBookmarked) {
      toast.info("This patient is already bookmarked!");
      return;
    }

    try {
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
          id: patient.id
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Patient bookmarked successfully!");
      setIsBookmarked(true);
    } catch (err) {
      toast.error(`Error: ${err.response?.data?.message || 'Failed to add bookmark'}`);
    }
  };

  return patient ? (
    <div className={`card patient-card shadow-lg ${isHovered ? 'highlight' : 'dim'}`}>
      <div className="card-body">
        <h5 className="card-title">{patient.medical_Condition.toUpperCase()}</h5>
        <div className="patient-info">
          <p><FaHospital className="icon" /> <strong>Hospital:</strong> {patient.hospital}</p>
          <p><FaUserMd className="icon" /> <strong>Doctor:</strong> {patient.doctor}</p>
          <p><FaMedkit className="icon" /> <strong>Insurance Provider:</strong> {patient.insurance_provider}</p>
        </div>

        <div className="bookmark-button">
          <button 
            className={`btn ${isBookmarked ? 'btn-secondary' : 'btn-primary'}`}
            onClick={() => addToBookMark(patient)}
            disabled={isBookmarked}
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
