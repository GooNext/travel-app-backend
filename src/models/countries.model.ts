import mongoose from "mongoose";
const Schema = mongoose.Schema;

const contrySchema = new Schema(
  {
    stars: { type: String, required: true, default: "" },
    image: { type: String, required: true },
    capitalLat: { type: String, required: true },
    capitalLon: { type: String, required: true },
    feedback: [
      {
        text: { type: String, required: false, default: "" },
        stars: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

const Country = mongoose.model("Country", contrySchema);

module.exports = Country;
