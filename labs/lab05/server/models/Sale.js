const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    location: { type: String, required: true },
    details: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sale", saleSchema);
