import express from "express";
import fs from "fs";
import lodash from "lodash";
import path from "path";
import { uploadsDir } from "../middleware/multer.js";

const router = express.Router();

// Fetch multiple random files
router.get("/multiple", (req, res) => {
  const uploadArray = fs.readdirSync(uploadsDir);
  const randomFiles = lodash.sampleSize(uploadArray, 3);

  if (randomFiles.length === 0) {
    return res.status(404).json({ message: "Empty directory" });
  }

  const filePaths = randomFiles.map((file) => `/uploads/${file}`);
  res.json({ files: filePaths });
});

export default router;
