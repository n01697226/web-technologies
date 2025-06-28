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
router.post("/dog-image", (req, res) => {
  const { url, filename } = req.body;

  if (!url || !filename) {
    return res.status(400).json({ message: "Invalid request" });
  }

  fetch(url)
    .then((response) => response.buffer())
    .then((buffer) => {
      fs.writeFileSync(`${uploadsDir}/${filename}`, buffer);
      res.status(200).json({ message: "Dog image saved successfully" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error saving image", error });
    });
});

export default router;
