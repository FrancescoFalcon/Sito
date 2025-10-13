import express from "express";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const imageUrl = req.file.path; // Cloudinary restituisce l'URL
    res.json({ imageUrl });
  } catch (err) {
    res.status(500).json({ error: "Upload failed", details: err.message });
  }
});

export default router;
