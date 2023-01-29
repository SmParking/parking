import { Request, Response, NextFunction } from "express";
import Venue from "../models/Venue";
class VenueController {
  constructor() {}
  // get all venue
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const venues = await Venue.find();
      res.status(200).json(venues);
    } catch (error) {
      next(error);
    }
  };
  // show by id method
  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const venue = await Venue.findById(req.params.id);
      res.status(200).json(venue);
    } catch (error) {
      next(error);
    }
  };
  // create method
  create = async (req: Request, res: Response, next: NextFunction) => {
    const newVenue = new Venue(req.body);
    try {
      const savedVenue = await newVenue.save();
      res.status(201).json(savedVenue);
    } catch (error) {
      next(error);
    }
  };
  // update venue by id
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updateVenue = await Venue.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updateVenue);
    } catch (error) {
      next(error);
    }
  };
  // delete venue by id
  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Venue.findByIdAndDelete(req.params.id);
      res.status(200).json("Venue has been deleted successfully.");
    } catch (error) {
      next(error);
    }
  };
}

export const VenueCont = new VenueController();
