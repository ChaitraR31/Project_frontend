import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import "./ChangePasswordPage.css"; // Import the CSS for styling
import { Toast } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

const ChangePasswordPage = () => {
  const { username } = useParams(); // Get the username from the URL
  const [tempPassword, setTempPassword] = useState(""); // Temporary password from the email
  const [newPassword, setNewPassword] = useState(""); // The new password
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function


  // Fetch the temporary password based on the username, or receive it from another source (email, etc.)
  // useEffect(() => {
    // Example of fetching the temporary password for the username
  //   const fetchTempPassword = async () => {
  //     // Simulate getting the tempPassword from an API (you could replace this with a real API call)
  //     setTempPassword("Temp@123"); // Simulated temp password, replace with real logic
  //     setOldPassword("Temp@123"); // Pre-fill the old password with the temp password
  //   };

  //   fetchTempPassword();
  // }, [username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Old Password (Temporary):", tempPassword); // Log old password (temporary password)
    console.log("New Password:", newPassword); // Log the new password

    try {
      // Send a request to the backend to update the password
      const response = await fetch(`http://localhost:8999/authuser/changepassword`, {
        method: "POST", // or PATCH depending on your API
        body: JSON.stringify({
          username,
          oldPassword:tempPassword,
          newPassword,
        }),
        headers: { "Content-Type": "application/json" },
      });

      setLoading(false);

      if (response.ok) {
        toast.success("Password has been successfully changed.");
        navigate("/login"); // Redirect to the login page

        // Redirect to login page or another page after successful password change
      } else {
        alert("Error changing password. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="change-password-container">
      <div className="change-password-card">
        <h2 className="heading">Change Password</h2>
        <p className="subheading">Enter a new password to reset your account</p>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="oldPassword" className="label">Old Password (Temporary)</label>
          <input
            id="oldPassword"
            type="password"
            className="input"
            value={tempPassword}
            onChange={(e) => setTempPassword(e.target.value)}
            required
            placeholder="Temporary password"
          />

          <label htmlFor="newPassword" className="label">New Password</label>
          <input
            id="newPassword"
            type="password"
            className="input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            placeholder="Enter new password"
          />

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Changing..." : "Change Password"}
          </button>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default ChangePasswordPage;
