import { Request, Response } from "express";
import ref from "../../config/MongoConfig";
// query param
// check amount of custom problems left
// let user do the problem, no points given
export default async function custom_problems(req: Request, res: Response) {
  const collection = ref("custom_problems");
}
