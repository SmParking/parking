import { Request, Response, NextFunction } from "express";
import Venue from "../models/Venue";
import { Redis } from "../utilities/Redis";
import BaseController from "./BaseController";

class VenueController extends BaseController {
  message: String = "";
  status = 200;
  result: any = "";
  redisKeyName: string = "Venues";
  constructor() {
    super();
    this.message = "Venue fetch successfully.";
  }
  // get all venue
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      this.result = Redis.get(this.redisKeyName); //.then((res) => ( this.result = res));
      console.log(this.result);
      if(this.result != null) {
        console.log('call await function');
      } else {
        console.log('call venue function.');
      }
       
      const _venues = (this.result != null) ? await Venue.find() : this.getVenues();
      this.httpResponse(this.status, res, _venues);
    } catch (error) {
      next(error);
    }
    //Redis.disconnect();
  };
  // show by id method
  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const venue = await Venue.findById(req.params.id);
      res.status(this.status).json(venue);
    } catch (error) {
      next(error);
    }
  };
  // create method
  create = async (req: Request, res: Response, next: NextFunction) => {
    const newVenue = new Venue(req.body);
    try {
      const savedVenue = await newVenue.save();
      this.setVenues();
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
      this.setVenues();
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

  setVenues = async () => {
    return Redis.set(this.redisKeyName, JSON.stringify(await Venue.find()));
  };

  getVenues = () => {
    let venues: any = [];
     Redis.get(this.redisKeyName).then(res => {
      venues = res;
    }).catch(err => {
      console.log(`Error occured during fetch from redis : ${err}`);
    })
    console.log('before sending...');
    return venues;
  }
}

export const VenueCont = new VenueController();
