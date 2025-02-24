import React, { useEffect, useState } from 'react';

function Page() {
  // State to store hospital data
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error state

  // Fetch data from the API when the component mounts
  useEffect(() => {
    // Replace this URL with your actual API endpoint
    const fetchHospitalData = async () => {
      try {
        const response = await fetch('http://localhost:3232/treatments');
        const data = await response.json();
        setHospitals(data); // Store fetched data in state
        setLoading(false); // Set loading to false when data is fetched
      } catch (err) {
        setError('Error fetching data'); // Handle error
        setLoading(false); // Set loading to false if there's an error
      }
    };

    fetchHospitalData();
  }, []); // Empty dependency array ensures this runs once when component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Hospital List</h1>
      <ul>
        {hospitals.map((hospital, index) => (
          <li key={index}>
            {hospital.name}: {hospital.count}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Page;
