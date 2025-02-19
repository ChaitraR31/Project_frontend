import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPasswordPage.css"; // Import the CSS for styling
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const ForgotPasswordPage = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call the API endpoint to reset password (e.g., POST request)
      const response = await fetch(`http://localhost:8087/user/forget/${username}`, {
        method: "POST",
        body: JSON.stringify({ username }),
        headers: { "Content-Type": "application/json" },
      });

      setLoading(false);

      if (response.ok) {
        toast.success("Done");
        toast.success("Password reset link has been sent to your email.");
        console.log("Success toast triggered");

        // Redirect to ChangePasswordPage with username in the URL
        navigate(`/change-password/${username}`);
      } else {
        toast.error("Error resetting password. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div>
      <div className="forgot-password-container">
        <div className="forgot-password-card">
          <h2 className="heading">Forgot Password</h2>
          <p className="subheading">Enter your username to reset your password</p>
          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="username" className="label">Username</label>
            <input
              id="username"
              type="text"
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
            />
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Sending..." : "Submit"}
            </button>
          </form>
          <div className="footer">
            <p>
              Remembered your password? <a href="/login">Login here</a>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotPasswordPage;
