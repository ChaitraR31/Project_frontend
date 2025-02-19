import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import axios from "axios";

const GetUser = () => {
    const [userName, setUserName] = useState(""); // Store the input username
    const [user, setUser] = useState(null); // Store the user data fetched from API

    // Function to fetch user details based on username
    const fetchUser = async () => {
        try {
            const token = localStorage.getItem("token"); // Get the token from localStorage
            
            const response = await axios.get(`http://localhost:8088/users/${userName}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(response.data); // Set the user data from the response
        } catch (error) {
            console.error("Error:", error); // Handle errors
            setUser(null); // Reset user data if there's an error
        }
    };

    return (
        <Container className="mt-4">
            <h2>Get User by Name</h2>
            <Form>
                <Form.Group>
                    <Form.Label>User Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={userName} 
                        onChange={(e) => setUserName(e.target.value)} // Set the input value
                        required 
                    />
                </Form.Group>
                <Button variant="primary" className="mt-2" onClick={fetchUser}>Fetch User</Button>
            </Form>

            {/* Display user information if user data exists */}
            {user && (
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Title>{user.firstName} {user.lastName}</Card.Title>
                        <Card.Text>
                            <strong>Email:</strong> {user.email} <br />
                            <strong>Phone:</strong> {user.phoneNumber} <br />
                            <strong>Address:</strong> {user.address}
                        </Card.Text>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
};

export default GetUser;
