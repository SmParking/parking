import express, {Request, Response, NextFunction} from "express";
import Venue from "../models/Venue";
const route = express.Router();

// parking endpoints goes here

// get venue
route.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('parking router working here!');
})

// create 
route.post("/", async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const newVenue= new Venue(req.body);
    try {
        const savedVenue = await newVenue.save();
        res.status(201).json(savedVenue);
    } catch (error) {
        res.status(500).json(error);
    }
})

// update 
route.put("/", (req: Request, res: Response, next: NextFunction) => {
    console.log('venue goes here');
})

// delete
route.delete("/", (req: Request, res: Response, next: NextFunction) => {
    console.log('venue goes here');
})


export default route;