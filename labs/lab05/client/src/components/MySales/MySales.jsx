import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../config";
import "./MySales.css";

const MySales = () => {
  const [sales, setSales] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  const fetchSales = async () => {
    setError("");
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to see your sales.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/sales/my-sales`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to fetch sales.");
      }

      const data = await response.json();
      setSales(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sale?")) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to delete a sale.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/sales/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete sale.");
      }

      setSales((prevSales) => prevSales.filter((sale) => sale._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-sale/${id}`);
  };

  if (loading) return <p>Loading your sales...</p>;

  if (error) return <p className="error">{error}</p>;

  if (sales.length === 0) return <p>You have no sales created yet.</p>;

  return (
    <div className="my-sales-container">
      <h2>My Sales</h2>
      <div className="sales-grid">
        {sales.map((sale) => (
          <div key={sale._id} className="sale-card">
            <h3>{sale.title}</h3>
            <p>
              <strong>Start:</strong> {formatDate(sale.startDate)}
            </p>
            <p>
              <strong>End:</strong> {formatDate(sale.endDate)}
            </p>
            <p>
              <strong>Location:</strong> {sale.location}
            </p>
            {sale.details && (
              <p>
                <strong>Details:</strong> {sale.details}
              </p>
            )}
            <div className="sale-actions">
              <button onClick={() => handleEdit(sale._id)}>Edit</button>
              <button onClick={() => handleDelete(sale._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MySales;
