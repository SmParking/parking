import mongoose from "mongoose";
import VenueSchema from "../schema/VenueSchema";

export default mongoose.model("Venue", VenueSchema);
