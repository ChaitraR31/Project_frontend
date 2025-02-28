import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

function DeleteBookmark() {
  const { userName, bookmarkId } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Changed from useHistory to useNavigate

  const handleDelete = async () => {
    setLoading(true);
    const token = sessionStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:8999/bookmark/delete_bookmark/${userName}/${bookmarkId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Bookmark deleted successfully!");
      navigate("/bookmarked-patients"); // Changed from history.push to navigate
    } catch (error) {
      if (error.response) {
        toast.error(`Error: ${error.response.data.message || 'Failed to delete bookmark!'}`);
      } else {
        toast.error("Network error or request timeout.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Are you sure you want to delete this bookmark?</h3>
      <Button variant="danger" onClick={handleDelete} disabled={loading}>
        {loading ? "Deleting..." : "Delete"}
      </Button>
    </div>
  );
}

export default DeleteBookmark;
