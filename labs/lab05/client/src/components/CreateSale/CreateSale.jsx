import { useState } from "react";
import "./CreateSale.css";

function CreateSale() {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const saleData = {
      title,
      startDate,
      startTime,
      endDate,
      endTime,
      location,
      details,
    };

    console.log("Create sale:", saleData);
  };

  return (
    <div className="create-sale-container">
      <form className="create-sale-form" onSubmit={handleSubmit}>
        <h2>Create a Garage Sale</h2>

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

        <button type="submit">Create Sale</button>
      </form>
    </div>
  );
}

export default CreateSale;
