const express = require("express");
const Sale = require("../models/Sale");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create a sale
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, startDate, endDate, location, details } = req.body;
    const userId = req.user.id;

    const sale = new Sale({
      user: userId,
      title,
      startDate,
      endDate,
      location,
      details,
    });

    await sale.save();
    res.status(201).json(sale);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all sales
router.get("/", async (req, res) => {
  try {
    const sales = await Sale.find().sort({ startDate: 1 });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get sales of logged in user
router.get("/my-sales", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const sales = await Sale.find({ user: userId }).sort({ startDate: 1 });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get a single sale by ID
router.get("/:id", async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);

    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }

    res.json(sale);
  } catch (error) {
    console.error("Error fetching sale:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update sale by id
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);

    if (!sale) return res.status(404).json({ message: "Sale not found" });
    if (sale.user.toString() !== req.user.id)
      return res.status(401).json({ message: "Unauthorized" });

    const { title, startDate, endDate, location, details } = req.body;

    sale.title = title || sale.title;
    sale.startDate = startDate || sale.startDate;
    sale.endDate = endDate || sale.endDate;
    sale.location = location || sale.location;
    sale.details = details || sale.details;

    await sale.save();
    res.json(sale);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete sale by id
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);

    if (!sale) return res.status(404).json({ message: "Sale not found" });
    if (sale.user.toString() !== req.user.id)
      return res.status(401).json({ message: "Unauthorized" });

    await sale.deleteOne();
    res.json({ message: "Sale deleted" });
  } catch (error) {
    console.error("Delete sale error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
