// parking endpoints goes here
import express from "express";
import { VenueCont as VenueController } from "../controllers/VenueController";
const route = express.Router();

// get all venue
route.get("/", VenueController.index);
// get venue
route.get("/:id", VenueController.show);
// create
route.post("/", VenueController.create);
// update
route.put("/:id", VenueController.update);
// delete
route.delete("/:id", VenueController.delete);

export default route;
