import mongoose from "mongoose";

const VenueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
    enum: ["comercial", "personal"],

    default: "personal",
  },
  occupancy: {
    type: Number,
  },
  address: {
    type: String,
  },
  latitude: {
    type: String,
  },
  longitude: {
    type: String,
  },
  landmark: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Active", "Inactive", "Pending"],
    default: "Inactive",
  },
  photos: {
    type: [String],
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  price: {
    type: Number,
  },
  vehicles: {
    type: [String],
  },
});

export default VenueSchema;
