import { Response } from "express";
import { Redis } from "../utilities/Redis";
class BaseController {

    // http Response
    httpResponse = (status: any, res: Response, data: any) => {
        //console.log(data);
        res.status(status).json({ data: data, success: true });
        //Redis.disconnect();
    }

    httpResponseError = (status:any, res:Response, message: string) => {

    }
}

export default BaseController;