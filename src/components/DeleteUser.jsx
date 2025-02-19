import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";

const DeleteUser = () => {
  const [userId, setUserId] = useState("");

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8088/users/${userId}`);
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Delete User</h2>
      <Form.Group>
        <Form.Label>User ID</Form.Label>
        <Form.Control
          type="number"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="danger" className="mt-2" onClick={handleDelete}>
        Delete User
      </Button>
    </Container>
  );
};

export default DeleteUser;
