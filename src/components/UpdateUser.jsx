import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom"; 

const UpdateUser = () => {
  const username = localStorage.getItem("username"); 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (username) {
      fetchUser();
    } else {
      setError("Username is required to fetch user data");
    }
  }, [username]);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8083/user/get/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFormData(response.data); 
      setError(""); 
    } catch (error) {
      console.error("Error fetching user:", error);
      setError("Error fetching user data. Please try again.");
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedData = {
        username: formData.username,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      };

      const token = localStorage.getItem("token");
      const res = await axios.put(`http://localhost:8083/user/update/${username}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("User Updated successfully!");
      setError(""); 
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Error updating user. Please try again.");
    }
    setLoading(false);
  };


  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your profile? This will also delete related data such as bookmarks.")) {
        setLoading(true);
        const username = localStorage.getItem("username");
        const token = localStorage.getItem("token");

        try {
            // Step 1: Delete user's bookmarks from all services
            let bookmarkDeleted = false;
            try {
                await axios.delete(`http://localhost:8085/bookmark/delete_bookmark/${username}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                bookmarkDeleted = true; // Set to true if bookmarks are successfully deleted
            } catch (error) {
                console.warn("No bookmarks found or error deleting bookmarks:", error);
            }

            // Step 2: Delete the profile regardless of bookmarks
            await axios.all([
                axios.delete(`http://localhost:8087/user/remove/${username}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }),
                axios.delete(`http://localhost:8083/user/delete/${username}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }),
            ]);

            // If bookmarks were deleted, inform the user, else just confirm profile deletion
            if (bookmarkDeleted) {
                toast.info("Bookmarks and profile deleted successfully!");
            } else {
                toast.info("Profile deleted successfully (no bookmarks found).");
            }

            // Step 3: Clear user data from localStorage
            localStorage.removeItem("username");
            localStorage.removeItem("token");

            // Set success message and redirect to login page
            toast.success("Account successfully deleted from all services.");

            // Redirect to login page after a short delay for the success message
            setTimeout(() => {
              window.location.reload();  // This will refresh the current page

                navigate("/login");
            }, 2000); // Adding delay for the success message to be visible

        } catch (error) {
            console.error("Error deleting profile:", error);
            toast.error("Error deleting profile. Please try again.");
        } finally {
            setLoading(false);
        }
    }
};


  

  // const handleDelete = async () => {
  //   if (window.confirm("Are you sure you want to delete your profile? This will also delete related data such as bookmarks.")) {
  //     setLoading(true);
  //     try {
  //       const token = localStorage.getItem("token");

  //       await axios.delete(`http://localhost:8085/bookmark/delete_bookmark/${username}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       toast.info("Bookmarks deleted successfully!");

  //       // Step 2: Delete user's profile
  //       await axios.delete(`http://localhost:8083/user/delete/${username}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       await axios.delete(`http://localhost:8087/user/delete/${username}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       toast.success("Profile and related data deleted successfully!");

  //       // Clear user data from localStorage
  //       localStorage.removeItem("username");
  //       localStorage.removeItem("token");

  //       // Redirect to login page after deletion
  //       navigate("/login"); // Use navigate instead of history.push
  //     } catch (error) {
  //       console.error("Error deleting profile:", error);
  //       toast.error("Error deleting profile. Please try again.");
  //     }
  //     setLoading(false);
  //   }
  // };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Update User Profile</h2>
      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={handleUpdate} className="p-4 shadow-sm border rounded">
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Enter Username"
                disabled // Disable username field if you don't want users to edit it
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="Enter First Name"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Enter Last Name"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter Email"
              />
            </Form.Group>

            <div className="d-flex justify-content-between mt-3">
              <Button variant="success" type="submit" disabled={loading}>
                {loading ? <Spinner as="span" animation="border" size="sm" /> : "Update User"}
              </Button>
            </div>

            <div className="d-flex justify-content-between mt-3">
              <Button variant="danger" onClick={handleDelete} disabled={loading}>
                {loading ? <Spinner as="span" animation="border" size="sm" /> : "Delete Profile"}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>

      {error && <div className="alert alert-danger mt-4">{error}</div>}
      <ToastContainer />
    </Container>
  );
};

export default UpdateUser;

