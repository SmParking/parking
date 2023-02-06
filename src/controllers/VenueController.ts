import { Request, Response, NextFunction } from "express";
import Venue from "../models/Venue";
import { Redis } from "../utilities/Redis";
import BaseController from "./BaseController";

class VenueController extends BaseController {
  /**
   * message string
   */
  protected message: String = "";

  /**
   * status
   */
  public status = 200;

  /**
   *@param result array
   */
  protected result: Array<any> = [];

  /**
   * @param Redis Venue key
   *
   */
  protected redisKeyName: string = "Venues";

  constructor() {
    super();
    this.message = "Venue fetch successfully.";
  }
  // get all venue
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      this.result = (
        !this.getVenues() ? this.getVenues() : await Venue.find()
      ).sort((r1: any, r2: any) =>
        r1.createdAt > r2.createdAt ? 1 : r1.createdAt < r2.createdAt ? -1 : 0
      );

      this.httpResponse(this.status, res, this.result);
    } catch (error) {
      next(error);
    }
    //Redis.disconnect();
  };
  // show by id method
  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const venue = await Venue.findById(req.params.id);
      this.httpResponse(this.status, res, venue);
    } catch (error) {
      next(error);
    }
  };
  // create method
  create = async (req: Request, res: Response, next: NextFunction) => {
    const newVenue = new Venue(req.body);
    try {
      const savedVenue = await newVenue.save();
      this.setVenues(Venue);
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
      this.setVenues(Venue);
      res.status(this.status).json(updateVenue);
    } catch (error) {
      next(error);
    }
  };
  // delete venue by id
  delete = async (req: Request, res: Response, next: NextFunction) => {
    this.message = "Venue deleted successfully.";
    try {
      await Venue.findByIdAndDelete(req.params.id);
      res.status(this.status).json(this.message);
    } catch (error) {
      next(error);
    }
  };
}

export const VenueCont = new VenueController();
