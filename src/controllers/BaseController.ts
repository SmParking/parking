import { Response } from "express";
import { Redis } from "../utilities/Redis";
class BaseController {
  // http Response
  /**
   * @param redisKeyName
   */
  protected redisKeyName: string = "";

  /**
   * @param data array
   */
  private data: Array<any> = [];

  httpResponse = (status: any, res: Response, data: any) => {
    //console.log(data);
    res.status(status).json({ data: data, success: true });
    //Redis.disconnect();
  };

  httpResponseError = (status: any, res: Response, message: string) => {};

  setVenues = async (ModelName: any) => {
    return Redis.set(this.redisKeyName, JSON.stringify(await ModelName.find()));
  };

  getVenues = () => {
    let _vm = this;
    Redis.get(this.redisKeyName)
      .then((res) => {
        _vm.data = JSON.parse(res);
      })
      .catch((error) => console.log(`found error in redis ${error}`));

    return _vm.data;
  };
}

export default BaseController;