// import React, { useState, useEffect } from "react";
// import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import { useNavigate } from "react-router-dom"; 

// const UpdateUser = () => {
//   const username = localStorage.getItem("username");
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: "",
//     firstName: "",
//     lastName: "",
//     email: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (username) {
//       fetchUser();
//     } else {
//       setError("Username is required to fetch user data");
//     }
//   }, [username]);

//   const fetchUser = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(`http://localhost:8083/user/get/${username}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setFormData(response.data); 
//       setError(""); 
//     } catch (error) {
//       console.error("Error fetching user:", error);
//       setError("Error fetching user data. Please try again.");
//     }
//     setLoading(false);
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const updatedData = {
//         username: formData.username,
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         email: formData.email,
//       };

//       const token = localStorage.getItem("token");
//       const res = await axios.put(`http://localhost:8083/user/update/${username}`, updatedData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       toast.success("User Updated successfully!");
//       setError(""); 
//     } catch (error) {
//       console.error("Error updating user:", error);
//       setError("Error updating user. Please try again.");
//     }
//     setLoading(false);
//   };

//   const handleDelete = async () => {
//     // Confirm delete action
//     if (window.confirm("Are you sure you want to delete your profile? This will also delete related data such as bookmarks.")) {
//       setLoading(true);
//       try {
//         const token = localStorage.getItem("token");

//         // Step 1: Delete bookmarks first (on port 8085)
//         const bookmarkDeleteResponse = await axios.delete(`http://localhost:8085/bookmark/delete_bookmark/${username}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (bookmarkDeleteResponse.status !== 200) {
//           throw new Error("Error deleting bookmarks.");
//         }
//         toast.info("Bookmarks deleted successfully!");

//         // Step 2: Delete user profile from service on port 8083 (primary user service)
//         const userDeleteResponse1 = await axios.delete(`http://localhost:8083/user/delete/${username}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (userDeleteResponse1.status !== 200) {
//           throw new Error("Error deleting user profile from service on port 8083.");
//         }

//         // Step 3: Delete user profile from service on port 8087 (secondary user service)
//         const userDeleteResponse2 = await axios.delete(`http://localhost:8087/user/delete/${username}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (userDeleteResponse2.status !== 200) {
//           throw new Error("Error deleting user profile from service on port 8087.");
//         }

//         // Clear user data from localStorage
//         localStorage.removeItem("username");
//         localStorage.removeItem("token");

//         // Success toast message
//         toast.success("Profile and related data deleted successfully!");

//         // Redirect to login page after deletion
//         navigate("/login"); // Use navigate instead of history.push
//       } catch (error) {
//         console.error("Error deleting profile:", error);
//         toast.error("Error deleting profile. Please try again.");
//       }
//       setLoading(false);
//     }
//   };

//   return (
//     <Container className="mt-5">
//       <h2 className="mb-4 text-center">Update User Profile</h2>
//       <Row className="justify-content-center">
//         <Col md={6}>
//           <Form onSubmit={handleUpdate} className="p-4 shadow-sm border rounded">
//             <Form.Group>
//               <Form.Label>Username</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter Username"
//                 disabled // Disable username field if you don't want users to edit it
//               />
//             </Form.Group>

//             <Form.Group>
//               <Form.Label>First Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter First Name"
//               />
//             </Form.Group>

//             <Form.Group>
//               <Form.Label>Last Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter Last Name"
//               />
//             </Form.Group>

//             <Form.Group>
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter Email"
//               />
//             </Form.Group>

//             <div className="d-flex justify-content-between mt-3">
//               <Button variant="success" type="submit" disabled={loading}>
//                 {loading ? <Spinner as="span" animation="border" size="sm" /> : "Update User"}
//               </Button>
//             </div>

//             <div className="d-flex justify-content-between mt-3">
//               <Button variant="danger" onClick={handleDelete} disabled={loading}>
//                 {loading ? <Spinner as="span" animation="border" size="sm" /> : "Delete Profile"}
//               </Button>
//             </div>
//           </Form>
//         </Col>
//       </Row>

//       {error && <div className="alert alert-danger mt-4">{error}</div>}
//       <ToastContainer />
//     </Container>
//   );
// };

// export default UpdateUser;
