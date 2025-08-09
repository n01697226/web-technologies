import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../config";
import "../CreateSale/CreateSale.css";

function EditSale() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [details, setDetails] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSale = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE_URL}/sales/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to load sale");

        const data = await res.json();

        const start = new Date(data.startDate);
        const end = new Date(data.endDate);

        setTitle(data.title || "");
        setStartDate(start.toISOString().split("T")[0]);
        setStartTime(start.toISOString().split("T")[1].slice(0, 5));
        setEndDate(end.toISOString().split("T")[0]);
        setEndTime(end.toISOString().split("T")[1].slice(0, 5));
        setLocation(data.location || "");
        setDetails(data.details || "");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSale();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const saleData = {
      title,
      startDate,
      startTime,
      endDate,
      endTime,
      location,
      details,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to edit a sale.");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/sales/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(saleData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to update sale.");
      }

      navigate("/my-sales");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading sale...</p>;

  return (
    <div className="create-sale-container">
      <form className="create-sale-form" onSubmit={handleSubmit}>
        <h2>Edit Garage Sale</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <label htmlFor="title">Sale Title</label>
        <input
          type="text"
          id="title"
          placeholder="Give your sale a title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div className="datetime-group">
          <div>
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="startTime">Start Time</label>
            <input
              type="time"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="datetime-group">
          <div>
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="endTime">End Time</label>
            <input
              type="time"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
        </div>

        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          placeholder="Where is the sale?"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <label htmlFor="details">Additional Details</label>
        <textarea
          id="details"
          placeholder="Any other info about your sale"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          rows={4}
        />

        <button type="submit">Update Sale</button>
      </form>
    </div>
  );
}

export default EditSale;
