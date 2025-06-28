import express from "express";
import { uploadFunction, uploadsDir } from "../middleware/multer.js";
import fs from "fs";

const router = express.Router();

// Save multiple files
router.post("/multiple", uploadFunction.array("files", 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  const filenames = req.files.map((file) => file.filename);
  res.status(200).json({
    message: "Files uploaded successfully",
    filenames,
  });
});

// Save random dog image
router.post("/dog-image", async (req, res) => {
  const { url, filename } = req.body;

  if (!url || !filename) {
    console.error("Invalid request body:", req.body);
    return res.status(400).json({ message: "Invalid request" });
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(
        "Failed to fetch image:",
        response.status,
        response.statusText
      );
      return res
        .status(500)
        .json({ message: "Failed to fetch the image from URL" });
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filePath = `${uploadsDir}/${filename}`;

    fs.writeFileSync(filePath, buffer);
    res.status(200).json({ message: "Dog image saved successfully" });
  } catch (error) {
    console.error("Error saving image:", error.message);
    res
      .status(500)
      .json({ message: "Error saving image", error: error.message });
  }
});

export default router;
