import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);
  const [randomImages, setRandomImages] = useState([]);
  const [dogImage, setDogImage] = useState(null);

  const handleMultipleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("files", file));

    try {
      const response = await fetch(`http://localhost:8000/save/multiple`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setMessage(data.message || "Upload successful");
    } catch (error) {
      console.log(error);
      setMessage("Upload failed");
    }
  };

  const fetchRandomImages = async () => {
    try {
      const response = await fetch(`http://localhost:8000/fetch/multiple`);
      const data = await response.json();

      setRandomImages(data.files || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDogImage = async () => {
    try {
      const response = await fetch(`https://dog.ceo/api/breeds/image/random`);
      const data = await response.json();

      setDogImage(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const saveDogImage = async () => {
    if (!dogImage) return;

    try {
      const filename = `dog-${Date.now()}.jpg`;

      await fetch(`http://localhost:8000/save/dog-image`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: dogImage, filename }),
      });

      setMessage("Dog image saved successfully");
    } catch (error) {
      console.log(error);
      setMessage("Failed to save dog image");
    }
  };

  return (
    <div>
      <h2>Multiple File Uploader</h2>
      <form onSubmit={handleMultipleUpload}>
        <input
          type="file"
          multiple
          onChange={(e) => setFiles(e.target.files)}
          required
        />
        <button type="submit">Upload</button>
      </form>

      <button onClick={fetchRandomImages}>Fetch Random Images</button>
      <div>
        {randomImages.map((image, index) => (
          <img
            key={index}
            src={`http://localhost:8000${image}`}
            alt="Random"
            style={{ maxWidth: "300px", margin: "10px" }}
          />
        ))}
      </div>

      <button onClick={fetchDogImage}>Fetch Random Dog Image</button>
      {dogImage && (
        <div>
          <img
            src={dogImage}
            alt="Dog"
            style={{ maxWidth: "300px", margin: "10px" }}
          />
          <button onClick={saveDogImage}>Save Dog Image</button>
        </div>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
