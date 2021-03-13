import mongoose from "mongoose";
const Schema = mongoose.Schema;

const contryLocaleSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    capital: { type: String, required: true },
    currency: { type: String, required: true },
    language: { type: String, required: true },
  },
  { timestamps: true }
);

const countriesLocale = mongoose.model(
  "countriesLocale",
  contryLocaleSchema,
  "countriesLocale"
);

module.exports = countriesLocale;
