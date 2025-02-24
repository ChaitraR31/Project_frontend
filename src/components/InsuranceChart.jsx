import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Container, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
import '/home/zadmin/Desktop/React_webapp/react_v1/src/components/InsuarnceChart.css';
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement);
const InsuranceChart = ({ searchQuery }) => {
  const [activeChart, setActiveChart] = useState("insurance");
  const [patientsData, setPatientsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hospitalRange, setHospitalRange] = useState(0); // State for controlling slider
  const chartRef = useRef(null);
  // Function to determine the light color based on billing amount
  const getColorForBillingAmount = (billingAmount, minBilling, maxBilling) => {
    const normalized = (billingAmount - minBilling) / (maxBilling - minBilling);
    const red = Math.min(255, Math.floor(255 * normalized));
    const green = Math.min(255, Math.floor(255 * (1 - normalized)));
    const blue = 200;
    return `rgb(${red + 150}, ${green + 150}, ${blue})`;
  };
  // Fetch patients data from an external API
  useEffect(() => {
    const fetchPatientsData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3232/treatments"); // Replace with the API URL
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setPatientsData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchPatientsData();
  }, []);
  // Filter patients based on the searchQuery (disease name)
  const filteredPatients = useMemo(() => {
    if (!searchQuery) return patientsData;
    return patientsData.filter((patient) =>
      (patient.medical_Condition || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, patientsData]);
  // Group patients by hospital and calculate total billing and disease cases
  const hospitalData = useMemo(() => {
    const hospitalBillingData = filteredPatients.reduce((acc, patient) => {
      const { hospital, billing_amount, medical_Condition, medication } = patient;
      if (!acc[hospital]) {
        acc[hospital] = { totalBilling: 0, diseaseCases: {}, caseCount: 0 };
      }
      acc[hospital].totalBilling += billing_amount;
      if (!acc[hospital].diseaseCases[medical_Condition]) {
        acc[hospital].diseaseCases[medical_Condition] = [];
      }
      acc[hospital].diseaseCases[medical_Condition].push(medication);
      acc[hospital].caseCount += 1;
      return acc;
    }, {});
    return hospitalBillingData;
  }, [filteredPatients]);
  // Prepare Bar chart data
  const hospitalChartData = useMemo(() => {
    const labels = [];
    const data = [];
    const backgroundColors = [];
    const billingAmounts = Object.keys(hospitalData).map(hospital => hospitalData[hospital].totalBilling);
    const minBilling = Math.min(...billingAmounts);
    const maxBilling = Math.max(...billingAmounts);
    Object.keys(hospitalData).forEach(hospital => {
      labels.push(hospital);
      data.push(hospitalData[hospital].totalBilling);
      const billingAmount = hospitalData[hospital].totalBilling;
      const color = getColorForBillingAmount(billingAmount, minBilling, maxBilling);
      backgroundColors.push(color);
    });
    return {
      labels: labels,
      datasets: [
        {
          label: 'Total Billing Amount',
          data: data,
          backgroundColor: backgroundColors,
          hoverBackgroundColor: backgroundColors,
        },
      ],
    };
  }, [hospitalData]);
  // Pie chart data for Insurance coverage
  const insuranceConditionCoverage = useMemo(() => {
    const insuranceCoverage = filteredPatients.reduce((acc, item) => {
      const { insurance_provider, id } = item;
      if (!acc[insurance_provider]) {
        acc[insurance_provider] = new Set();
      }
      acc[insurance_provider].add(id);
      return acc;
    }, {});
    return {
      labels: Object.keys(insuranceCoverage),
      datasets: [
        {
          data: Object.values(insuranceCoverage).map(set => set.size),
          backgroundColor: [
            'rgba(75,192,192,0.6)',
            'rgba(255,99,132,0.6)',
            'rgba(54,162,235,0.6)',
            'rgba(153,102,255,0.6)',
            'rgba(255,159,64,0.6)',
          ],
          hoverBackgroundColor: [
            'rgba(75,192,192,1)',
            'rgba(255,99,132,1)',
            'rgba(54,162,235,1)',
            'rgba(153,102,255,1)',
            'rgba(255,159,64,1)',
          ],
        },
      ],
    };
  }, [filteredPatients]);
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw} patients`;
          },
        },
      },
    },
  };
  // Handle slider change for hospital range
  const handleSliderChange = (event) => {
    setHospitalRange(event.target.value);
  };
  // Get the current hospitals to show based on the range (20 hospitals at a time)
  const getCurrentHospitalData = () => {
    const hospitals = Object.keys(hospitalData);
    const startIdx = hospitalRange * 20;
    const endIdx = startIdx + 20;
    const currentHospitals = hospitals.slice(startIdx, endIdx);
    const chartLabels = [];
    const chartData = [];
    const chartColors = [];
    currentHospitals.forEach(hospital => {
      chartLabels.push(hospital);
      chartData.push(hospitalData[hospital].totalBilling);
      const billingAmount = hospitalData[hospital].totalBilling;
      const color = getColorForBillingAmount(billingAmount, Math.min(...Object.values(hospitalData).map(d => d.totalBilling)), Math.max(...Object.values(hospitalData).map(d => d.totalBilling)));
      chartColors.push(color);
    });
    return {
      labels: chartLabels,
      datasets: [
        {
          label: 'Total Billing Amount',
          data: chartData,
          backgroundColor: chartColors,
          hoverBackgroundColor: chartColors,
        },
      ],
    };
  };
  const renderChart = () => {
    if (activeChart === "insurance") {
      return (
        <div>
          <h3>Insurance Providers Coverage</h3>
          <div className="chart-container" style={{ width: '100%', height: '600px' }}>
            <Pie data={insuranceConditionCoverage} options={options} />
          </div>
        </div>
      );
    } else if (activeChart === "hospital") {
      return (
        <div>
          <h3>Hospital Billing Comparison</h3>
          <div style={{ marginBottom: '20px' }}>
            <h5>Billing Amount Color Legend:</h5>
            <ul>
              <li><span style={{ backgroundColor: 'rgb(180, 255, 150)', padding: '5px' }}></span> Low Billing</li>
              <li><span style={{ backgroundColor: 'rgb(255, 150, 150)', padding: '5px' }}></span> High Billing</li>
            </ul>
          </div>
          <div className="chart-container" style={{ width: '100%', height: '700px' }}>
            <Bar data={getCurrentHospitalData()} options={options} />
          </div>
          <InputGroup className="mt-3">
            <InputGroup.Text>Hospital Data Range</InputGroup.Text>
            <FormControl
              type="range"
              min="0"
              max={Math.floor(Object.keys(hospitalData).length / 20)}
              value={hospitalRange}
              onChange={handleSliderChange}
            />
            <FormControl.Feedback type="valid">
              {hospitalRange * 20 + 1} - {(hospitalRange + 1) * 20}
            </FormControl.Feedback>
          </InputGroup>
        </div>
      );
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <Container>
      <Row>
        <Col md={8}>
          <div className="mb-3">
            <Button
              variant={activeChart === "insurance" ? "primary" : "secondary"}
              onClick={() => setActiveChart("insurance")}
              className="me-2"
            >
              Insurance Chart
            </Button>
            <Button
              variant={activeChart === "hospital" ? "primary" : "secondary"}
              onClick={() => setActiveChart("hospital")}
            >
              Hospital Billing Chart
            </Button>
          </div>
          <div ref={chartRef}>
            {renderChart()}
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default InsuranceChart;